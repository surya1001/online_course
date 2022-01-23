const swaggerJSDoc = require('swagger-jsdoc');
const express = require('express');
const app = express();

const swaggerDefinition = {
  info: {
    swagger: '1.0',
    title: 'Online Class Portal',
    description: 'ONline Class Portal APIs for student and instructor',
  },
  host: process.env.BASE_URL_SWAGGER,
  basePath: '/api',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'jwt',
      in: 'header',
    },
  },
};
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

module.exports.swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});