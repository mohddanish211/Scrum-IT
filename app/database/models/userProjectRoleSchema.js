/* global Schema */
/* global mongoose */

var userProjectRoleSchema = new mongoose.Schema({
    projectId : {type : Schema.Types.ObjectId, ref : "project"},
    userId : {type : Schema.Types.ObjectId, ref : "user"},
    roleId : { type: Schema.Types.ObjectId, ref : "role"},
    createdBy : {type : Schema.Types.ObjectId, ref : "user"}
});

var UserProjectRoleModel = mongoose.model("user_project_role",userProjectRoleSchema);

// Add userProjectRole in Database
userProjectRoleSchema.statics.addUserProjectRole = function(userProjectRoleDoc) {
        
        UserProjectRoleModel.isNew = true;
        var userProjectRole = new UserProjectRoleModel(userProjectRoleDoc);
        return userProjectRole.saveQ(function(err,doc){
            if(err)
                console.log(err);
            else
                console.log(doc);
        });
}

userProjectRoleSchema.statics.getRoleDocByUserId = function(userId, projectId){
    UserProjectRoleModel.isNew = false;
    return UserProjectRoleModel.findOne({$and: [{'userId' : userId},{'projectId' : projectId}]},function(err,doc){
        return doc;
    });
}

//Get all assigned projects for the current user
userProjectRoleSchema.statics.getAllAssignedProjects = function(userId){
    UserProjectRoleModel.isNew = false;
    return UserProjectRoleModel.find({'userId' : userId})
    .select('projectId -_id')
    .populate({path : 'projectId'})
    .exec(function(err, userProjectRoleDoc){
         if(err) console.log(err)
         console.log(userProjectRoleDoc);
         return userProjectRoleDoc;
    });
}

userProjectRoleSchema.statics.getAlreadyAssignedUsers = function(projectId){
    UserProjectRoleModel.isNew = false;
    return UserProjectRoleModel.find({'projectId' : projectId})
    .populate({path : 'userId'})
    .populate({path : 'roleId'})
    .exec(function(err, userDoc){
       if(err) console.log(err)
       console.log(userDoc);
       return userDoc; 
    });
}

 userProjectRoleSchema.statics.getAllUserProjectRolesByProductOwner = function(roleId){
     UserProjectRoleModel.isNew = false;
     return UserProjectRoleModel.find({'roleId' : roleId})
            .populate({path : 'userId', select : 'username'})
            .populate({path : 'projectId', select : 'name'})
            .exec(function(err, userProjectRoleDoc){
                    if(err) console.log(err)
                        return userProjectRoleDoc;
            });
 }
 
// Edit UserProjectRole Model
userProjectRoleSchema.statics.editUserProjectRole = function(params){
    UserProjectRoleModel.isNew = false;
    console.log("params is ");
    console.log(params);
    var query = {"_id":params._id};
    var update = params.doc;
    var options = {new: false};
    return UserProjectRoleModel.findOneAndUpdateQ(query,update,options,function(error,status){
        if(error){
            console.log(error);
        }  
    });
}

//Delete UserProjectRole
userProjectRoleSchema.statics.deleteUserProjectRole = function(id){
  UserProjectRoleModel.isNew = false;
  return UserProjectRoleModel.findOneAndRemove({'_id': id }, function(error, status){
      if(error)
        console.log(error)
      return status;
  });
}

userProjectRoleSchema.statics.removeUserFromProject = function(id){
    UserProjectRoleModel.isNew = true;
    console.log("Inside removeUserFromProject");
    return UserProjectRoleModel.findOneAndRemove({'_id': id }, function(error, status){
      if(error)
        console.log(error);
      else
        console.log(status);
  });
}

userProjectRoleSchema.statics.getRoleIdFromId = function(id){
    UserProjectRoleModel.isNew = false;
    return UserProjectRoleModel.findOne({'_id':id},function(err,doc){
        return doc;
    });
}

userProjectRoleSchema.statics.updateUserProjectRole = function(id,newDoc){
    UserProjectRoleModel.isNew = true;
     var query = {"_id":id};
    var update = newDoc;
    var options = {new: false};
    return UserProjectRoleModel.findOneAndUpdate(query,update,options,function(error,doc){
   if(error)
   return error;
   return doc;
   
 });
    
}
    
module.exports= userProjectRoleSchema;