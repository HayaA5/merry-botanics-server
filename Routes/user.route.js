const express = require("express"),
router = express.Router(),
userServices = require("../BL/user.service");
//auth = require("../middleware/auth");

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
    res.status(error.code).send(error.message);
  }
});

router.post("/register", async (req, res) => {
  try {
    const result = await userServices.register(req.body);
    res.send(result);
   
  } catch (error) {
   // res.status(error.code).send(error.msg);
   res.send(error.code, error.msg);
  }
});

router.post("/login", async (req, res) => {
  try {
    const result = await userServices.login(req.body);
    res.send(result);
  } catch (error) {
    res.status(error.code).send(error.message);
  }
});

module.exports = router;
