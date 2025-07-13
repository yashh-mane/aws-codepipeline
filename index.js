const express = require("express");
const apiInvoke = require("./apiCall");
const app = express();
const dotenv = require("dotenv");

app.use(express.json());
dotenv.config();


app.post('/api/create-order', async (req, res) => {
  try {
    const requestData = req.body || '';
    console.log("Incoming request::", JSON.stringify(requestData));

    const apiResponse = await apiInvoke(JSON.stringify(requestData));
    console.log("API Backend Response:: ", apiResponse);

    res.status(apiResponse.statusCode).json(apiResponse.body);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Listening on " + process.env.PORT);
});

module.exports = app;
