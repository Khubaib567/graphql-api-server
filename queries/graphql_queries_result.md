# GraphQL Queries & Mutations

## Query to get all the employees with optional filtering

```
{
  employees(sortBy: "age", sortOrder:DESC ){
    name
		age
		class
		subjects
		attendance

  }
}

```

## Query to get the details of a single employee.

```
{
  employee(id: 1) {
    name
		age
		class
		subjects
		attendance

  }
}

```

## Query to List employees with pagination.

```
{
  employeesRange(first: 3, after: "1") {
    totalCount
    edges {
      node {
        id
        name
        age
        class
        subjects
        attendance
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

```

## Query to Add a new employee

```
mutation {
  addEmployee(id:6 ,name: "Employee G", age: 30 , class: "Class G"){
		name
		age
  }
}

```

## Update a project status and return name and status

```
mutation {
  	updateEmployee(id:5 , age: 35 ){
      age
  	}
}
```
