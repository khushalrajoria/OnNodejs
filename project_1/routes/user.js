const express = require("express");
const router = express.Router(); // now we are making a reperate router so we require it
const {handleGetAllUser,handleGetUserByID,handleCreateNewUser,handleUpdateUserByID,handleDeleteUserByID}=require("../controllers/user"); 


router.route("/").get(handleGetAllUser).post(handleCreateNewUser);
router.get('/:id',handleGetUserByID);
router.patch('/:id',handleUpdateUserByID);
router.delete('/:id',handleDeleteUserByID);


module.exports=router;