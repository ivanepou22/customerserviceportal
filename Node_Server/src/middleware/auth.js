import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function auth(req, res, next) {
    let token = req.header('x-auth-token');

    if (!token) {
        const authHeader = req.header('Authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }
    }

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded.type === 'refresh') {
            return res.status(401).send('Invalid token type. Access token required.');
        }

        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send('Access token expired.');
        }
        res.status(400).send(`Invalid token. ${error.message}`);
    }
}

export const generateAuthToken = function (user) {
    const payload = {
        email: user.email,
        name: user.name,
        customerNo: user.customerNo,
        customerName: user.customerName,
        role: user.role,
        active: user.active,
        type: 'access'
    };

    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
    });
};

export const generateRefreshToken = function (user) {
    const payload = {
        email: user.email,
        customerNo: user.customerNo,
        type: 'refresh'
    };

    const secret = process.env.JWT_REFRESH_SECRET_KEY || process.env.JWT_SECRET_KEY;

    return jwt.sign(payload, secret, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
    });
};

export const verifyRefreshToken = function (token) {
    const secret = process.env.JWT_REFRESH_SECRET_KEY || process.env.JWT_SECRET_KEY;
    const decoded = jwt.verify(token, secret);

    if (decoded.type !== 'refresh') {
        throw new Error('Invalid token type. Refresh token required.');
    }

    return decoded;
};