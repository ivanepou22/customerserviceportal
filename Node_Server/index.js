import express from "express";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
dotenv.config();

app.get("/api/v1/", (req, res) => {
    res.send("Welcome to the Customer Portal API");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});