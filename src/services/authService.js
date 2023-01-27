const Auth = require('../database/Auth');

const generateAccessToken = (email) => {
	try {
		const token = Auth.generateAccessToken(email);
		return token;
	} catch (error) {
		throw error;
	}
};

const validateAccessToken = (token) => {
	try {
		const authResponse = Auth.validateAccessToken(token);
		return authResponse;
	} catch (error) {
		throw error;
	}
};

const validateRefreshToken = (token) => {
	try {
		const authResponse = Auth.validateRefreshToken(token);
		return authResponse;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	generateAccessToken,
	validateAccessToken,
	validateRefreshToken,
};
