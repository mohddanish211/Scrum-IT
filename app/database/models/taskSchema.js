/* global Schema */
/* global mongoose */

var taskSchema = new mongoose.Schema({
    name : {type : String, required : true  },
    description : {type : String},
    assignee : {type : Schema.Types.ObjectId, ref : "user"},
    sprintBacklogId : {type : Schema.Types.ObjectId, ref : "sprint_backlog"},
    sprintId : {type : Schema.Types.ObjectId, ref : "sprint"},
    statusId : {type : Schema.Types.ObjectId, ref : "status"},
    estimatedEffort : {type : Number},
    actualEffort : {type : Number}
});

var TaskModel = mongoose.model("task",taskSchema);


taskSchema.statics.getAllTasksForCurrentSprint = function(sprintId){
   TaskModel.isNew = false;
  return TaskModel.find({'sprintId': sprintId })
   .populate({path : 'assignee', select : 'username'})
   .populate({path : 'sprintBacklogId', select : 'name'})
   .populate({path : 'sprintId', select : 'name'})
   .populate({path : 'statusId', select : 'name'})
   .exec(function(err, taskDocList){
        if(err) console.log(err)
            return taskDocList;
    });
   
}

// Add task in Database
taskSchema.statics.addTask = function(taskDoc) {
        TaskModel.isNew = true;
        var task = new TaskModel(taskDoc);
        return task.saveQ(function(err,doc){
            if(err)
                console.log(err);
            else
                console.log(doc);
        });
}

// Edit Task
taskSchema.statics.editTask = function(params){
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ Edit Task");
    console.log(params);
    TaskModel.isNew = false;
    var query = {"_id":params._id};
    var update = params.doc;
    var options = {new: false};
    return TaskModel.findOneAndUpdate(query,update,options,function(error,status){
        if(error){
            console.log("DB ERROR");
            console.log(error);
        }
        console.log(status); 
        return status; 
    });
}

//Delete Task
taskSchema.statics.deleteTask = function(id){
  TaskModel.isNew = false;
  return TaskModel.findOneAndRemove({'_id': id }, function(error, status){
      if(error)
        console.log(error);
      else
        console.log(status);
  });
   
}

module.exports= taskSchema;