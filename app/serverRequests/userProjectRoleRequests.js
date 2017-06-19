/* global mongoose */
module.exports = function(app) {

    var dbModels = require('../database/models/userProjectRoleSchema');
    var userModel = require('../database/models/userSchema');
    var roleModel = require('../database/models/roleSchema');

    app.post("/getSelectedUserNameList",function(req,res){
            console.log("Finding selected username list...........................................");
            var projectId = req.body.params.projectId;
            dbModels.statics.getAlreadyAssignedUsers(projectId).then(function(data){
                res.send(data);
            });
//            userModel.statics.getAllUserExceptUsernameAndSuperUser(userId, projectId).then(function(data){
//                res.send(data);
//            });
    });
    
    
            
    app.post("/getAllRolesExceptUserId",function(req,res){
            console.log("Finding Role...........................................");
            var userId = req.body.params.userId;
            var projectId = req.body.params.projectId;
            dbModels.statics.getRoleDocByUserId(userId, projectId).then(function(roleDoc){
                console.log("Role ID is #################");
                console.log(roleDoc.roleId);
                roleModel.statics.getAllRoleExceptRoleId(roleDoc.roleId).then(function(data){
                    console.log("All roles doc ################")
                        console.log(data);
                        res.send(data);
                });
            });
    });
    
    app.post("/getAllAssignedProjects", function(request, response){
        var userId = request.body.params.userId;
        dbModels.statics.getAllAssignedProjects(userId).then(function(data){
            response.send(data);
        });
    });
    
    app.post("/addUserProjectRole", function(request, response){
       response.send(dbModels.statics.addUserProjectRole(request.body.params));
    });
    
    app.post("/getAllUserProjectRolesByProductOwner", function(req, res){
        var roleId = req.body.params.roleId;
        dbModels.statics.getAllUserProjectRolesByProductOwner(roleId).then(function (data) {
            res.send(data);
        })
    });
    
    app.post("/editUserProjectRole", function(req, res){
        dbModels.statics.editUserProjectRole(req.body.params).then(function (data) {
            res.send(data);
        })
    });
    
    app.post("/deleteUserProjectRole", function(req, res){
        dbModels.statics.deleteUserProjectRole(req.body.params.id).then(function (data) {
            res.send(data);
        })
    });
    
    app.post("/removeUserFromProject",function(request,response){
        console.log("Inside Remove User From Project");
        var userProjectRoleId= request.body.params.id;
       dbModels.statics.removeUserFromProject(userProjectRoleId);
       response.send("User Removed");
    });
        
    app.post("/getRoleIdFromId", function(req,res){
        dbModels.statics.getRoleIdFromId(req.body.params.id).then(function(data){
            res.send(data);
        });
    });
    
    app.post("/modifyUserRole",function(req,res){
        var id= req.body.params.id;
        var newRoleDoc = req.body.params.modifiedRoleDoc;
       res.send(dbModels.statics.updateUserProjectRole(id,newRoleDoc));
    })
}
