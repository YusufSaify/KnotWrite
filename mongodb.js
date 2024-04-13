const mongoose=require("mongoose")

const connectToMongo=()=>{

    mongoose.connect(
        "mongodb://localhost:27017/harry"
        ).then(()=>{
            console.log("mongodb  connected successfully")
        }).catch(()=>{
            console.log("failed to connect")
        })
    }

    module.exports=connectToMongo;