const express = require("express");
const router = express.Router(); // now we are making a reperate router so we require it

// router.get('/users', async (req, res) => { // change app.get -> router.get
//     const allDbusers =await User.find({});
//     const html = `
//     <ul>
//     ${allDbusers.map((User) => `<li>${User.firstName} - ${User.email}</li>`).join("")}
//     </ul>
//     `;
//     res.send(html);
// });

// now this router is only for users so we can make it directly with /

router.get('/', async (req, res) => { 
    const allDbusers =await User.find({});
    return res.json(allDbusers); // changed 'user' to 'users'
});

router.get('/:id', async(req, res) => { 
    const user =await User.findById(req.params.id)
    if(!user) return res.status(404).json({msg:"user not found"})
    return res.json(user);
});

// we have a problem here cause browers only makes get requests so 
router.post('/', async (req, res) => {
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

router.patch('/:id',async (req, res) => { // now this ----- has the same route
    User.findByIdAndUpdate(req.params.id,{lastName:"changed"});
    return res.json({ status: "done" });
});

router.delete('/:id',async (req, res) => { // now this ----- has the same route
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "success" });
});


module.exports=router;