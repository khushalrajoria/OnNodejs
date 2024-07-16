const express = require("express");
const mongoose =require("mongoose");
const users = require("./MOCK_DATA.json"); // Assuming this file contains an array of user objects
const fs =require('fs');
const { timeStamp } = require("console");
const app = express();
const PORT = 8000;

//connection
mongoose.connect('mongodb://127.0.0.1:27017/khushalDatabase-1')
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// schema
const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
    },
    ipAddress:{
        type:String,
    }
},
   {timeStamp :true}
);

// model
const User = mongoose.model("User",userSchema); // this user will be converted to 'users' automotically it adds and s

//middleware
app.use(express.urlencoded({extended: false})); // ---> imp this will help in parsing the json received from postman



// they can also be used for logging
app.use((req,res,next)=>{
    fs.appendFile("log.txt",`hello ${Date.now} : ${req.method} : ${req.path}\n`,
        (err,data)=>{
            next();
        }
    );
    
})

// Routes
// this is an example incase we want to create a hybrid server with both SSR and USR
app.get('/users', async (req, res) => { // agar join nhi karenge toh commas se sepereate ho jayengi values
    const allDbusers =await User.find({});
    const html = `
    <ul>
    ${allDbusers.map((User) => `<li>${User.firstName} - ${User.email}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

app.get('/api/users', async (req, res) => { 
    const allDbusers =await User.find({});
    return res.json(allDbusers); // changed 'user' to 'users'
});

app.get('/api/users/:id', async(req, res) => { 
    const user =await User.findById(req.params.id)
    if(!user) return res.status(404).json({msg:"user not found"})
    return res.json(user);
});

// we have a problem here cause browers only makes get requests so 
app.post('/api/users', async (req, res) => {
        const body =req.body; 
        if(!body || !body.first_name ||!body.last_name || !body.gender || !body.ip_address ||
            !body.email) {
            return res.status(400).json({msg:"All fields are required..."});
            }
        await User.create({
            firstName:body.first_name,
            lastName:body.last_name,
            email:body.email,
            gender:body.gender,
            ipAddress:body.ip_address,

        });
        // console.log("result", result)
        return res.status(201).json({msg:"success..."});
});

app.patch('/api/users/:id',async (req, res) => { // now this ----- has the same route
    User.findByIdAndUpdate(req.params.id,{lastName:"changed"});
    return res.json({ status: "done" });
});

app.delete('/api/users/:id',async (req, res) => { // now this ----- has the same route
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "success" });
});

app.listen(PORT, () => console.log(`server started at PORT ${PORT}`));
