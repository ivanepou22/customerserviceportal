import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import bcrypt from "bcrypt";
import http from 'http';
import _ from "lodash";
import { asyncMiddleware } from "../middleware/async.js";
import { connectBC, connectNav } from "../config/connectBC.js";
import { validateUpdateUser, validateUser } from "../validation/validateUser.js";
import { cleanETag } from "../startup/utils.js";

dotenv.config();

export const getUsers = asyncMiddleware(async (req, res) => {
    const customerId = req.user.customerNo;
    const url = `${process.env.BASE_URL}/${process.env.BC_PORTAL_USERS}?$filter=customerNo eq '${customerId}'&$select=email,name,customerNo,customerName,lastLogin,role,active`;
    const response = await axios.get(url, connectBC);
    const users = response.data;
    res.status(200).send(users);
});

export const getUser = asyncMiddleware(async (req, res) => {
    const userId = req.params.userId;
    const customerId = req.user.customerNo;
    const url = `${process.env.BASE_URL}/${process.env.BC_PORTAL_USERS}('${userId}')?$filter=customerNo eq '${customerId}'&$select=email,name,customerNo,customerName,lastLogin,role,active`;
    const response = await axios.get(url, connectBC);
    const user = response.data;
    const singleUser = _.pick(user, ['email', 'name', 'customerNo', 'customerName', 'lastLogin', 'role', 'active']);
    res.status(200).send(singleUser);
});

export const createUser = asyncMiddleware(async (req, res) => {
    const url = `${process.env.BASE_URL}/${process.env.BC_PORTAL_USERS}`;
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const existingUserUrl = `${process.env.BASE_URL}/${process.env.BC_PORTAL_USERS}?$filter=email eq '${req.body.email}'`;
    const existingUserResponse = await axios.get(existingUserUrl, connectBC);

    if (existingUserResponse.data.value.length > 0) {
        return res.status(400).send(`User with email: ${req.body.email} already exists.`);
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const userData = req.body;
    const response = await axios.post(url, userData, connectBC);
    const newUser = response.data;
    const user = _.pick(newUser, ['email', 'name', 'customerNo', 'customerName', 'lastLogin', 'role', 'active']);
    res.status(201).send(user);
});

export const updateUser = asyncMiddleware(async (req, res) => {
    const userId = req.params.userId;
    const customerId = req.user.customerNo;
    const allowedUpdate = _.pick(req.body, ['name', 'role']);

    const { error } = validateUpdateUser(allowedUpdate);
    if (error) return res.status(400).send(error.details[0].message);

    if (Object.keys(allowedUpdate).length === 0) {
        return res.status(400).send("No valid fields to update (name, role only)");
    }

    const url = `${process.env.BASE_URL}/${process.env.BC_PORTAL_USERS}('${userId}')?$filter=customerNo eq '${customerId}'&$select=email,name,customerNo,customerName,lastLogin,role,active`;
    const existingUserResponse = await axios.get(url, connectBC);
    if (!existingUserResponse.data) {
        return res.status(404).send(`User with ID: ${userId} not found.`);
    }

    const etag = existingUserResponse.data['@odata.etag'];
    if (!etag) {
        return res.status(400).send("ETag not found for the user. Cannot perform update.");
    }
    connectBC.headers['If-Match'] = etag;
    const response = await axios.put(url, allowedUpdate, connectBC);
    const updatedUser = response.data;
    const user = _.pick(updatedUser, ['email', 'name', 'customerNo', 'customerName', 'lastLogin', 'role', 'active']);

    res.status(200).send(user);
});

export const deleteUser = asyncMiddleware(async (req, res) => {
    const userId = req.params.userId;
    const customerId = req.user.customerNo;
    const url = `${process.env.BASE_URL}/${process.env.BC_PORTAL_USERS}('${userId}')?$filter=customerNo eq '${customerId}'&$select=email,name,customerNo,customerName,lastLogin,role,active`;
    const existingUserResponse = await axios.get(url, connectBC);
    if (!existingUserResponse.data) {
        return res.status(404).json({ message: `User with ID: ${userId} not found.` });
    }

    const etag = existingUserResponse.data['@odata.etag'];
    if (!etag) {
        return res.status(400).json({ message: "ETag not found for the user. Cannot perform delete." });
    }
    connectBC.headers['If-Match'] = etag;

    const response = await fetch(url, {
        method: 'DELETE',
        ...connectBC
    });

    res.status(200).send(`User with ID: ${userId} has been deleted.`);
});