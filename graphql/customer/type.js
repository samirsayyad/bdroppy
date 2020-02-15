const graphql = require("graphql");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = graphql;

const CustomerProps = {
    api_key: { type: GraphQLString },
    api_password: { type: GraphQLString },
    api_mode: { type: GraphQLString },
    shop_name: { type: GraphQLString },
    access_token: { type: GraphQLString },
    created_at: { type: GraphQLString },
};

const CustomerType = new GraphQLObjectType({
  name: "customer",
  fields: {
    id: { type: GraphQLID },
    ...CustomerProps
  }
});

module.exports = { CustomerType, CustomerInputType: CustomerProps };
