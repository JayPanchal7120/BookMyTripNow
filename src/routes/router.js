const express = require("express");
const route = express.Router();

const auth = require("../middleware/auth");

const services = require("../services/render");
const controller = require('../controller/controller');

//APIs
route.get("/api/trainbetweenstation/:id", controller.findtrain);
route.get("/api/flightbetweenstation/:id", controller.findflight);

route.get("/api/traincharge",controller.traincharge);
route.get("/api/flightcharge",controller.flightcharge);

// route.get("/api/bookedtrains",controller.bookedtrains);
// hi vraj

//Routes
route.get("", services.homeRoutes);

route.get("/train", auth, services.trainBookings);

route.post("/trainbookingSuccessful", auth, services.trainbookingSuccessful);

route.post("/flightbookingSuccessful", auth, services.flightbookingSuccessful);

route.post("/searchtrain", auth, services.searchTrain);

route.post("/searchflight", auth, services.searchFlight);

route.get("/secret", auth, services.secret);

route.get("/flight", auth, services.flight);

route.get("/cab", auth, services.cab);

route.get("/bus", auth, services.bus);

route.get("/trainbookingForm", auth, services.trainbookingForm);

route.get("/flightbookingForm", auth, services.flightbookingForm);

route.get("/hotel", auth, services.hotel);

route.get("/login", services.loginRegister);

route.get("/logout", auth, services.logout);

route.post("/signin", services.signin);

route.post("/register", services.register);

route.get("*", services.error404);


////APIs

module.exports = route;
