const express = require("express");
const mongoose =require("mongoose");
const userRouter =require("./routes/user")
const users = require("./MOCK_DATA.json"); // Assuming this file contains an array of user objects
const fs =require('fs');
const {connectMongoDB} =require("./connection");
const { logReqRes } =require("./middleware");// index likhne ki need nhi bydefault voh index hi leta hai
const router = require("./routes/user");
const app = express();
const PORT = 8000;
/*____________________________ we will be changing the code according to the model view controller architecture__________________
                                for that we have 4 folders - model, view, routes and controllers
*/

//connection
connectMongoDB('mongodb://127.0.0.1:27017/khushalDatabase-1');

//middleware
app.use(express.urlencoded({extended: false})); // ---> imp this will help in parsing the json received from postman

app.use(logReqRes("log.txt"));

//routes
app.use("./user",userRouter);

app.listen(PORT, () => console.log(`server started at PORT ${PORT}`));
