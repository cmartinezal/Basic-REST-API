const DB = require('./db.json');
const jwt = require('jsonwebtoken');
//Private keys
const ACCESS_TOKEN_SECRET =
	'dfcd2db8ecab53897a642815b61db8c782a66481d673c360a814e62cbc7bdf89d683090b6d78b7aed8db2dd860aa10bc459067426849267eb8b11e7fd4e5138a';
const REFRESH_TOKEN_SECRET =
	'0c934e46a4c37a6648d16b99f9f9bba5df21a9b829e9833d39af35b5df49be3d15789066299eb23125f4d452ea867797bcb5d1e298dced41bc2fe325015f4f52';

/**
 * @openapi
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: bettysloan@email.com
 *         password:
 *           type: string
 *           example: secretPass1
 *     Token:
 *       type: object
 *       properties:
 *         access_token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *         refresh_token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *         token_type:
 *           type: string
 *           example: Bearer
 *         expires_in:
 *           type: int
 *           example: 15 min
 *     RefreshToken:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 */

const generateAccessToken = (email) => {
	try {
		const user = DB.users.find((user) => user.email === email);
		if (!user) {
			throw {
				status: 404,
				message: 'User not found',
			};
		}
		const accessToken = jwt.sign({ id: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
		const refreshToken = jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: '20m' });
		const token = { id: user.id, accessToken, refreshToken };
		return token;
	} catch (error) {
		throw { status: error?.status || 500, message: error?.message || error };
	}
};

const validateAccessToken = (token) => {
	try {
		var tokenData = jwt.verify(token, ACCESS_TOKEN_SECRET);
		const user = DB.users.find((user) => user.id === tokenData.id);
		if (!user) {
			throw {
				status: 401,
				message: 'Not authorized',
			};
		}
		return tokenData;
	} catch (error) {
		throw { status: error?.status || 500, message: error?.message || error };
	}
};

const validateRefreshToken = (token) => {
	try {
		var tokenData = jwt.verify(token, REFRESH_TOKEN_SECRET);
		const user = DB.users.find((user) => user.id === tokenData.id);
		if (!user) {
			throw {
				status: 401,
				message: 'Not authorized',
			};
		}
		return tokenData;
	} catch (error) {
		throw { status: error?.status || 500, message: error?.message || error };
	}
};

module.exports = {
	generateAccessToken,
	validateAccessToken,
	validateRefreshToken,
};
