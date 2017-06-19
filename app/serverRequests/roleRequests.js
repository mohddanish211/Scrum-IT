/* global mongoose */
module.exports = function(app) {

/* global RoleModel */
var dbModels = require('../database/models/roleSchema');
  
    app.post("/addRole", function(req, res) {
        res.send(dbModels.statics.addRole(req.body.params));
    });
    
    app.get("/getAllRoles",function(req,res){
     dbModels.statics.findAllRoles().then(function(data){ res.send(data); });
    });
    
    app.post("/deleteRole",function(req,res){
       dbModels.statics.deleteRole(req.body.params.id).then(function(data){ res.send(data); }); 
    });
    
    app.post("/editRole",function(req,res){
       res.send(dbModels.statics.editRole(req.body.params));
    });
    
    app.post("/getRoleByName", function(req, res){
        dbModels.statics.getRoleByName(req.body.params.roleName).then(function(data){
            res.send(data);
        });
    })

    app.post("/getRole",function(req,res){
        dbModels.statics.getRole(req.body.params.nameOfTheRole).then(function(data){
            res.send(data);
        });
    })

}