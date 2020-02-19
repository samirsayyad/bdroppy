const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean
} = require("graphql");

const { CustomerType, CustomerInputType } = require("./customer/type");

const {
  getCustomer,
  getCustomers,
  setCustomer,
  delCustomer ,
  editCustomer
} = require("./customer/resolver");

  const query = new GraphQLObjectType({
    name: "CustomerQuery",
    fields: {
      customers: {
        type: GraphQLList(CustomerType),
        resolve: getCustomers
      },
  
      customer: {
        type: CustomerType,
        args: {
          shop_name: { type: GraphQLNonNull(GraphQLString) }
        },
        resolve: getCustomer
      }
    }
  });
  
  const mutation = new GraphQLObjectType({
    name: "CustomerMutation",
    fields: {
      setCustomer: {
        type: CustomerType,
        args: CustomerInputType,
        resolve: setCustomer
      },
      delCustomer: {
        type: CustomerType,
        args: CustomerInputType,
        resolve: delCustomer
      }
      ,
      editCustomer: {
        type: CustomerType,
        args: CustomerInputType,
        resolve: editCustomer
      }
    }
  });
  
  module.exports = new GraphQLSchema({
    query,
    mutation
  });