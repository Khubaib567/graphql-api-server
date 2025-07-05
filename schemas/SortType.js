const {
  GraphQLEnumType,
} = require('graphql');


// Define the SortOrder Enum type
const SortOrderType = new GraphQLEnumType({
    name: 'SortOrder',
    values: {
      ASC: { value: 'ASC' },
      DESC: { value: 'DESC' },
    },
  });
  

module.exports = {SortOrderType}