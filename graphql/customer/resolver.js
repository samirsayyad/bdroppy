const CusotmerModal = require("../../models/customer");

const getCustomers = (root, args, context, info) => {
  return CusotmerModal.find().exec();
};
const getCustomer = (root, args, context, info) => {
  return CusotmerModal.findOne({shop_name : args.shop_name } ).exec();
};

const setCustomer = (root, args, context, info) => {
  var customer = new CusotmerModal(args);
  return customer.save();
};

const delCustomer = (root, args, context, info) => {
  console.log("args", args);
  return CusotmerModal.deleteOne({ shop_name: args.shop_name }).exec();
};

module.exports = { getCustomer, getCustomers, setCustomer, delCustomer };
