/* global mongoose */
module.exports = function(app) {
    
/* global ProjectModel */
var dbModels = require('../database/models/userStorySchema');
  
   app.post("/addUserStory",function(req,res){
     res.send(dbModels.statics.addUserStory(req.body.params));
   });
   
   app.post("/getAllUserStories",function(req,res){
     dbModels.statics.getAllUserStories(req.body.params.projectId).then(function(data){ res.send(data); });
    });
    
    app.post("/deleteUserStory",function(req,res){
       dbModels.statics.deleteUserStory(req.body.params.id).then(function(data){ res.send(data); }); 
    });
    
    app.post("/editUserStory",function(req,res){
       res.send(dbModels.statics.editUserStory(req.body.params));
    });
    
     app.post("/getAllUserStoriesWithCompleteStatus",function(req,res){
        dbModels.statics.getAllUserStoriesWithCompleteStatus(req.body.params.statusId).then(function(data){
            res.send(data);
        })
    });
    
    app.post("/getAllUserStoriesExceptStatus",function(req,res){
        dbModels.statics.getAllUserStoriesExceptStatus(req.body.params.statusId1,req.body.params.statusId2).then(function(data){
            res.send(data);
        })
    });
    
    app.post("/updateUserStory",function(req,res){
        dbModels.statics.updateUserStory(req.body.params.id,req.body.params.doc).then(function(data){
            res.send(data);
        })
    })
    
   
    
   app.post("/getAllUserStoriesWithNewStatus",function(req,res){
     dbModels.statics.getAllUserStoriesWithNewStatus(req.body.params.projectId, req.body.params.statusId).then(function(data){ res.send(data); });
    });
    
    
   app.post("/getAllUserStoriesExceptCompletedAndClosed",function(req,res){
     dbModels.statics.getAllUserStoriesExceptCompletedAndClosed(req.body.params.completedStatusId, req.body.params.closedStatusId).then(function(data){
          res.send(data); 
        });
   });
    

}