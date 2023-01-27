const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Basic Information about our API
const options = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: { title: 'Basic REST API', version: '1.0.0', description: 'Basic REST API to manage Users' },
		servers: [{ url: 'http://localhost:3000' }],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					name: 'Authorization',
					bearerFormat: 'JWT',
					in: 'header',
					description: 'Requests should pass a basic authorization header',
				},
			},
		},
		/*
		security: [
			{
				bearerAuth: [],
			},
		],*/
	},

	apis: ['./src/v1/routes/authRoutes.js', './src/database/Auth.js', './src/v1/routes/userRoutes.js', './src/database/User.js'],
};

var swaggerOptions = {
	swaggerOptions: {
		operationsSorter: (a, b) => {
			//Method to order urls
			var methodsOrder = ['get', 'patch', 'post', 'put', 'delete', 'trace', 'options'];
			var result = methodsOrder.indexOf(a.get('method')) - methodsOrder.indexOf(b.get('method'));
			if (result === 0) {
				result = a.get('path').localeCompare(b.get('path'));
			}

			return result;
		},
	},
};
// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
const swaggerDocs = (app, port) => {
	// Route-Handler to visit our docs
	app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));
	// Make our docs in JSON format available
	app.get('/api/v1/docs.json', (req, res) => {
		res.setHeader('Content-Type', 'application/json');
		res.send(swaggerSpec);
	});
	console.log(`Version 1 Docs are available on http://localhost:${port}/api/v1/docs`);
};

module.exports = { swaggerDocs };
