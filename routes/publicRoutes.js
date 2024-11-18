const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require('graphql');

// Import Custom Data
const {employees} = require('../data/sampleData');
// Import the Employee Schema
const {EmployeeType} = require('../schemas/Employee');
// Import the Sort Type Schema
const {SortOrderType} = require('../schemas/SortType');


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Find All Employees with Optional Filters
    employees: {
      type: new GraphQLList(EmployeeType),
      args: { 
        id: { type: GraphQLID } , 
        name: { type: GraphQLString },
        age : {type: GraphQLInt} ,
        sortBy : {type: GraphQLString},
        sortOrder : {type: SortOrderType }
      },
      resolve(parent, args) {
        // Destructure optional filter arguments
        const { name , id , age , sortBy , sortOrder} = args;
        // Filter users based on provided arguments
        let filteredEmployees =  employees.filter(employee => {
          if (name && employee.name !== name) return false;
          if (id && employee.id !== id) return false;
          if (age && employee.age !== age) return false;
          return true;
        }); 
         
        // Sorting logic
        if (sortBy) {
          const order = sortOrder === 'DESC' ? -1 : 1;
          filteredEmployees = filteredEmployees.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return -1 * order;
            if (a[sortBy] > b[sortBy]) return 1 * order;
            return 0;
          });
        }

        return filteredEmployees;
      },
    },
    // Find Single Employee Details
    employee: {
      type: EmployeeType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return employees.find(employee => employee.id === args.id)
      },
    },
  },
});


module.exports = new GraphQLSchema({
  query: RootQuery,
});
