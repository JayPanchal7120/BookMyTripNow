const express = require("express");
const route = express.Router();

const auth = require("../middleware/auth");

const services = require("../services/render");
const controller = require('../controller/controller');

route.get('/api/trainbetweenstation/:id', controller.find);
route.get("", services.homeRoutes);

route.get("/train", auth, services.trainBookings);

route.post("/bookingSuccessful", auth, services.bookingSuccessful);

route.post("/searchtrain", auth, services.searchTrain);

route.post("/searchflight", auth, services.searchFlight);

route.get("/secret", auth, services.secret);

route.get("/flight", auth, services.flight);

route.get("/cab", auth, services.cab);

route.get("/bus", auth, services.bus);

route.get("/bookingForm", auth, services.bookingForm);

route.get("/hotel", auth, services.hotel);

route.get("/login", services.loginRegister);

route.get("/logout", auth, services.logout);

route.post("/signin", services.signin);

route.post("/register", services.register);

route.get("*", services.error404);


////APIs

module.exports = route;
