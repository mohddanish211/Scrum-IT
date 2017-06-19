/* global Schema */
/* global mongoose */

var sprintBacklogSchema = new mongoose.Schema({
    name : {type : String},
    userStoryId : {type : Schema.Types.ObjectId, ref : "user_story"},
    sprintId : {type : Schema.Types.ObjectId, ref : "sprint"},
    statusId : {type : Schema.Types.ObjectId, ref : "status"},
    estimatedEffort : {type : Number},
    actualEffort : {type : Number}
     });

sprintBacklogSchema.statics.addSprintBacklog = function(sprintBacklogDoc) {
    SprintBacklogModel.isNew = true;
    var sprintBacklog = SprintBacklogModel(sprintBacklogDoc);
    return sprintBacklog.save(function(err,doc){
        if(err)
            console.log(err);
        else
            return doc;
    });
}

sprintBacklogSchema.statics.getAllSprintBacklogsForCurrentSprint = function(sprintId){
   SprintBacklogModel.isNew = false;
   return SprintBacklogModel.find({'sprintId': sprintId })
    .populate({path : 'userStoryId', select : 'name'})
    .populate({path : 'sprintId', select : 'name'})
    .populate({path : 'statusId', select : 'name'})
    .exec(function(err, sprintBacklogDocList){
            if(err) console.log(err)
                return sprintBacklogDocList;
        });
   
}



var SprintBacklogModel = mongoose.model("sprint_backlog",sprintBacklogSchema);
module.exports= sprintBacklogSchema;