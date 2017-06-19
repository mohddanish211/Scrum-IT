angular.module('ProjectServiceModule', []).factory('projectService', ['$http', function($http) {

    return {
        addProject : function(projectDoc){
            console.log("Project Doc is "+projectDoc);
            console.log(projectDoc);
            return $http.post("/addProject", {
                params:projectDoc
                });
        },
        
        getAllProjects : function(){
            return $http.get("/getAllProjects")
        },
        deleteProject : function(idOfTheProject){
            console.log("Inside delete service::"+idOfTheProject);
            return $http.post("/deleteProject",{
                params : {
                    id : idOfTheProject
                }
            })
        },
        getAllAssignedProjects : function(userId){
            return $http.post("/getAllAssignedProjects", {
                params : {
                    userId : userId
                }
            })
        },
        editProject : function(idOfTheProject,projectDoc){
            return $http.post("/editProject",{
                params :{
                    id : idOfTheProject,
                    doc : projectDoc 
                }
            })
        },
            getAllProjectsExceptSuperUserProject : function(superUserProjectId){
            return $http.post("/getAllProjectsExceptSuperUserProject", {
                params : {
                    projectId : superUserProjectId
                }
            });
        }

    }
}]);