// IMPORT THE .ENV VARIABLES IN DEVELOPMENT ENVIRONMENT.
if(process.env.ENV !== "production"){
  require('dotenv').config({path : "../.secrets/.env"})
}
const express = require('express');
const cors = require('cors');
const logger = require('morgan'); // HTTP request logger middleware 
const {limiter} = require('../utils/rateLimiter'); // To Limit the repeated number of requests or mutations.
const { graphqlHTTP } = require('express-graphql');

// Import Different Routes for Secure the APIs
const pubclicRoutes = require('../routes/publicRoutes');
const adminRoutes = require('../routes/adminRoutes');

const port = process.env.PORT || 5000;

const app = express();

// Config an express for incoming requests.
app.use(logger("common"))

// Apply the rate limiting middleware to all requests.
app.use(limiter);

// Apply Cors For Handling Request on Cross-origin.
app.use(cors());

// Config GraphQL APIs based on Role.
app.use(
  '/graphql/public',
  graphqlHTTP({
    schema : pubclicRoutes,
    graphiql: true,
  })
);

app.use(
  '/graphql/auth',
  graphqlHTTP({
    schema: adminRoutes,
    graphiql: true,
  })
);



app.listen(port, console.log(`Server running on port ${port}`));
