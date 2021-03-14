
const trainID = localStorage.getItem("trainID");

const tid = document.getElementById("trainID");

const Tnumber = document.getElementById("Tnumber");
const Tname = document.getElementById("Tname");
const from = document.getElementById("from");
const to = document.getElementById("to");
const AT = document.getElementById("AT");
const DT = document.getElementById("DT");
const cls = document.getElementById("class");

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
            cls.value= "Classname"
        })
        .catch(err =>{
            res.send(err);
        })



console.log("In bookingForm.js",trainID);
