const express = require("express");
const users = require("./MOCK_DATA.json"); // Assuming this file contains an array of user objects
const fs =require('fs');
const app = express();
const PORT = 8000;


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
app.get('/users', (req, res) => { // agar join nhi karenge toh commas se sepereate ho jayengi values
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

app.get('/api/users', (req, res) => { 
    /*
        headers is basically like the subject in mail like a summary
        they represent the meta-data about the HTTP request and response
        there are different types of headers we can see in postman
    */
    req.headers("x-myName","khushal rajoria"); // we can also create headers by ourself our by using postman
    // good practise ---> add 'x' to costum header names
    return res.json(users); // changed 'user' to 'users'
});

app.get('/api/users/:id', (req, res) => { // now this ----- has the same route
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id); // those three lines are triple =
    return res.json(user);
});

// we have a problem here cause browers only makes get requests so 
app.post('/api/users', (req, res) => {
        const body =req.body; 
        if(!body || !body.first_name ||!body.last_name || !body.gender) {
            return res.status(400).json({msg:"All fields are required..."});
        }
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
