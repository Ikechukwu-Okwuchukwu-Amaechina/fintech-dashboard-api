// Swagger configuration for fintech-dashboard
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fintech Dashboard API',
      version: '1.0.0',
      description: 'API documentation for the Fintech Dashboard project.'
    },
    servers: [
      { url: 'http://localhost:5000', description: 'Local server' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Authorization header using the Bearer scheme.'
        }
      }
    },
    
  },
  apis: ['./routes/*.js']
});

module.exports = { swaggerUi, swaggerSpec };
