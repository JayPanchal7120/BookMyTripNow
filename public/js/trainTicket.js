const noOfTikets= sessionStorage.getItem("noOfTikets");
const chargeele= document.getElementById("noOfTikets");
const dist= document.getElementById("dist").value;

axios.get(`http://localhost:3000/api/traincharge`)
        .then(function(response){
            const trainchargedata = response.data;
            const tc = document.getElementById("tc").innerHTML;
            const charge = trainchargedata[tc] * noOfTikets *dist;
            console.log(dist,tc,trainchargedata[tc],noOfTikets,charge);
            chargeele.innerHTML=charge;
        })
        .catch(err =>{
            // res.send(err);
            console.log(err);
        })
