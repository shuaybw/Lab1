const express = require("express");
const app = express();
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
connectDb();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use("/api/recipes", require("./Routes/recipeRouter"));


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})  