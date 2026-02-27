const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutrs");
const challengeRoute = require("./routes/challengeRoute");

const swaggerJsdoc  = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');



const app = express();

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",   // 👈 OAS3
    info: {
      title: "BugHunt API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "Enter JWT token WITHOUT 'Bearer' prefix. Swagger will add it automatically.",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [
    "./src/routes/authRoutrs.js",
    "./src/routes/challengeRoute.js",
  ],
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/challenges", challengeRoute);

module.exports = app;