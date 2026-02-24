const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutrs");
const challengeRoute = require("./routes/challengeRoute");
const path = require("path");

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');



const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'BugHunt API',
            version: '1.0.0'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        servers: [
            { url: "http://localhost:5000" }
        ]
    },

    apis: ["./src/routes/authRoutrs.js",
        "./src/routes/challengeRoute.js"
    ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/challenges", challengeRoute);

module.exports = app;