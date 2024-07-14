const express = require("express");
const users = require("./MOCK_DATA.json"); // Assuming this file contains an array of user objects
const fs =require('fs');
const app = express();
const PORT = 8000;


//middleware
app.use(express.urlencoded({extended: false})); // ---> imp this will help in parsing the json received from postman

// app.use((req,res,next)=>{
//     req.username="khushalraj"; // now this will be avaiable to next middleware and even the end server
//     console.log("hello from middleware 1"); // if we leave it at that then the server will keep on running as we are not returning and will be stuck
//     // return res.json({msgs:"ram ram laddarr "}); // this is be retuned to the client and it will not reach the server
//     next(); // now this time we will actually reach the response normally
// })
// app.use((req,res,next)=>{ // 1st will send data to 2 , 2 will end it    
//     console.log("hello from middleware 2",users.username); 
//     res.end("helo");
// })

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
app.get('/users', (req, res) => { // agar join nhi karenge toh commas se sepereate ho jayengi values
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

app.get('/api/users', (req, res) => { // we had made another one for users but also rendering HTML with it
    return res.json(users); // changed 'user' to 'users'
});

app.get('/api/users/:id', (req, res) => { // now this ----- has the same route
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id); // those three lines are triple =
    return res.json(user);
});

// we have a problem here cause browers only makes get requests so 
app.post('/api/users', (req, res) => {
    /*
        first what we did was to open post man, for the url we pasted our local host link same as http://localhost:8000/api/users 
        then we went to body section and fill details about ourselves same as the details required in json files except 
        the ID which is auto generated
        then we create the user from that data here
        we used 'x-www-form-urlencoded'
    */

        const body =req.body; // ---> this is giving body undefined, so we will use middleware above 
        // console.log("body",body)
        users.push({...body ,id: users.length +1}); // but we are using an offline file so we have to use FS module
        fs.writeFile('MOCK_DATA.json', JSON.stringify(users), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
            });
});

app.patch('/api/users/:id', (req, res) => { // now this ----- has the same route
    // TODO: edit the user with id
    return res.json({ status: "pending" });
});

app.delete('/api/users/:id', (req, res) => { // now this ----- has the same route
    // TODO: delete the user with id
    return res.json({ status: "pending" });
});

app.listen(PORT, () => console.log(`server started at PORT ${PORT}`));
