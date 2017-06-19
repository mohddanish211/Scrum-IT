/* global mongoose */
var roleSchema = new mongoose.Schema({
    name : {type :String, unique : true},
    description : {type :String}    
});

var RoleModel = mongoose.model("role",roleSchema);

// Add role in Database
roleSchema.statics.addRole = function(roleDoc) {
        RoleModel.isNew = true;
        var role = new RoleModel(roleDoc);
        return role.saveQ(function(err,doc){
            if(err)
                console.log(err);
            else
                console.log(doc);
        });
    }

// Gets list of roles from database
roleSchema.statics.findAllRoles = function(){
   RoleModel.isNew = false;
   return RoleModel.findQ();
}

// Edit role from the databse
roleSchema.statics.editRole = function(params){
  RoleModel.isNew = false;
  console.log("Inside edit role");
  console.log(params);
  var query = {"_id":params.id};
 var update = params.doc;
 var options = {new: false};
 return RoleModel.findOneAndUpdateQ(query,update,options,function(error,users){
   if(error){
       console.log(error);
   }  
 });
}

//Delete Role
roleSchema.statics.deleteRole = function(id){
  console.log("Inside delete Role");
  console.log(id);
  RoleModel.isNew = true;
  return RoleModel.findOneAndRemove({'_id': id }, function(error, status){
      if(error)
        console.log(error);
      else
        console.log(status);
  });
   //return RoleModel.findByIdQ();
}

//get Role on the basis of name
roleSchema.statics.getRole = function(name){
  console.log("Inside get Role");
  console.log(name);
  RoleModel.isNew = false;
  return RoleModel.findOne({'name': name }, function (err, role){});
}

// Get all roles except the given role and superuser role
roleSchema.statics.getAllRoleExceptRoleId = function(roleId){
    return RoleModel.findQ({$and :[ {'name': {$ne : 'Super User'}},{'_id': {$ne : roleId}}]})
}

//Get role by role name
roleSchema.statics.getRoleByName = function(roleName) {
    return RoleModel.findOne({'name' : roleName}, function(err, doc){
        if(err) console.log(err)
        return doc;
    })
}

module.exports = roleSchema;