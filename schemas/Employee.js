const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require('graphql');

// Create a Schema For Employee Type
const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt  },
      class: { type: GraphQLString },
      subjects: { type:  GraphQLList((GraphQLString))},
      attendance: { type: GraphQLString },
    }),
  });


module.exports = {EmployeeType}