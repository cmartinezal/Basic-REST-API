const userService = require('../services/userService');
const authController = require('../controllers/authController');
const bcrypt = require('bcrypt');

const getAllUsers = (req, res) => {
	try {
		authController.validateAccessToken(req, res);
		const allUsers = userService.getAllUsers();
		res.send({ status: 'OK', data: allUsers });
	} catch (error) {
		res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error } });
	}
};

const getOneUser = (req, res) => {
	authController.validateAccessToken(req, res);
	const {
		params: { userId },
	} = req;
	if (!userId) {
		res.status(400).send({
			status: 'FAILED',
			data: { error: "Parameter ':userId' can not be empty" },
		});
	}
	try {
		const user = userService.getOneUser(userId);
		res.send({ status: 'OK', data: user });
	} catch (error) {
		res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error } });
	}
};

const createNewUser = async (req, res) => {
	authController.validateAccessToken(req, res);
	const { body } = req;
	if (!body.age || !body.name || !body.email || !body.password || !body.gender || !body.state) {
		res.status(400).send({
			status: 'FAILED',
			data: {
				error: "One of the following keys is missing or is empty in request body: 'age', 'name' 'email', 'password', 'gender', 'state'",
			},
		});
		return;
	}
	const hashedPassword = await bcrypt.hash(req.body.password, 8);
	const newUser = {
		age: body.age,
		name: body.name,
		email: body.email,
		password: hashedPassword,
		gender: body.gender,
		state: body.state,
	};
	try {
		const createdUser = userService.createNewUser(newUser);
		res.status(201).send({ status: 'OK', data: createdUser });
	} catch (error) {
		res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error } });
	}
};

const updateOneUser = (req, res) => {
	authController.validateAccessToken(req, res);
	const {
		body,
		params: { userId },
	} = req;
	if (!userId) {
		res.status(400).send({
			status: 'FAILED',
			data: { error: "Parameter ':userId' can not be empty" },
		});
	}
	if (!body.age || !body.name || !body.email || !body.password || !body.gender || !body.state) {
		res.status(400).send({
			status: 'FAILED',
			data: {
				error: "One of the following keys is missing or is empty in request body: 'age', 'name' 'email', 'password', 'gender', 'state'",
			},
		});
		return;
	}
	try {
		const updatedUser = userService.updateOneUser(userId, body);
		res.send({ status: 'OK', data: updatedUser });
	} catch (error) {
		res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error } });
	}
};

const deleteOneUser = (req, res) => {
	authController.validateAccessToken(req, res);
	const {
		params: { userId },
	} = req;
	if (!userId) {
		res.status(400).send({
			status: 'FAILED',
			data: { error: "Parameter ':userId' can not be empty" },
		});
	}
	try {
		userService.deleteOneUser(userId);
		res.status(204).send({ status: 'OK' });
	} catch (error) {
		res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error } });
	}
};

module.exports = {
	getAllUsers,
	getOneUser,
	createNewUser,
	updateOneUser,
	deleteOneUser,
};
