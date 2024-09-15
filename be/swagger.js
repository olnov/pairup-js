require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0', debug: true });


const doc = {
  info: {
    title: 'PairUP API',
    description: 'API backend for PairUP app'
  },
  host: process.env.SWAGGER_BE,
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        in: 'header',
        name: 'Authorization',
        description: 'Bearer token to access these api endpoints',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};



const outputFile = './swagger-output.json';
const routes = ['./app.js'];


swaggerAutogen(outputFile, routes, doc);