/* global mongoose */
var prioritySchema = new mongoose.Schema({
    name : {type :String, unique : true},
    description : {type :String}    
});

var PriorityModel = mongoose.model("priority",prioritySchema);
// Add priority in Database
prioritySchema.statics.addPriority = function(prioritytDoc) {
        PriorityModel.isNew = true;
        var priority = PriorityModel(prioritytDoc);
        return priority.saveQ(function(err,doc){
            if(err)
                console.log(err);
            else
                console.log(doc);
        });
    }
    
// Gets list of priorities from database
prioritySchema.statics.findAllPriorities = function(){
   PriorityModel.isNew = false;
   return PriorityModel.findQ();
}

// Edit priority from the databse

prioritySchema.statics.editPriority = function(params){
  PriorityModel.isNew = false;
  console.log("Inside edit Priority");
  console.log(params);
  var query = {"_id":params.id};
 var update = params.doc;
 var options = {new: false};
 return PriorityModel.findOneAndUpdateQ(query,update,options,function(error,users){
   if(error){
       console.log(error);
   }  
 });
  
  
  
   //return PriorityModel.findByIdQ();
}

//Delete Priority
prioritySchema.statics.deletePriority = function(id){
  console.log("Inside delete Priority");
  console.log(id);
  PriorityModel.isNew = false;
  return PriorityModel.findOneAndRemove({'_id': id }, function(error, status){
      if(error)
        console.log(error);
      else
        console.log(status);
  });
   //return PriorityModel.findByIdQ();
}



module.exports = prioritySchema;