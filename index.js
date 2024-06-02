const express = require("express");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const app = express();
connectDb();
const port = process.env.port || 3000;




app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})