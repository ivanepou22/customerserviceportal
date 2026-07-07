import dotenv from "dotenv";
dotenv.config();

const password = process.env.BC_PASSWORD;
const username = process.env.BC_USERNAME;

const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');

export const connectBC = {
    headers: {
        Authorization: `Basic ${base64Credentials}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};

export const connectNav = {
    headers: {
        Authorization: `Basic ${base64Credentials}`,
    },
};
