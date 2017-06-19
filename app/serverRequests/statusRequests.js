/* global mongoose */
module.exports = function(app) {
    
/* global StatusModel */
var dbModels = require('../database/models/statusSchema');
  
   app.post("/addStatus",function(req,res){
     res.send(dbModels.statics.addStatus(req.body.params));
   });
   
   app.get("/getAllStatus",function(req,res){
     dbModels.statics.getAllStatus().then(function(data){ res.send(data); });
    });
    
    app.post("/deleteStatus",function(req,res){
       dbModels.statics.deleteStatus(req.body.params.id).then(function(data){ res.send(data); });
    });
    
    app.post("/editStatus",function(req,res){
       res.send(dbModels.statics.editStatus(req.body.params)); 
    });
    
    app.get("/getNewStatusDoc",function(req,res){
        dbModels.statics.getNewStatusDoc().then(function(data){
            res.send(data);
        })
    });
    app.post("/getStatusDocByName",function(req,res){
        dbModels.statics.getStatusDocByName(req.body.params.name).then(function(data){
            res.send(data);
        })
    })

}