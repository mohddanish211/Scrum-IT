/* global mongoose */
var projectSchema = new mongoose.Schema({
    name : {type :String, unique : true},
    description : {type : String}
});

var ProjectModel = mongoose.model("project",projectSchema);
//Add project in the database
projectSchema.statics.addProject = function(projectDoc) {
        ProjectModel.isNew = true;
        var project = ProjectModel(projectDoc);
        return project.saveQ(function(err, doc){
            if(err)
                console.log(err);
            else
                console.log(doc);            
        });
    }

// Gets list of projects from database
projectSchema.statics.getAllProjects = function(){
   ProjectModel.isNew = false;
   return ProjectModel.findQ();
}   
    
// Edit project from the database
projectSchema.statics.editProject = function(params){
  ProjectModel.isNew = false;
  console.log("Inside edit Status");
  console.log(params);
  var query = {"_id":params.id};
 var update = params.doc;
 var options = {new: false};
 return ProjectModel.findOneAndUpdateQ(query,update,options,function(error,status){
   if(error){
       console.log(error);
   }  
 });
}

//Delete Project
projectSchema.statics.deleteProject = function(id){
  console.log("Inside delete Project");
  console.log(id);
  ProjectModel.isNew = false;
  return ProjectModel.findOneAndRemove({'_id': id }, function(error, status){
      if(error)
        console.log(error);
      else
        console.log(status);
  });
   
}

//get Project on the basis of name
projectSchema.statics.getProject = function(name){
  ProjectModel.isNew = false;
  return ProjectModel.findOne({'name': name }, function (err, project){
});
   
}

//Get all projects except super user project
projectSchema.statics.getAllProjectsExceptSuperUserProject = function(superUserProjectId) {
  return ProjectModel.findQ({'_id': {$ne : superUserProjectId}});
}

module.exports= projectSchema;