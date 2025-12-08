const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger.json");  // Assuming swagger.json is in the same directory


app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// npm install express dotenv multer @google/genai