import express from "express";
const HomeRouter = express.Router();

HomeRouter.get('/', (_req, res) => {
    res.send("Welcome to the Customer Service Portal API");
});

export default HomeRouter;