
require("dotenv").config()
require('./DL/db').connect();
const express = require('express'),
    app = express(),
    port = process.env.PORT||3005;

const router=require('./Routes');



app.use(express.json()) 
app.use(require('cors')())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", " https://merry-botanics-server-d0d59207f054.herokuapp.com/");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  })

app.use("/api", router); //IS EQUIVALENT TO app.use("/api", require('./Routes'));



app.listen(port, () => console.log(`server is running => ${port}`))


