const CusotmerModal = require("../../models/customer");

const getCustomers = (root, args, context, info) => {
  return CusotmerModal.find().exec();
};
const getCustomer = (root, args, context, info) => {
  console.log("args", args);

  return CusotmerModal.findOne({shop_name : args.shop_name } ).exec();
};

const setCustomer = (root, args, context, info) => {
  console.log(args)
  var customer = new CusotmerModal(args);
  return customer.save();
};

const delCustomer = (root, args, context, info) => {
  console.log("args", args);
  return CusotmerModal.deleteOne({ shop_name: args.shop_name }).exec();
};

const editCustomer = (root, args, context, info) => {
  console.log("=>>>>>>>>>>>>>>>>>>> samir " , args)
  CusotmerModal.updateOne({shop_name : args.shop_name } , args).exec();
};

module.exports = { getCustomer, getCustomers, setCustomer, delCustomer , editCustomer };
