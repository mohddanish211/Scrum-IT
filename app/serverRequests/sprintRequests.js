/* global mongoose */
module.exports = function(app) {

/* global SprintModel */
var SprintModel = require('../database/models/sprintSchema');
var SprintBacklogModel = require('../database/models/sprintBacklogSchema');
var TaskModel = require('../database/models/taskSchema');

   app.post("/checkSprintAlreadyRunning",function(req,res){
     SprintModel.statics.checkSprintAlreadyRunning(req.body.params).then(function(data){
         res.send(data);
     });
   });

   app.post("/addSprint",function(req,res){
     SprintModel.statics.addSprint(req.body.params.doc).then(function(data){
         res.send(data);
     });
   });
   
   app.post("/addSprintBacklog",function(req,res){
     SprintBacklogModel.statics.addSprintBacklog(req.body.params.doc).then(function(data){
         res.send(data);
     });
   });

   app.post("/getCurrentSprint",function(req,res){
     SprintModel.statics.getCurrentSprint(req.body.params.projectId, req.body.params.statusId).then(function(data){
         res.send(data);
     });
   });
   
   
   app.post("/getAllSprintsExceptCurrent",function(req,res){
     SprintModel.statics.getAllSprintsExceptCurrent(req.body.params.projectId, req.body.params.statusId).then(function(data){
         res.send(data);
     });
   });
   
   app.post("/getAllTasksForCurrentSprint",function(req,res){
     TaskModel.statics.getAllTasksForCurrentSprint(req.body.params.sprintId).then(function(data){
         res.send(data);
     });
   });
   
   app.post("/getAllSprintBacklogsForCurrentSprint",function(req,res){
     SprintBacklogModel.statics.getAllSprintBacklogsForCurrentSprint(req.body.params.sprintId).then(function(data){
         res.send(data);
     });
   });
   
    app.post("/addTask",function(req,res){
        TaskModel.statics.addTask(req.body.params.doc).then(function(data){
            res.send(data);
        });
    });

    app.post("/deleteTask",function(req,res){
        TaskModel.statics.deleteTask(req.body.params._id).then(function(data){
            res.send(data);
        });
    });
    
    app.post("/editTask",function(req,res){
        res.send(TaskModel.statics.editTask(req.body.params));
    })

}