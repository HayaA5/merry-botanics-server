// import serverless from "serverless-http";
// import express, { Router } from "express";
//-------
const corsOptions = require('./config/corsOptions')
//---------
require("dotenv").config()
require('./DL/db').connect();
const express = require('express'),
    app = express(), cors = require("cors");
// const corsOptions = require('./config/corsOptions')
const port = process.env.PORT || 3005;
const router = require('./Routes');
// const connectDB = require('./config/dbConn')

app.use(cors(corsOptions))
app.use(express.json())
app.use(cors())
app.use("/api", router); //app.use("/api", require('./Routes'));

app.listen(port, () => console.log(`server is running => ${port}`))


// export const handler = serverless(app);