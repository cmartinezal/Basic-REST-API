const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const v1AuthRouter = require('./v1/routes/authRoutes');
const v1UserRouter = require('./v1/routes/userRoutes');
const { swaggerDocs: V1SwaggerDocs } = require('./v1/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// adding Helmet to enhance your API's security
app.use(helmet());
// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
// enabling CORS for all requests
app.use(cors());
// adding morgan to log HTTP requests
app.use(morgan('tiny'));
// setup routes
app.use('/api/v1/auth', v1AuthRouter);
app.use('/api/v1/users', v1UserRouter);

app.listen(PORT, () => {
	console.log(`API is listening on port ${PORT}`);
	V1SwaggerDocs(app, PORT);
});
