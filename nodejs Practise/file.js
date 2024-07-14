const fs= require('fs'); // we don't need to specify path for build in files
const os=require('os');
console.log(os.cpus().length) // will tell you about the number of CPUs you have meaning number of cores
// write file command will create file and give contents in them as specified on running
//sync...
fs.writeFileSync("./text.txt","This is txt file made by filehandling package's sync feature"); // location and text you want to write

//Async...
fs.writeFile("./text1.txt","This is txt file made by filehandling package's Async feature",(err)=>{}); // location and text you want to write, and error condition

// const result= fs.readFileSync("./contacts.txt","utf-8");
// console.log(result);


fs.readFile("./contacts.txt","utf-8",(err,result)=>{
    if (err){
        console.log("Error",err);
    }
    else {console.log(result);}
});


/*     VERY VERY IMPORTANT ---> Toh farak kya hai sync and Async me ki sync toh kuch return karta hai jaise upar seedhe result variable me store kar liya variable 
       aur output kar diya,LEKIN Async me kuch return nhi hota ek condition deni padti hai ki kya karne pe kya kare, err or result do 
       variable hai hai unko lene hai aur err aane pe usko return karo nhi toh result ko      */


// fs.appendFileSync("./text.txt",new Date().getDate.toString); // as it's string so we have to string it 
fs.appendFileSync("./text.txt","hello there") // this will add hello there to the text in file every time we execute, if we do it 10 time then there will be 10 hello there after OG text
// iska ye use ho sakta hai ki apan ID etc daal do aur time daal do phir jab bhi file execute hogi toh ek file me aise hi saari info daalte rahe

// fs.cpSync("./text.txt","./copy.txt"); to make a copy of that file 
// fs.unlinkSync("./text.txt"); to delete file
fs.statSync("./text.txt"); // to check information about the file
console.log(fs.statSync("./text.txt"));
// fs.mkdirSync("docs/a/b", {recursive : true}); // to make a file and recusrive will make Folder withiin 