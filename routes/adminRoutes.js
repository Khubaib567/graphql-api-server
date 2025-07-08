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
const {employees} = require('../database');
// Import the Employee Schema
const {EmployeeType} = require('../schemas/Employee');
// Import the Sort Type Schema
const {SortOrderType} = require('../schemas/SortType');
// Import the Employee Connection Schema 
const {EmployeeConnectionType} = require('../schemas/EmployeeConnectionType')

const rootQuery = new GraphQLObjectType({
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
    // Find Employees with Pagination
    employeesRange: {
      type: EmployeeConnectionType,
      args: {
        first: { type: GraphQLInt }, // Number of employees to fetch
        after: { type: GraphQLString }, // Cursor (plain 'id')
      },
      resolve: (_, { first = 2, after }) => {
        // Find the starting index based on the 'id'
        const startIndex = after
          ? employees.findIndex((emp) => emp.id === after) + 1
          : 0;

        // Paginate employees
        const paginatedEmployees = employees.slice(startIndex, startIndex + first);

        // Create edges
        const edges = paginatedEmployees.map((employee) => ({
          node: employee,
          cursor: employee.id, // Use 'id' as the cursor
        }));

        // PageInfo
        const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;
        const hasNextPage = startIndex + first < employees.length;

        return {
          totalCount: employees.length,
          edges,
          pageInfo: {
            endCursor,
            hasNextPage,
          },
        };
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',

  // Add a project
  fields:{
    addEmployee: {
      type: EmployeeType,
      args: {
        id: { type:  GraphQLNonNull(GraphQLID) },
        name: { type:  GraphQLNonNull(GraphQLString) },
        age: { type:  GraphQLNonNull(GraphQLInt) },
        class: { type:  GraphQLNonNull(GraphQLString) },
        subjects:{
          type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString)))
        },
        attendance: { type: GraphQLNonNull(GraphQLString) },
      },

      resolve(parent, args) {
        const employee = {
          id : args.id,
          name: args.name,
          age: args.age,
          class: args.class,
          subjects: args.subjects,
          attendance : args.attendance

        };

        // Use the `find` method to locate the object with the specified ID
        const index = employees.findIndex(emp => emp.id === employee.id);

        // Doesn't Update if object property doesn't exist.
        if (index !== -1) {
          throw new Error(`User with this id ${employee.id} already exist!`)
        } 

        employees.push(employee)
        return employee;
        
        },
      },

    // Update a project
    updateEmployee: {
      type: EmployeeType,
      args: {
        id: { type:  GraphQLNonNull(GraphQLID) },
        name: { type:  (GraphQLString) },
        age: { type:  (GraphQLInt) },
        class: { type:  (GraphQLString) },
        subjects:{
          type: new GraphQLList(new GraphQLNonNull(GraphQLString))
        },
        attendance: { type: (GraphQLString) },
      },
      resolve(parent, args) {
        const employee = {
          id : args.id,
          name: args.name,
          age: args.age,
          class: args.class,
          subjects: args.subjects,
          attendance : args.attendance
        };
        const index = employees.findIndex(emp => emp.id === employee.id);
        
        // Doesn't Update if object property doesn't exist.
        if (index === -1) {
          throw new Error(`User with this id ${employee.id} doesn't exist!`)
        } 
        
        // Update the object property if it's exist.
        if (index !== -1) {
          employees[index].name = employee.name; // Update the name property
          employees[index].age = employee.age; // Update the age property
          employees[index].class = employee.class; // Update the class property
          employees[index].subjects = employee.subjects; // Update the subjects property
          employees[index].attendance = employee.attendance; // Update the attendance property  
        }

        return employees[index]

        },

      }
    
    },
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation : mutation,
});
