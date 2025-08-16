const mongoose = require("mongoose");
const { Schema } = mongoose;

const CompanyDetailsSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const CompanyDetails = mongoose.model("CompanyDetails", CompanyDetailsSchema);
module.exports = CompanyDetails;
