/* global mongoose */
module.exports = function(app) {
    
/* global ProjectModel */
var dbModels = require('../database/models/userStoryTypeSchema');
  
   app.post("/addUserStoryType",function(req,res){
     res.send(dbModels.statics.addUserStoryType(req.body.params));
   });
   
   app.get("/getAllUserStoryTypes",function(req,res){
     dbModels.statics.getAllUserStoryTypes().then(function(data){ res.send(data); });
    });
    
    app.post("/deleteUserStoryType",function(req,res){
       dbModels.statics.deleteUserStoryType(req.body.params.id).then(function(data){ res.send(data); }); 
    });
    
    app.post("/editUserStoryType",function(req,res){
       res.send(dbModels.statics.editUserStoryType(req.body.params));
    });
    
   

}