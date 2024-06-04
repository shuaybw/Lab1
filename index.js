const express = require("express");
const app = express();
const path = require("path");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('Views'));
app.use("/api/recipes", require("./Routes/recipeRouter"));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
