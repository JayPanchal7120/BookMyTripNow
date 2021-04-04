const noOfTikets= sessionStorage.getItem("noOfTikets");
const chargeele= document.getElementById("noOfTikets");
const dist= document.getElementById("dist").value;

axios.get(`http://localhost:3000/api/flightcharge`)
        .then(function(response){
            const flightchargedata = response.data;
            const tc = document.getElementById("tc").innerHTML;
            const charge = flightchargedata[tc] * noOfTikets *dist;
            console.log(dist,tc,flightchargedata[tc],noOfTikets,charge);
            chargeele.innerHTML=charge;
        })
        .catch(err =>{
            // res.send(err);
            console.log(err);
        })
