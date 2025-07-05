const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');


// Import the Employee Schema
const {EmployeeType} = require('../schemas/Employee');

// Edge Type for Pagination
const EmployeeEdgeType = new GraphQLObjectType({
    name: "EmployeeEdge",
    fields: () => ({
      node: { type: EmployeeType },
      cursor: { type: new GraphQLNonNull(GraphQLString) }, // Cursor is required
    }),
  });



module.exports = {EmployeeEdgeType}