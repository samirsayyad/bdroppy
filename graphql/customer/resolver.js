import CusotmerModal, { find, findOne, deleteOne } from "../../models/customer";

const getCustomers = (root, args, context, info) => {
  return find().exec();
};
const getCustomer = (root, args, context, info) => {
  return findOne({shop_name : args.shop_name } ).exec();
};

const setCustomer = (root, args, context, info) => {
  var customer = new CusotmerModal(args);
  return customer.save();
};

const delCustomer = (root, args, context, info) => {
  console.log("args", args);
  return deleteOne({ shop_name: args.shop_name }).exec();
};

export default { getCustomer, getCustomers, setCustomer, delCustomer };
