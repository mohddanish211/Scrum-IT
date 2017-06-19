/* global Schema */
/* global mongoose */

var userStorySchema = new mongoose.Schema({
    name : {type : String, required : true  },
    description : {type : String},
    projectId : {type : Schema.Types.ObjectId, ref : "project"},
    statusId : {type : Schema.Types.ObjectId, ref : "status"},
    userStoryType : {type : Schema.Types.ObjectId, ref : "user_story_type"},
    priority : {type : Schema.Types.ObjectId, ref : "priority"},
    createdBy : {type : Schema.Types.ObjectId, ref : "user"},
    createdDate: {type : Date},
    modifiedDate : {type : Date}
   });

var UserStoryModel = mongoose.model("user_story",userStorySchema);

// Add user story in Database
userStorySchema.statics.addUserStory = function(userStoryDoc) {
        
        UserStoryModel.isNew = true;
        console.log(userStoryDoc);
        var userStory = new UserStoryModel(userStoryDoc);
        return userStory.saveQ(function(err,doc){
            if(err)
                console.log(err);
            else
                console.log(doc);
        });
}

// Gets list of user stories from database
userStorySchema.statics.getAllUserStories = function(projectId){
   UserStoryModel.isNew = false;
   return UserStoryModel.find({'projectId' : projectId})
   .populate({path : 'statusId', select : 'name'})
   .populate({path : 'projectId', select : 'name'})
   .populate({path : 'userStoryType', select : 'name'})
   .populate({path : 'priority', select : 'name'})
   .populate({path : 'createdBy', select : 'username'})
   .exec(function(err, userStory){
        if(err) console.log(err)
            return userStory;
    });
}
    
// Edit User Story
userStorySchema.statics.editUserStory = function(params){
    UserStoryModel.isNew = false;
    console.log("params is ");
    console.log(params);
    var query = {"_id":params.id};
    var update = params.doc;
    var options = {new: false};
    return UserStoryModel.findOneAndUpdate(query,update,options,function(error,status){
        if(error){
            console.log(error);
        } 
        return status; 
    });
}

//Delete User Story
userStorySchema.statics.deleteUserStory = function(id){
  UserStoryModel.isNew = false;
  return UserStoryModel.findOneAndRemove({'_id': id }, function(error, status){
      if(error)
        console.log(error);
      else
        console.log(status);
  });
   
}

// Gets list of user stories from database
userStorySchema.statics.getAllUserStoriesWithNewStatus = function(projectId, statusId){
   UserStoryModel.isNew = false;
   return UserStoryModel.find({$and :[ {'projectId': projectId},{'statusId': statusId}]})
   .populate({path : 'statusId', select : 'name'})
   .populate({path : 'projectId', select : 'name'})
   .populate({path : 'userStoryType', select : 'name'})
   .populate({path : 'priority', select : 'name'})
   .populate({path : 'createdBy', select : 'username'})
   .exec(function(err, userStory){
        if(err) console.log(err)
            return userStory;
    });
}


userStorySchema.statics.getAllUserStoriesWithCompleteStatus = function(statusId){
   UserStoryModel.isNew = false;
  return UserStoryModel.find({'statusId': statusId }).populate({path : 'statusId', select : 'name'})
   .populate({path : 'projectId', select : 'name'})
   .populate({path : 'userStoryType', select : 'name'})
   .populate({path : 'priority', select : 'name'})
   .populate({path : 'createdBy', select : 'username'})
   .exec(function(err, userStory){
        if(err) console.log(err)
            return userStory;
    });
   
}

userStorySchema.statics.getAllUserStoriesExceptStatus = function(statusId1,statusId2){
   UserStoryModel.isNew = false;
  return UserStoryModel.find({ "statusId": statusId1, $or: [ { "statusId": statusId2 } ] },function(error, doc){
      if(error)
        return error;
        return doc;
  });
}

userStorySchema.statics.getAllUserStoriesExceptCompletedAndClosed = function(completedStatusId, closedStatusId){
   UserStoryModel.isNew = false;
  return UserStoryModel.find({$and: [{'statusId' :   {$ne : completedStatusId}},{'statusId' : {$ne : closedStatusId}}]})
        .populate({path : 'statusId', select : 'name'})
        .populate({path : 'projectId', select : 'name'})
        .populate({path : 'userStoryType', select : 'name'})
        .populate({path : 'priority', select : 'name'})
        .populate({path : 'createdBy', select : 'username'})
        .exec(function(err, userStory){
                if(err) console.log(err)
                    return userStory;
            });

}

   
  userStorySchema.statics.updateUserStory = function(id,doc){
   UserStoryModel.isNew = false;
   var query = {"_id": id};
   var update = doc;
   var options = {new: false};
  return  UserStoryModel.findOneAndUpdateQ(query,update,options);
  }


module.exports= userStorySchema;