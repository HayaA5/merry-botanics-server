const express = require("express"),
  router = express.Router(),
  userServices = require("../BL/user.service"),
  auth = require("../middleware/auth");


//const { authJWT } = require("../middleware/auth")


router.get("/", async (req, res) => {
  try {
    const result = await userServices.getAllUsers(req.body);
    res.send(result);
  } catch (error) {
    res.status(error.code).send(error.msg);
  }
});

router.get("/user", async (req, res) => {
  try {
    const result = await userServices.getUser(req.body);
    res.send(result);
  } catch (error) {
    console.log("error in route /user")
    res.status(error.code).send(error.message);
  }
});

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const result = await userServices.register(req.body);
    res.send(result);
  } catch (error) {
    res.status(error.code).send(error.msg);
  }
});

router.post("/login", async (req, res) => {
  try {
    const result = await userServices.login(req.body);
    res.send(result);
  } catch (error) {
    console.log("error login route ", error.message)
    res.status(error.code).send(error.message);
  }
});

router.put("/changepassword",
   async (req, res) => {
     try {
      // const result = await userServices.createTokenForPasswordReset(req.body);
       const result = await userServices.resetPassword(req.body);
       res.send(result);
     } catch (error) {
       res.status(error.code).send(error.msg);
     }
   }
 );

// router.post(
//   "/detectingpasswordchange", auth.verifyTokenForPasswordChange,
//   async (req, res) => {
//     try {
//       const result = await userServices.getPasswordVerification(req.body)
//       res.send(result);
//     } catch (error) {
//       res.status(error.code).send(error.msg);
//     }
//   })

module.exports = router;
