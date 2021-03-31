
const trainID = sessionStorage.getItem("trainID");
console.log(trainID);

const tid = document.getElementById("trainID");

const Tnumber = document.getElementById("Tnumber");
const Tname = document.getElementById("Tname");
const from = document.getElementById("from");
const to = document.getElementById("to");
const AT = document.getElementById("AT");
const DT = document.getElementById("DT");
const dist = document.getElementById("dist");

const cls = document.getElementById("class");
cls.value= sessionStorage.getItem("Tclass");
const bookDate = document.getElementById("bookDate");
bookDate.value= sessionStorage.getItem("Tdate");
const noOfTikets = document.getElementById("noOfTikets");
noOfTikets.value= sessionStorage.getItem("noOfTikets");

tid.value = trainID;

axios.get(`http://localhost:3000/api/trainbetweenstation/${trainID}`)
        .then(function(response){
            const train = response.data;
            Tnumber.value=train.trainNo;
            Tname.value= train.trainName;
            from.value= train.from;
            to.value= train.to;
            AT.value=  train.arrival;
            DT.value= train.departure;
            dist.value=train.distance;
        })
        .catch(err =>{
            // res.send(err);
            console.log(err);
        })



// console.log("In bookingForm.js",trainID);
