const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require('graphql');


// Import the Employee Pagination Schema
const {EmployeeEdgeType} = require('./EmployeeEdge.js');
// Import the Page Info Type Schema
const {PageInfoType} = require('./PageInfoType.js')

// Connection Type for Employees
const EmployeeConnectionType = new GraphQLObjectType({
    name: "EmployeeConnection",
    fields: () => ({
      totalCount: { type: new GraphQLNonNull(GraphQLInt) },
      edges: { type: new GraphQLNonNull(new GraphQLList(EmployeeEdgeType)) },
      pageInfo: { type: new GraphQLNonNull(PageInfoType) },
    }),
  });

module.exports = {EmployeeConnectionType}