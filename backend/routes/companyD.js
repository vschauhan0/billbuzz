const express = require("express");
const CompanyDetails = require("../models/CompanyDetails");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_sign = process.env.JWT_SECRET;

// Route 1: create user using "/api/componyD/createCompany" authrntication not required
router.post(
  "/createCompany",
  fetchuser,
  [body("email").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { companyName, email, address, contactEmail, phone } = req.body;

      const company = await CompanyDetails.create({
        userId: req.user.id, // fetched from the JWT
        companyName,
        email,
        address,
        contactEmail,
        phone,
      });

      res.json(company);
    } catch (error) {
      console.error("Create company error:", error.message);
      res.status(500).send("Server Error");
    }
  }
);




module.exports = router;