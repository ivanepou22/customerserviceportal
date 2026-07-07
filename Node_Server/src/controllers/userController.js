import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import { asyncMiddleware } from "../middleware/async.js";
import { connectBC } from "../config/connectBC.js";

dotenv.config();

export const getUsers = asyncMiddleware(async (req, res) => {
    const url = `${process.env.BASE_URL}/${process.env.BC_PORTAL_USERS}`;
    const response = await axios.get(url, connectBC);
    const users = response.data;
    res.send(users);
});

export const getUser = asyncMiddleware(async (req, res) => {
    const userId = req.params.userId;
    const url = `${process.env.BASE_URL}/${process.env.BC_PORTAL_USERS}('${userId}')`;
    console.log(url);
    const response = await axios.get(url, connectBC);
    const user = response.data;
    res.send(user);
});

export const createUser = asyncMiddleware(async (req, res) => {
    const url = `${process.env.BASE_URL}/${process.env.BC_PORTAL_USERS}`;
    const userData = req.body;
    const response = await axios.post(url, userData, connectBC);
    const newUser = response.data;
    res.status(201).send(newUser);
});