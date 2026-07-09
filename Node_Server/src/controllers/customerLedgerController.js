import axios from "axios";
import dotenv from "dotenv";
import { asyncMiddleware } from "../middleware/async.js";
import { connectBC } from "../config/connectBC.js";
dotenv.config();

const getLedgersFromEndpoint = endpoint =>
    asyncMiddleware(async (req, res) => {
        const customerId = req.user.customerNo;
        const url = `${process.env.BASE_URL}/${endpoint}?$filter=customerNo eq '${customerId}'`;
        const response = await axios.get(url, connectBC);
        const documents = response.data;
        res.send(documents);
    });

export const getCustomerLedgers = getLedgersFromEndpoint(process.env.BC_CUSTOMER_LEDGERS);
export const getCustomerPayments = getLedgersFromEndpoint(process.env.BC_CUSTOMER_PAYMENTS);