const express = require("express");
const user =require("./MOCK_DATA.json");
const app= express();
const PORT =8000;

// Routes

app.listen(PORT,() =>console.log(`server started at PORT ${PORT}`));