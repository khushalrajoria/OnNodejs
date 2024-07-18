const User=require("../model/user");

async function handleGetAllUser(req,res){
    const allDbusers =await User.find({});
    return res.json(allDbusers);
}

async function handleGetUserByID(req,res){
    const user =await User.findById(req.params.id)
    if(!user) return res.status(404).json({msg:"user not found"})
    return res.json(user);
}
async function handleUpdateUserByID(req,res){
    User.findByIdAndUpdate(req.params.id,{lastName:"changed"});
    return res.json({ status: "done" });
}
async function handleDeleteUserByID(req,res){
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "success" });
}
async function handleCreateNewUser(req,res){
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
}
module.exports ={
    handleGetAllUser,
    handleGetUserByID,
    handleUpdateUserByID,
    handleDeleteUserByID,
    handleCreateNewUser

}