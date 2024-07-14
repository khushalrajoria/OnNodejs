const http = require("http");
const express= require("express");

const app =express();

app.get("/",(req,res)=>{ // app.get , app.poost ye sab likhna hota hai phir route phir route pe kya karna hai
    return res.end("hello from home page")
})
app.get("/about",(req,res)=>{
    return res.end("hello from about page"+" hey "+req.query.name+" you are "+req.query.age+" year old") // we don't need 'URL' dependency here we can just use queries and it will still lead us to about or whatever page in the express package itself
})
app.get("/profile",(req,res)=>{
    return res.end("hello from profle page"+" hey "+req.query.name) // we don't need 'URL' dependency here we can just use queries and it will still lead us to about or whatever page in the express package itself
})

const myServer=http.createServer(app);

myServer.listen(8000, ()=>{console.log("server Started")}); // this will help in listening to the server, it takes a port number and gives a response to us that the server has started



// mow we are going to install express here and using that we will have some build intemplates functions to use and have a minimilistic framework for ourself
