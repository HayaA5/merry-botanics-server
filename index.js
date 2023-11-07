
require("dotenv").config()
require('./DL/db').connect();
const express = require('express'),
    app = express();


//Cors Configuration - Start
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "POST, PUT, PATCH, GET, DELETE"
    )
    return res.status(200).json({})
  }
  next()
})
//Cors Configuration - End



 const   port = process.env.PORT||3005;

const router=require('./Routes');



app.use(express.json()) 
app.use(require('cors')())

//
// const corsOptions = {
//     origin: ["https://merry-botanics-0428204315fa.herokuapp.com/"],
//     preflightContinue:false,
//     credentials: true
//   }
//   app.use(cors(corsOptions));
  //
app.use("/api", router); //IS EQUIVALENT TO app.use("/api", require('./Routes'));



app.listen(port, () => console.log(`server is running => ${port}`))


