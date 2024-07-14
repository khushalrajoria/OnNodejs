const express = require("express");
const users =require("./MOCK_DATA.json");
const app= express();
const PORT =8000;

// Routes
// this is an example incase we want to create a hybrid server with both SSR and USR
app.get('/users',(req,res)=>{ // agar join nhi karenge toh commas se sepereate ho jayengi values
    const html =`
    <ul>
    ${users.map((user)=>`<li>${users.first_name}</li>`).join("")} 
    </ul>
    `;
    res.send(html);
});


app.get('/api/users',(req,res)=>{ // we had made another one for users but also rendering HTML with it
    return res.json(user);
})
// app.get('/api/users/:id',(req,res)=>{ // now this ----- has the same route
//     const id=Number(req.params.id);
//     const user = users.find((user)=>user.id===id); // those three lines are tripe =
//     return res.json(user);
// })

// we have a problem here cause browers only makes get requests so 
app.post('/api/user',(req,res)=>{
    // TODO: create a new user
    return res.json({status:"pending"});
})
// app.patch('/api/user/:id',(req,res)=>{ // now this ----- has the same route
//     // TODO: edit the user with id
//     return res.json({status:"pending"});
// })
// app.delete('/api/user/:id',(req,res)=>{ // now this ----- has the same route
//     // TODO: delete the user with id
//     return res.json({status:"pending"});
// })


// so we can make a single one of them
app.route('/api/user/:id').get((req,res)=>{
    const id=Number(req.params.id);
    //     const user = users.find((user)=>user.id===id); // those three lines are tripe =
    //     return res.json(user);
}).put((req,res)=>{
    // TODO: edit the user with id
    return res.json({status:"pending"});
}).delete((req,res)=>{
    // TODO: delete the user with id
    return res.json({status:"pending"});
}).patch((req,res)=>{
    // TODO: edit the user with id
    return res.json({status:"pending"});
})

app.listen(PORT,() =>console.log(`server started at PORT ${PORT}`));