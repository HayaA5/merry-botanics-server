
require("dotenv").config()
require('./DL/db').connect();
const express = require('express'),
    app = express(),
    port = process.env.PORT||3005;

const router=require('./Routes');



app.use(express.json()) 
app.use(require('cors')())


app.use("/api", router); //IS EQUIVALENT TO app.use("/api", require('./Routes'));



app.listen(port, () => console.log(`server is running => ${port}`))


