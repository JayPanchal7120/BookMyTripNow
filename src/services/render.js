const Userbooking = require("../models/bookigForm");
const TrainBetweenStation = require("../models/trainsBetweenStation");
const FlightBetweenAirport = require("../models/flightsBetweenAirport");
const UserRegistration = require("../models/registers");
const sendResponse = require("../../utils/sendResponse");
const sendMail = require("../../utils/sendMail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.homeRoutes = (req, res) => {
  login_status = false;
  res.render("index", { logged: login_status });
};

exports.contactus = (req, res) => {
  res.render("contactus");
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
    if (isMatch && password === cpassword) {
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
        name: req.body.fname + " " + req.body.lname,
        trainNo: req.body.Tnumber,
        trainName: req.body.Tname,
        travelclass: req.body.class,
        from: req.body.from,
        to: req.body.to,
        date: req.body.bookDate,
        atime: req.body.AT,
        dtime: req.body.DT,
        noOfTikets: req.body.noOfTikets,
        dist: req.body.dist,
      };

      res.render("trainTicket", { tik: ticket });
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
    if (isMatch && password === cpassword) {
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
        name: req.body.fname + " " + req.body.lname,
        flightNo: req.body.Fnumber,
        flightName: req.body.Fname,
        travelclass: req.body.class,
        from: req.body.from,
        to: req.body.to,
        date: req.body.bookDate,
        atime: req.body.TOF,
        dtime: req.body.LT,
        noOfTikets: req.body.noOfTikets,
        dist: req.body.dist,
      };

      res.render("flightTicket", { tik: ticket });
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
      $and: [
        { from: from },
        { to: to },
        { day: day },
        { classname: travelclass },
      ],
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
      $and: [
        { from: from },
        { to: to },
        { day: day },
        { classname: travelclass },
      ],
    });
    // }
    res.render("searchFlight", { flights: fbs });
  } catch (err) {
    res.status(201).send("Invalid details...");
  }
};

exports.flight = (req, res) => {
  res.render("flight");
};

exports.trainbookingForm = (req, res) => {
  res.render("trainbookingForm");
  // console.log(req.query.id);
};

exports.flightbookingForm = (req, res) => {
  res.render("flightbookingForm");
  // console.log(req.query.id);
};


exports.loginRegister = (req, res) => {
  res.render("loginRegister", { msg: "" });
  // res.render("loginRegister", { msg: "SucessFull" });
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
    res.render("", { logged: login_status });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.signin = async (req, res) => {
  try {
    const si_uname = req.body.si_username;
    const si_password = req.body.si_password;

    // console.log(si_uname);
    const user = await UserRegistration.findOne({ username: si_uname });
    // console.log(user);
    if (!user) {
      return sendResponse(
        "Authentication failed! No such user exist!",
        res,
        404
      );
    }
    if (!user.active) {
      return sendResponse(
        "Account email is not confirmed yet! Check Your Email Inbox",
        res,
        401
      );
    }

    const isMatch = await bcrypt.compare(si_password, user.password);
    // console.log(isMatch);

    const token = await user.generateAuthToken();
    // console.log(token);

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 3000000),
      httpOnly: true,
    });
    if (isMatch) {
      login_status = true;
      console.log("login successfully...");
      res.status(201).render("", { logged: login_status });
    } else {
      res.send("Invalid Login details...password not match");
    }
  } catch (err) {
    res.status(201).send(err);
  }
};

exports.register = async (req, res) => {
  // console.log("in register endpoint")
  const { username, email, password } = req.body;
  try {
    // const password = req.body.password;
    // const cpassword = req.body.cpassword;
    // if (password === cpassword) {

    let userbymail = await UserRegistration.findOne({ email: email });
    if (userbymail) {
      return sendResponse("User with email already exist!", res, 409);
    }
    user = new UserRegistration({
      username: username,
      email: email,
      password: password,
      // confirmpassword : cpassword
    });
    const token = user.generateAuthToken();
    user.mailToken = token;
    // console.log(user);

    await user.save();

    // console.log("token part "+token)
    // res.cookie("jwt", token, {
    //   expires: new Date(Date.now() + 600000),
    //   httpOnly: true,
    // });

    const url = process.env.CLIENT_HOST + "verify-email/" + token;
    // console.log(url);

    let msg = sendMail(
      user.email,
      "Verify your email!",
      "cemail",
      user.username,
      url
    )
      .then((msg) => {
        // console.log("hi");
        // console.log(msg);
        res.status(201).render("loginRegister", { msg: msg });
      })
      .catch((err, msg) => {
        console.log(msg);
        res.status(201).render("loginRegister", { msg: msg });
      });
    // return sendResponse("Email successfully sent", res, 200);
    // } else {
    //   res.send("password are not matching");
    // }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.verifyEmail = async (req, res) => {
  const getToken = req.params.token;

  //   console.log(getToken);
  try {
    const ok = jwt.verify(getToken, process.env.JWT_SECRET_KEY);
    // console.log(ok);
    if (ok) {
      let user = await UserRegistration.findOne({ mailToken: getToken });
      //   console.log(user);
      if (user) {
        user.mailToken = "";
        user.active = true;
        await user.save();
        res
          .status(201)
          .render("loginRegister", { msg: "Account Verification successfull" });
        // return sendResponse("Account Email Confirmed!", res);
      } else {
        res
          .status(201)
          .render("loginRegister", { msg: "Account Activation Failed" });
        // return sendResponse('Account Activation Failed', res, 401);
      }
    } else {
      return sendResponse(
        "Invalid activation requested! Kindly follow url sent in mail!",
        res,
        401
      );
    }
  } catch (err) {
    return sendResponse(err, res, 500);
  }
};

// exports.downloadtrainticket = (req, res) => {
//   res.pdfFromHTML({
//     filename: 'generated.pdf',
//     html: path.resolve(__dirname, './p1.html'),
// });
// };

exports.e404 = (req, res) => {
  res.render("404");
  // res.render("errorpage");
};
