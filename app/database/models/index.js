/* global __dirname */
var fs = require("fs");
fs.readdirSync(__dirname).forEach(function(file){
   if(file !=="index.js") {
       var modelName = file.split(".")[0];
       exports[modelName] = require('./'+modelName);
   } 
});