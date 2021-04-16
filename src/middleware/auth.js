const jwt = require("jsonwebtoken");
const UserRegistration = require("../models/registers");
const sendResponse = require("../../utils/sendResponse");

const auth = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;
		const verifyUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
		// console.log(verifyUser);
		const user = await UserRegistration.findOne({ _id: verifyUser._id });
		// console.log(user)
		req.user = user;
		req.token = token;
		next();
	} catch (error) {
		res.render("loginRegister", { msg: "", logged: false });
		// return sendResponse("Please login first", res, 201);
	}
};

module.exports = auth;
