const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const userService = require('../services/userService');
const authService = require('../services/authService');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const generateAccessToken = (req, res) => {
	try {
		const { body } = req;
		const email = body.email;
		if (!body.email || !body.password) res.status(400).send('Bad request');
		const user = userService.getUserByEmail(email);
		if (!user) res.status(404).send('User does not exist!');
		const validPassword = bcrypt.compareSync(body.password, user.password);
		if (!validPassword) return res.status(400).send('Invalid Email or Password.');
		const token = authService.generateAccessToken(body.email);
		res.send({ status: 'OK', access_token: token.accessToken, refresh_token: token.refreshToken, token_type: 'Bearer', expires_in: '15 min' });
	} catch (error) {
		res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error } });
	}
};

const refreshAccessToken = (req, res) => {
	try {
		const { body } = req;
		const refreshToken = body.token;
		if (!refreshToken) res.status(400).send('Bad request');
		const tokenUser = authService.validateRefreshToken(refreshToken);
		const user = userService.getOneUser(tokenUser.id);
		if (!user) res.status(401).send('Not authorized');
		const token = authService.generateAccessToken(user.email);
		res.send({ status: 'OK', access_token: token.accessToken, refresh_token: token.refreshToken, token_type: 'Bearer', expires_in: '15 min' });
	} catch (error) {
		res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error } });
	}
};

module.exports = {
	generateAccessToken,
	refreshAccessToken,
};
