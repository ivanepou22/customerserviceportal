import axios from "axios";
import dotenv from "dotenv";
import { asyncMiddleware } from "../middleware/async.js";
import { connectBC } from "../config/connectBC.js";
import { addPaginationToUrl, createPaginatedResponse, getPagination } from "../startup/pagination.js";
dotenv.config();

const getLedgersFromEndpoint = endpoint =>
    asyncMiddleware(async (req, res) => {
        const customerId = req.user.customerNo;
        const pagination = getPagination(req.query);
        if (pagination.error) return res.status(400).json({ message: pagination.error });

        const baseUrl = `${process.env.BASE_URL}/${endpoint}?$filter=customerNo eq '${customerId}'`;
        const url = addPaginationToUrl(baseUrl, pagination);
        const response = await axios.get(url, connectBC);
        res.send(createPaginatedResponse(response.data, pagination));
    });

export const getCustomerLedgers = getLedgersFromEndpoint(process.env.BC_CUSTOMER_LEDGERS);
export const getCustomerPayments = getLedgersFromEndpoint(process.env.BC_CUSTOMER_PAYMENTS);
