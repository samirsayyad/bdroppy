const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  api_key: String,
  api_password: String,
  api_mode: String,
  shop_name : String ,
  access_token : String ,
  created_at: String
});

module.exports = mongoose.model("customers", customerSchema);