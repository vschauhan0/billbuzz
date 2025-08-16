const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");


const JWT_sign = process.env.JWT_SECRET;

// Route 1: create user using "/api/auth/createuser" authrntication not required
router.post(
  "/createuser",
  [body("email").isEmail(), body("password").isLength({ min: 3 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, process.env.JWT_SECRET);

      res.json({ authToken });
    } catch (error) {
      res.status(500).send("some error ");
    }
  }
);

// Route : login user using "/api/auth/loginuser" authrntication not required
router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        res.json({ message: "Invalid credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      res.json({ authToken, email: user.email });
    } catch (error) {
      res.status(500).send("some error ");
      console.log(error);
    }
  }
);

// Route 3: get logged in user details using "/api/auth/logindetails" login require
router.post(
  "/logindetails",fetchuser,
  [
    body("email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user)
    } catch (error) {
      res.status(500).send("some error ");
    }
  }
);
module.exports = router;
