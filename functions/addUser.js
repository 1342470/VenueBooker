var fs= require('fs');

const { JsonWebTokenError } = require("jsonwebtoken");

let userData = document.getElementById("addUser");
let newUser = new FormData(userData);

JSON.stringify(Object.fromEntries(newUser));

fs.writeFile("data.json",newUser,function(err){
    if (err){
        console.log(err);
    }
});