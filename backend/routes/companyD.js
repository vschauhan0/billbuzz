const express = require("express");
const CompanyDetails = require("../models/CompanyDetails");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_sign = process.env.JWT_SECRET;

// Route 1: create user using "/api/componyD/createCompany" authrntication required
router.post(
  "/createCompany",
  fetchuser,
  [body("email").isEmail(),
    body('companyName', 'Enter a valid companyName').isLength({ min: 3 }),
    body('address', 'Enter a valid companyAddress').isLength({ min: 3}),
    body('phone', 'Enter a valid companyPhone').isLength({ min: 10})
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let company = await CompanyDetails.findOne({ email: req.body.email });
      if(company){
        return res.status(400).json({error: "Company already exists with this email."})
      }      
      const { companyName, email, address, phone } = req.body;
    
      company = await CompanyDetails.create({
        userId: req.user.id, // fetched from the JWT
        companyName,
        email,
        address,
        phone,
      });
      

      res.json(company);
    } catch (error) {
      console.error("Create company error:", error.message);
      res.status(500).send("Server Error");
    }
  }
);

// Route 2: fetch company Details using "/api/componyD/fetchCompany" authrntication required

router.get('/fetchComapany', fetchuser, async (req, res) => {
    try {
        const company = await CompanyDetails.find({ userId: req.user.id });
        res.json(company)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 2: Update company Details using "/api/componyD/updateCompany" authrntication required

router.put('/updateCompany:id', fetchuser, async (req, res) => {
    const { companyName, address, phone } = req.body;
    try {
        const newCompany = {};
        if (companyName) { newCompany.companyName = companyName };
        if (address) { newCompany.address = address };
        if (phone) { newCompany.phone = phone };

        let company = await CompanyDetails.findById(req.params.id);
        if (!company) { return res.status(404).send("Not Found") }

        if (company.userId.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        company = await CompanyDetails.findByIdAndUpdate(req.params.id, { $set: newCompany }, { new: true })
        res.json({ company });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;