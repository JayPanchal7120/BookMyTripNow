const jwt = require ("jsonwebtoken");
const UserRegistration = require("../models/registers");

const auth = async (req,res,next) =>{
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token,process.env.SECRET);
        // console.log(verifyUser);
        const user = await UserRegistration.findOne({_id:verifyUser._id});
        // console.log(user)
        req.user=user;
        req.token=token;
        next();
    } catch (error) {
        res.status(401).send(error);
    }
}

module.exports = auth;