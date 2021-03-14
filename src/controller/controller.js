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