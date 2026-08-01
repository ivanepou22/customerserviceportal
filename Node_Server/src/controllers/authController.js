import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import axios from 'axios';
import { asyncMiddleware } from '../middleware/async.js';
import { validateAuth } from '../validation/validateAuth.js';
import { connectBC } from '../config/connectBC.js';
import {
    generateAuthToken,
    generateRefreshToken,
    verifyRefreshToken
} from '../middleware/auth.js';
import _ from 'lodash';
dotenv.config();

export const authenticate = asyncMiddleware(async (req, res) => {
    const { error } = validateAuth(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const userEmail = req.body.email;

    const existingUserUrl = `${process.env.BASE_URL}/${process.env.BC_PORTAL_USERS}('${userEmail}')`;
    const existingUserResponse = await axios.get(existingUserUrl, connectBC);
    if (!existingUserResponse.data) {
        return res.status(404).send(`User with ID: ${userEmail} not found.`);
    }

    if (!existingUserResponse.data.active)
        return res.status(400).send('Please contact your systems Admin.');

    const isMatch = await bcrypt.compare(req.body.password, existingUserResponse.data.password);
    if (!isMatch) return res.status(400).send('Invalid email or password');

    const user = _.pick(existingUserResponse.data, [
        'email',
        'name',
        'customerNo',
        'customerName',
        'role',
        'active'
    ]);

    const accessToken = generateAuthToken(user);
    const refreshToken = generateRefreshToken(user);
    const userShare = _.pick(existingUserResponse.data, ['email', 'name', 'customerNo']);

    res.status(200).send({
        user: userShare,
        accessToken,
        refreshToken,
        token: accessToken
    });
});

export const refresh = asyncMiddleware(async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).send('Refresh token is required.');
    }

    let decoded;
    try {
        decoded = verifyRefreshToken(refreshToken);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send('Refresh token expired. Please log in again.');
        }
        return res.status(401).send(`Invalid refresh token. ${error.message}`);
    }

    const existingUserUrl = `${process.env.BASE_URL}/${process.env.BC_PORTAL_USERS}('${decoded.email}')`;
    const existingUserResponse = await axios.get(existingUserUrl, connectBC);

    if (!existingUserResponse.data) {
        return res.status(401).send('User no longer exists.');
    }

    if (!existingUserResponse.data.active) {
        return res.status(401).send('User account is inactive. Please contact your systems Admin.');
    }

    const user = _.pick(existingUserResponse.data, [
        'email',
        'name',
        'customerNo',
        'customerName',
        'role',
        'active'
    ]);

    const newAccessToken = generateAuthToken(user);
    const newRefreshToken = generateRefreshToken(user);
    const userShare = _.pick(existingUserResponse.data, ['email', 'name', 'customerNo']);

    res.status(200).send({
        user: userShare,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        token: newAccessToken
    });
});