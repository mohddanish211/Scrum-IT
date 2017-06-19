/* global Schema */
/* global mongoose */

var sprintSchema = new mongoose.Schema({
    name : {type : String, required : true  },
    description : {type : String},
    projectId : {type : Schema.Types.ObjectId, ref : "project"},
    createdBy : {type : Schema.Types.ObjectId, ref : "user"},
    statusId : {type : Schema.Types.ObjectId, ref : "status"},
    startDate : {type : Date, required : true},
    endDate : {type : Date, required : true},
    estimatedEffort : {type : Number, max : 240},
    actualEffort : {type : Number}
});

var SprintModel = mongoose.model("sprint",sprintSchema);


// Check whether a sprint already exists for the current project
sprintSchema.statics.checkSprintAlreadyRunning = function(params){
    var projectId = params.projectId;
    var statusId = params.statusId;
    
    return SprintModel.find({$and :[ {'projectId': projectId},{'statusId': statusId}]}, function(err, doc){
       if(err) console.log(err)
       console.log("DB##############");
       console.log(doc);
       return doc 
    });
}

sprintSchema.statics.addSprint = function(sprintDoc) {
    SprintModel.isNew = true;
    var sprint = SprintModel(sprintDoc);
    return sprint.save(function(err,doc){
        if(err) console.log(err);
        console.log("Sprint Doc ");
        return doc;
    });
}


sprintSchema.statics.getCurrentSprint = function(projectId, statusId){   
    console.log("Project ID is "+projectId);
    console.log("statusID is "+statusId); 
    return SprintModel.find({$and :[ {'projectId': projectId},{'statusId': statusId}]})
   .populate({path : 'createdBy', select : 'username'})
   .populate({path : 'projectId', select : 'name'})
   .populate({path : 'statusId', select : 'name'})
   .exec(function(err, sprint){
        if(err) console.log(err)
            return sprint;
    });
}

sprintSchema.statics.getAllSprintsExceptCurrent = function(projectId, statusId){   
    console.log("Project ID is "+projectId);
    console.log("statusID is "+statusId); 
    return SprintModel.find({$and :[ {'projectId': projectId},{'statusId': {$ne :statusId} }]})
   .populate({path : 'createdBy', select : 'username'})
   .populate({path : 'projectId', select : 'name'})
   .populate({path : 'statusId', select : 'name'})
   .exec(function(err, sprint){
        if(err) console.log(err)
            return sprint;
    });
}



module.exports= sprintSchema;