/* global mongoose */
var userStoryTypeSchema = new mongoose.Schema({
    name : {type :String, unique : true},
    description : {type :String}    
});

var UserStoryTypeModel = mongoose.model("user_story_type",userStoryTypeSchema);

//Add userType in the database
userStoryTypeSchema.statics.addUserStoryType = function(userStoryTypeDoc) {
        UserStoryTypeModel.isNew = true;
        var userStoryType = UserStoryTypeModel(userStoryTypeDoc);
        return userStoryType.saveQ(function(err, doc){
            if(err)
                console.log(err);
            else
                console.log(doc);            
        });
    }

// Gets list of projects from database
userStoryTypeSchema.statics.getAllUserStoryTypes = function(){
   UserStoryTypeModel.isNew = false;
   return UserStoryTypeModel.findQ();
}   
    
// Edit project from the database
userStoryTypeSchema.statics.editUserStoryType = function(params){
  UserStoryTypeModel.isNew = false;
  console.log("Inside edit UserStoryType");
  console.log(params);
  var query = {"_id":params.id};
 var update = params.doc;
 var options = {new: false};
 return UserStoryTypeModel.findOneAndUpdateQ(query,update,options,function(error,status){
   if(error){
       console.log(error);
   }  
 });
}

//Delete UserStoryType
userStoryTypeSchema.statics.deleteUserStoryType = function(id){
  console.log("Inside delete UserStoryType");
  console.log(id);
  UserStoryTypeModel.isNew = false;
  return UserStoryTypeModel.findOneAndRemove({'_id': id }, function(error, status){
      if(error)
        console.log(error);
      else
        console.log(status);
  });
   
}

module.exports= userStoryTypeSchema;