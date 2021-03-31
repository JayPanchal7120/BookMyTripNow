
const flightID = sessionStorage.getItem("flightID");
console.log(flightID);

const fid = document.getElementById("flightID");

const Fnumber = document.getElementById("Fnumber");
const Fname = document.getElementById("Fname");
const from = document.getElementById("from");
const to = document.getElementById("to");
const TOF = document.getElementById("TOF");
const LT = document.getElementById("LT");
const dist = document.getElementById("dist");

const cls = document.getElementById("class");
cls.value= sessionStorage.getItem("Tclass");
const bookDate = document.getElementById("bookDate");
bookDate.value= sessionStorage.getItem("Tdate");
const noOfTikets = document.getElementById("noOfTikets");
noOfTikets.value= sessionStorage.getItem("noOfTikets");

fid.value = flightID;

axios.get(`http://localhost:3000/api/flightbetweenstation/${flightID}`)
        .then(function(response){
            const flight = response.data;
            Fnumber.value=flight.flightNo;
            Fname.value= flight.flightName;
            from.value= flight.from;
            to.value= flight.to;
            TOF.value=  flight.takeoff;
            LT.value= flight.landing;
            dist.value=flight.distance;
        })
        .catch(err =>{
            // res.send(err);
            console.log(err);
        })



// console.log("In bookingForm.js",flightID);
