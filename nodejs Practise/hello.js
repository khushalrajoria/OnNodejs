console.log('hello wordsl')

//  check package.json
/*
there is part like
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": " node hello.js" 
  },
  
   here in scripts we can put our terminal commands in scripts, it can be used when we have multiple files, so we can just save scripts of them
   and excute npm start or npm run start to run them and allocating them a name
  */

//    function add(a,b){ // we can just so happen to make a lot a different functions and at different file so we can do is 
//     return a+b; // -> this function is stored in math.js now
//    }
// console.log(add(2,6));

const math=require("./math.js")
// const math{add,sub}=require("./math.js") // we can also do this to AVOID math.addfn or math.add we can just do add(2,3)
    console.log(add(math.addfn(2,6)));