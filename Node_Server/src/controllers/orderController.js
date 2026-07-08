import axios from "axios";
import dotenv from "dotenv";
import { asyncMiddleware } from "../middleware/async.js";
import { connectBC } from "../config/connectBC.js";

dotenv.config();

export const getOrders = asyncMiddleware(async (req, res) => {
    const customerId = req.user.customerNo;
    const documentType = 'Order';
    const url = `${process.env.BASE_URL}/${process.env.BC_ORDERS}?$filter=sellToCustomerNo eq '${customerId}' and Amount gt 0 and documentType eq '${documentType}'&$expand=saleslines`;
    const response = await axios.get(url, connectBC);
    const orders = response.data;
    res.send(orders);
});

export const getOrder = asyncMiddleware(async (req, res) => {
    const customerId = req.user.customerNo;
    const documentType = 'Order';
    const orderId = req.params.orderId;
    const url = `${process.env.BASE_URL}/${process.env.BC_ORDERS}('${documentType}','${orderId}')?$filter=sellToCustomerNo eq '${customerId}' and Amount gt 0&$expand=saleslines`;
    const response = await axios.get(url, connectBC);
    const order = response.data;
    res.send(order);
});
