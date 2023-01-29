const bcrypt = require('bcrypt');
const userService = require('../services/userService');
const authService = require('../services/authService');

const generateAccessToken = (req, res) => {
	try {
		const { body } = req;
		if (!body.email || !body.password) res.status(400).send('Bad request: email and password required');
		const user = userService.getUserByEmail(body.email);
		if (!user) res.status(401).send('Not authorized');
		const validPassword = bcrypt.compareSync(body.password, user.password);
		if (!validPassword) return res.status(401).send('Not authorized');
		const token = authService.generateAccessToken(body.email);
		res.send({ status: 'OK', access_token: token.accessToken, refresh_token: token.refreshToken, token_type: 'Bearer', expires_in: '15 min' });
	} catch (error) {
		res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error } });
	}
};

const refreshAccessToken = (req, res) => {
	try {
		const { body } = req;
		if (!body.token) res.status(400).send('Bad request: token is required');
		const tokenUser = authService.validateRefreshToken(body.token);
		const user = userService.getOneUser(tokenUser.id);
		if (!user) res.status(401).send('Not authorized');
		const token = authService.generateAccessToken(user.email);
		res.send({ status: 'OK', access_token: token.accessToken, refresh_token: token.refreshToken, token_type: 'Bearer', expires_in: '15 min' });
	} catch (error) {
		res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error } });
	}
};

const validateAccessToken = (req, res, next) => {
	const {
		headers: { authorization },
	} = req;
	try {
		if (!authorization) res.sendStatus(400).send('Authorization required');
		const token = authorization.split(' ')[1];
		const authResponse = authService.validateAccessToken(token);
		next();
	} catch (error) {
		res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error } });
	}
};

module.exports = {
	generateAccessToken,
	refreshAccessToken,
	validateAccessToken,
};
