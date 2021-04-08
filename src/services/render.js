const Userbooking = require("../models/bookigForm");
const TrainBetweenStation = require("../models/trainsBetweenStation");
const FlightBetweenAirport = require("../models/flightsBetweenAirport");
const UserRegistration = require("../models/registers");

const axios = require('axios');

const bcrypt = require("bcryptjs");

exports.homeRoutes = (req, res) => {
  login_status = false;
  res.render("index",{logged:login_status});
};

exports.trainBookings = (req, res) => {
  res.render("train");
};

exports.trainbookingSuccessful = async (req, res) => {
//   console.log("hi");
  // console.log(req.body);
  try {
  // console.log()

    const password = req.body.password;
    const cpassword = req.body.cpassword;
    const isMatch = await bcrypt.compare(password, req.user.password);
    // console.log(req.body.Tnumber);
    if (isMatch && (password === cpassword)) {
      const ub = new Userbooking({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        Locality: req.body.Locality,
        address: req.body.address,
        State: req.body.State,
        Zip: req.body.Zip,
        dob: req.body.dob,
        phone: req.body.phone,
      });
      // console.log(ub);              
      const booked = await ub.save();
      var ticket = { 
        name : req.body.fname +" "+ req.body.lname,
        trainNo : req.body.Tnumber, 
        trainName : req.body.Tname,
        travelclass : req.body.class,
        from : req.body.from,
        to: req.body.to,
        date: req.body.bookDate,
        atime: req.body.AT,
        dtime: req.body.DT,
        noOfTikets: req.body.noOfTikets,
        dist: req.body.dist
      }

      res.render("trainTicket",{ tik:ticket});
    } else {
      res.send("password are not matching");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.flightbookingSuccessful = async (req, res) => {
  //   console.log("hi");
    // console.log(req.body);
    try {
    // console.log()
  
      const password = req.body.password;
      const cpassword = req.body.cpassword;
      const isMatch = await bcrypt.compare(password, req.user.password);
      // console.log(req.body.Tnumber);
      if (isMatch && (password === cpassword)) {
        const ub = new Userbooking({
          fname: req.body.fname,
          lname: req.body.lname,
          email: req.body.email,
          Locality: req.body.Locality,
          address: req.body.address,
          State: req.body.State,
          Zip: req.body.Zip,
          dob: req.body.dob,
          phone: req.body.phone,
        });
        // console.log(ub);              
        const booked = await ub.save();
        var ticket = { 
          name : req.body.fname +" "+ req.body.lname,
          flightNo : req.body.Fnumber, 
          flightName : req.body.Fname,
          travelclass : req.body.class,
          from : req.body.from,
          to: req.body.to,
          date: req.body.bookDate,
          atime: req.body.TOF,
          dtime: req.body.LT,
          noOfTikets: req.body.noOfTikets,
          dist: req.body.dist
        }
  
        res.render("flightTicket",{ tik:ticket});
      } else {
        res.send("password are not matching");
      }
    } catch (error) {
      res.status(400).send(error);
    }
  };

exports.searchTrain = async (req, res) => {
  try {
    const from = req.body.from;
    const to = req.body.to;
    const day = new Date(req.body.checkIn).getDay();
    const travelclass = req.body.travelclass;
    // console.log(travelclass=="All Class");
    // if(travelclass=="All Class")
    // {
    //   // console.log(from,to,day,travelclass);
    //   var tbs = await TrainBetweenStation.find({ 
    //     $and:[{from: from},{to: to},{day:day}]
    //   });
    // }
    // else
    // {
      var tbs = await TrainBetweenStation.find({ 
        $and:[{from: from},{to: to},{day:day},{classname:travelclass}]
      });
    // }
    res.render("searchTrain", { trains: tbs });
  } catch (err) {
    res.status(201).send("Invalid details...");
  }
};

exports.searchFlight = async (req, res) => {
  try {
    const from = req.body.from;
    const to = req.body.to;
    const day = new Date(req.body.checkIn).getDay();
    const travelclass = req.body.travelclass;
    // console.log(travelclass=="All Class");
    // console.log(from,to,day,travelclass);
    // if(travelclass=="All Class")
    // {
    //   var fbs = await FlightBetweenAirport.find({ 
    //     $and:[{from: from},{to: to},{day:day}]
    //   });
    // }
    // else
    // {
      var fbs = await FlightBetweenAirport.find({ 
        $and:[{from: from},{to: to},{day:day},{classname:travelclass}]
      });
    // }
    res.render("searchFlight", { flights: fbs });
  } catch (err) {
    res.status(201).send("Invalid details...");
  }
};

exports.secret = (req, res) => {
  // console.log(`the cookie is ${req.cookies.jwt1}`);
  res.render("secret");
};

exports.flight = (req, res) => {
  res.render("flight");
};

exports.cab = (req, res) => {
  res.render("cab");
};

exports.bus = (req, res) => {
    res.render("bus");
  };

exports.trainbookingForm = (req, res) => {
  res.render("trainbookingForm");
  // console.log(req.query.id);
};

exports.flightbookingForm = (req, res) => {
  res.render("flightbookingForm");
  // console.log(req.query.id);
};

exports.hotel = (req, res) => {
  res.render("hotel");
};

exports.loginRegister = (req, res) => {
  res.render("loginRegister");
};

exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((current) => {
      return current.token != req.token;
    });

    res.clearCookie("jwt");
    login_status = false;
    console.log("logout successfully...");
    await req.user.save();
    res.render("",{logged:login_status});
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.signin = async (req, res) => {
  try {
    const si_uname = req.body.si_username;
    const si_password = req.body.si_password;

    const usermail = await UserRegistration.findOne({ username: si_uname });
    const isMatch = await bcrypt.compare(si_password, usermail.password);

    const token = await usermail.generateAuthToken();

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 6000000),
      httpOnly: true,
    });
    // console.log(token);
    if (isMatch) {
      login_status = true;
      console.log("login successfully...");
      res.status(201).render("",{logged:login_status});
    } else {
      res.send("Invalid Login details...");
    }
  } catch (err) {
    res.status(201).send("Invalid Login details...");
  }
};

exports.register = async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    if (password === cpassword) {
      const ru = new UserRegistration({
        username: req.body.username,
        email: req.body.email,
        password: password,
        // confirmpassword : cpassword
      });

      const token = await ru.generateAuthToken();
      // console.log("token part "+token)
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 600000),
        httpOnly: true,
      });
      const registered = await ru.save();

      res.status(201).redirect("/login");
    } else {
      res.send("password are not matching");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

// exports.downloadtrainticket = (req, res) => {
//   res.pdfFromHTML({
//     filename: 'generated.pdf',
//     html: path.resolve(__dirname, './p1.html'),
// });
// };

exports.error404 = (req, res) => {
  res.render("error404");
};
