const TrainBetweenStation = require("../models/trainsBetweenStation");

exports.find = (req, res)=>{

    // console.log("IN API");
    
    const id = req.params.id;
        // console.log(id);

        TrainBetweenStation.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found train with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving train with id " + id})
            })    
}

exports.traincharge=(req,res)=>{
    res.send({
        "First Class" : 7,
        "Sleeper Class" : 7,
        "Second Seating" : 4,
        "First AC": 20,
        "Second AC" : 15,
        "Third AC": 10,
        "Third AC Economy": 7,
        "AC Chair Car": 7
    });
}