import { GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString, GraphQLBoolean } from "graphql";
  
  import { CustomerType, CustomerInputType } from "./customer/type";
  
  import { getCustomer, getCustomers, setCustomer, delCustomer } from "./customer/resolver";
  
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
  
  export default new GraphQLSchema({
    query,
    mutation
  });
  