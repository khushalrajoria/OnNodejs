const mongoose =require("mongoose");
mongoose.set("strictQuery",true);

async function connectMongoDB(url){
    return mongoose.connect(url)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));
}

module.exports={connectMongoDB};