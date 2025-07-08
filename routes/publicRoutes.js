const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
} = require('graphql');

// Import Custom Data
const {employees} = require('../database/model');
// Import the Employee Schema
const {EmployeeType} = require('../schemas/Employee');
// Import the Sort Type Schema
// const {SortOrderType} = require('../schemas/SortType');


const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Find All Employees with Optional Filters
    employees: {
      type: EmployeeType,
      args: { 
        id: { type: GraphQLID } , 
        name: { type: GraphQLString },
        age : {type: GraphQLInt} ,
        class : {type: GraphQLString} ,
        subjects : {type: GraphQLString} ,
        attendance : {type: GraphQLString} ,
        // sortBy : {type: GraphQLString},
        // sortOrder : {type: SortOrderType }
      },
      resolve : async (parent, args) => {
        // Destructure optional filter arguments
        // const { name , id , age , sortBy , sortOrder} = args;
        // Filter users based on provided arguments
        const filteredEmployees =  await employees.findAll(); 
         
        // Sorting logic
        // if (sortBy) {
        //   const order = sortOrder === 'DESC' ? -1 : 1;
        //   filteredEmployees = filteredEmployees.sort((a, b) => {
        //     if (a[sortBy] < b[sortBy]) return -1 * order;
        //     if (a[sortBy] > b[sortBy]) return 1 * order;
        //     return 0;
        //   });
        // }

        return filteredEmployees;
      },
    },
    // Find Single Employee Details
    employee: {
      type: EmployeeType ,
      args: { id: { type: GraphQLID } },
      resolve : async (parent, args) => {
        const employee = await employees.findByPk(args.id)
        return employee
      }
    },
  },
});


module.exports = new GraphQLSchema({
  query: rootQuery,
});
