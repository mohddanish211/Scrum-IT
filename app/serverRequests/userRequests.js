
/* global mongoose */
module.exports = function(app) {
    
/* global ProjectModel */
var dbModels = require('../database/models/userSchema');

    app.post("/registerUser",function(req,res){
       res.send(dbModels.statics.addUser(req.body.params));
    });
    
    app.post("/checkUsername", function(req,res) {
        dbModels.statics.checkUsername(req.body.params).then(function(data){res.send(data); });
    });
    
     app.get("/getAllUser",function(req,res){
       dbModels.statics.findAllUsers(req.body.params).then(function(data){ res.send(data); }); 
    });
    
    app.post("/login",function(req,res){
        dbModels.statics.loginUser(req.body.params).then(function(data){ 
            if (data != null){
                res.send("Login Successfull !!");
            }
            else
                res.send("Login Unsuccessfull !!");
            });
    });
    
    app.post("/getUser",function(req,res){
        dbModels.statics.getUser(req.body.params.username).then(function(data){
            res.send(data);
        });
    });
    
    app.post("/getUserByUserId", function(req,res){
        dbModels.statics.getUserByUserId(req.body.params.id).then(function(data){
            res.send(data);
        });
    });

    app.post("/updateUserByUserId", function (req,res) {
        dbModels.statics.updateUserByUserId(req.body.params.userDoc,req.body.params.id).then(function(data){
            
            console.log("§§§§§§§§§§ Inside userRequests.js updateUserByUserId §§§§§§§§§§§§§§");
            if (data != null){
                res.send("User_details_updated");
            }
            else
                res.send("Failed_updation");
            });
    });

    app.post("/getUserByEmail", function(request, response){
        dbModels.statics.getUserByEmail(request.body.params.email).then(function(data){
            console.log(data);
            response.send(data);
        });
    });
    
    app.post("/getUnassignedUserNameList", function(req, res){
       dbModels.statics.getUnassignedUserNameList(req.body.params.excludeUserListArray).then(function(data){
           res.send(data);
       }); 
    });
    
    app.get("/getAllUsersExceptSuperUser", function (req, res) {
       dbModels.statics.getAllUsersExceptSuperUser().then(function(data){
           res.send(data);
       });
    });

}