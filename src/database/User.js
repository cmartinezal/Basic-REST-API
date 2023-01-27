const DB = require('./db.json');
const { saveToDatabase } = require('./utils');

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         age:
 *           type: numeric
 *           example: 25
 *         name:
 *           type: string
 *           example: Jacobs Hayden
 *         email:
 *           type: string
 *           example: bettysloan@email.com
 *         password:
 *           type: string
 *           example: secretPass1
 *         gender:
 *           type: string
 *           example: female
 *         state:
 *           type: string
 *           example: New York
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *     UserCreate:
 *       type: object
 *       properties:
 *         age:
 *           type: numeric
 *           example: 25
 *         name:
 *           type: string
 *           example: Jacobs Hayden
 *         email:
 *           type: string
 *           example: bettysloan@email.com
 *         password:
 *           type: string
 *           example: secretPass1
 *         gender:
 *           type: string
 *           example: female
 *         state:
 *           type: string
 *           example: New York
 */

const getAllUsers = () => {
	try {
		let users = DB.users;
		return users;
	} catch (error) {
		throw { status: 500, message: error };
	}
};

const getOneUser = (userId) => {
	try {
		const user = DB.users.find((user) => user.id === userId);
		if (!user) {
			throw {
				status: 400,
				message: `Can't find user with the id '${userId}'`,
			};
		}
		return user;
	} catch (error) {
		throw { status: error?.status || 500, message: error?.message || error };
	}
};

const getUserByEmail = (email) => {
	try {
		const user = DB.users.find((user) => user.email === email);
		if (!user) {
			throw {
				status: 400,
				message: `Can't find user with the email '${email}'`,
			};
		}
		return user;
	} catch (error) {
		throw { status: error?.status || 500, message: error?.message || error };
	}
};

const createNewUser = (newUser) => {
	try {
		const isAlreadyAdded = DB.users.findIndex((user) => user.email === newUser.email) > -1;
		if (isAlreadyAdded) {
			throw {
				status: 400,
				message: `User with the email '${newUser.email}' already exists`,
			};
		}
		DB.users.push(newUser);
		saveToDatabase(DB);
		return newUser;
	} catch (error) {
		throw { status: error?.status || 500, message: error?.message || error };
	}
};

const updateOneUser = (userId, changes) => {
	try {
		const isAlreadyAdded = DB.users.findIndex((user) => user.email === changes.email) > -1;
		if (isAlreadyAdded) {
			throw {
				status: 400,
				message: `User with the email '${changes.email}' already exists`,
			};
		}
		const indexForUpdate = DB.users.findIndex((user) => user.id === userId);
		if (indexForUpdate === -1) {
			throw {
				status: 400,
				message: `Can't find user with the id '${userId}'`,
			};
		}
		const updatedUser = {
			...DB.users[indexForUpdate],
			...changes,
			updatedAt: new Date().toISOString(),
		};
		DB.users[indexForUpdate] = updatedUser;
		saveToDatabase(DB);
		return updatedUser;
	} catch (error) {
		throw { status: error?.status || 500, message: error?.message || error };
	}
};

const deleteOneUser = (userId) => {
	try {
		const indexForDeletion = DB.users.findIndex((user) => user.id === userId);
		if (indexForDeletion === -1) {
			throw {
				status: 400,
				message: `Can't find user with the id '${userId}'`,
			};
		}
		DB.users.splice(indexForDeletion, 1);
		saveToDatabase(DB);
	} catch (error) {
		throw { status: error?.status || 500, message: error?.message || error };
	}
};

module.exports = {
	getAllUsers,
	createNewUser,
	getOneUser,
	updateOneUser,
	deleteOneUser,
	getUserByEmail,
};
