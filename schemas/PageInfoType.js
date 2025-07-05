const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
} = require('graphql');

// PageInfo Type
const PageInfoType = new GraphQLObjectType({
    name: "PageInfo",
    fields: () => ({
      endCursor: { type: GraphQLString },
      hasNextPage: { type: new GraphQLNonNull(GraphQLBoolean) },
    }),
});


module.exports = {PageInfoType}