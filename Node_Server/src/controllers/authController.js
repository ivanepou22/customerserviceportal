import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import axios from 'axios';
import { asyncMiddleware } from '../middleware/async.js';
import { validateAuth } from '../validation/validateAuth.js';
import { connectBC } from '../config/connectBC.js';
import { generateAuthToken } from '../middleware/auth.js';
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

    const isMatch = await bcrypt.compare(req.body.password, existingUserResponse.data.password);
    if (!isMatch) return res.status(400).send('Invalid email or password');

    const user = _.pick(existingUserResponse.data, ['email', 'name', 'customerNo', 'customerName', 'role', 'active']);
    const token = generateAuthToken(user);

    res.status(200).send({ token });
});