/* global mongoose,Schema */
var userSchema = new mongoose.Schema({
                  firstName : {type : String, required : true},
                  lastName : {type : String, required : true}, 
                  email : {type : String, required : true}, 
                  password : {type : String, required : true},
                  username : {type :String , unique : true}
});

var UserModel = mongoose.model("user",userSchema);

//Login User
userSchema.statics.loginUser = function(req){
    UserModel.isNew = false;
    console.log("Inside login User");
    console.log(req);
    
    return UserModel.findOne({'email' : req.email,
                           'password' : req.password }, function(error, user){
      if(error)
        console.log(error);
      else 
        console.log(user);
        });
}

//Check user name exists already in DB for register user
userSchema.statics.checkUsername = function(req){
    UserModel.isNew = false;
    console.log("-------Inside register User check user name---------");
    
    return UserModel.findOne({'username' : req.username}, function (error, user) {
        
    if(error)
        console.log(error);
      else 
        console.log(user);
        });
}

// Add user in Database
userSchema.statics.addUser = function(userDoc) {
    UserModel.isNew = true;
    console.log("Inside register user schema");
    console.log(userDoc);
    var user = UserModel(userDoc);
    return user.saveQ(function(err,doc){
        if(err)
            console.log(err);
        else
            console.log(doc);
    });
}

// Gets list of Users from database
userSchema.statics.findAllUsers = function(){
    UserModel.isNew = false;
   return UserModel.findQ();
}

// Edit User from the databse
userSchema.statics.editUser = function(params){
  UserModel.isNew = false;
  console.log("Inside edit User");
  console.log(params);
  var query = {"_id":params.id};
 var update = params.doc;
 var options = {new: false};
 return UserModel.findOneAndUpdateQ(query,update,options,function(error,users){
   if(error){
       console.log(error);
   }  
 });
}

//Delete User
userSchema.statics.deleteUser = function(id){
  UserModel.isNew = false;
  console.log("Inside delete User");
  console.log(id);
  return UserModel.findOneAndRemove({'_id': id }, function(error, status){
      if(error)
        console.log(error)
      else
        console.log(status);
  });
   //return UserModel.findByIdQ();
}

//get User on the basis of username
userSchema.statics.getUser = function(name){
  console.log("Inside get User");
  console.log(name);
  UserModel.isNew = false;
  return UserModel.findOne({'username': name }, function (err, user){});
}

//get User on the basis of userId
userSchema.statics.getUserByUserId = function(id){
    UserModel.isNew = false;
    return UserModel.findOne({'_id': id }, function (err, user){});
}

//Edit user profile
userSchema.statics.updateUserByUserId = function(userDoc,id){
    UserModel.isNew = false;
    var query = {"_id":id};
    var update = userDoc;
    var options = {new: false};
    return UserModel.findOneAndUpdateQ(query,update,options, function(err, user){
        if(err){
            return err;
        }
        else
            console.log(user);
            return user;
    });
}

// Get all user except the given username and superuser
userSchema.statics.getAllUserExceptUsernameAndSuperUser = function(userId){
    return UserModel.findQ({$and :[ {'_id': {$ne : userId}},{'username': {$ne : 'admin'}}]})
}

// Get all users except superuser
userSchema.statics.getAllUsersExceptSuperUser = function(){
    return UserModel.findQ({'username': {$ne : 'admin'}})
}

userSchema.statics.getUserNameByUserId= function(userId){
    UserModel.isNew = false;
    return UserModel.find({'_id' : userId}, function(err, doc){});
}
//get User on the basis of email address
userSchema.statics.getUserByEmail = function(email){
  UserModel.isNew = false;
  return UserModel.findOne({'email': email }, function (err, user){});
}

//Get all unassigned users from username array
userSchema.statics.getUnassignedUserNameList = function(userNameArray) {
    UserModel.isNew = false;
    return UserModel.find({ "username": { $not: { $in: userNameArray } } });
}

module.exports = userSchema;