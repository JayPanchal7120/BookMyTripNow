// console.log("this is train.js");
function TrainFormClass(from,to,checkIn,checkOut,adultCount,childCount,travelClass)
{
    this.from = from;
    this.to = to;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.adultCount = adultCount;
    this.childCount = childCount;
    this.travelClass = travelClass;
}

let trainform = document.getElementById('trainForm');
// console.log(trainform);
trainform.addEventListener('submit',trainFormSubmit);

function trainFormSubmit(e)
{
  e.preventDefault();
  console.log('form submitted');
  var from=document.getElementById('from').value;
  var to=document.getElementById('to').value;
  var checkIn=document.getElementById('checkIn').value;
  var checkOut=document.getElementById('checkOut').value;
  var adultCount=document.getElementById('adultCount').value;
  var childCount=document.getElementById('childCount').value;
  var travelClass=document.getElementById('travelclass').value;
  
  let trainbook = new TrainFormClass(from,to,checkIn,checkOut,adultCount,childCount,travelClass);
  
  console.log(trainbook);

fetch('../railways-master/schedules.json')
.then(res => res.json())
.then(schedual => {
  let fromTrain=[];
  let fromTrainarrival=[];
  let fromTrainday=[];
  let toTrainday=[];
  let toTrainarrival=[];
  let toTrain=[];
  var resultTrain=[];

  for (const obj of schedual) {
      for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          const value = obj[key];
          if(key=="station_name" && value==from )
               { 
                 fromTrain.push(obj.train_number);
                 fromTrainarrival.push(obj.arrival);
                fromTrainday.push(obj.day);
               }
          if(key=="station_name" && value==to)
          { 
            toTrain.push(obj.train_number);
            toTrainarrival.push(obj.arrival);
           toTrainday.push(obj.day);
          }
        }
      }

  }
  for(let i=0;i<fromTrain.length;i++){
    for(let j=0;j<toTrain.length;j++){
        if(fromTrain[i]==toTrain[j] ){
            if(fromTrainday[i]<toTrainday[j])
              resultTrain.push(i);
            else if(fromTrainday[i]==toTrainday[j]){
                if(fromTrainarrival[i]<toTrainarrival[j])
                  resultTrain.push(i);
            }

          
        }
    }
}


console.log(resultTrain);

});
}


