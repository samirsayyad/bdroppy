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
  delCustomer
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
          id: { type: GraphQLNonNull(GraphQLID) }
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
    }
  });
  
  module.exports = new GraphQLSchema({
    query,
    mutation
  });