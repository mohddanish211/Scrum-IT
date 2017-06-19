angular.module('ProjectControllerModule', []).controller('ProjectController', function($scope, $location, $stateParams,
                projectService,userService,roleService) {
                      
    var currentUserEmail = $stateParams.emailAddress;
    $scope.addNewProject = function() {
        var projectName = $scope.projectName;
        var projectDescription=$scope.projectDescription;
        var projectDoc = {
            name : projectName,
            description : projectDescription       
        }
        projectService.addProject(projectDoc).then(function(res){
            console.log(res);
            $scope.projectName = res.config.data.params.name;
        });
        projectService.getAllProjects().then(function(res){
            $scope.projectsMasterTable=res.data; 
        });
    }
    
    projectService.getAllProjects().then(function(res){
       $scope.projectsMasterTable = res.data; 
    });

    userService.getUserByEmail(currentUserEmail, callbackGetUserByEmail).then(function(userDoc){
        var userId = userDoc.data._id;
        callbackGetUserByEmail(userId);
    });
    
    function callbackGetUserByEmail(userId) {
        projectService.getAllAssignedProjects(userId).then(function(response){
            var projectArray = [];
            if(response.data.length > 0){
                for(var i=0; i<response.data.length;i++){
                    projectArray.push(response.data[i].projectId);
                }
                $scope.projects = projectArray;
                $scope.noProjectAssigned = "";
            } else {
                $scope.noProjectAssigned = "You have not been assigned any project.";
            }
        });
    }
    
    $scope.deleteProject = function(id){
        var idOfTheStatus = id;
        console.log(idOfTheStatus);
        projectService.deleteProject(idOfTheStatus).then(function(){
            projectService.getAllProjects().then(function(res){
                $scope.projectsMasterTable=res.data; 
            });
        });

    }
    
    $scope.updateProject = function(id,projectName,projectDescription){
    var projectDoc = {
            name : projectName,
            description : projectDescription       
     }
     projectService.editProject(id,projectDoc).then(function(){
        projectService.getAllProjects().then(function(res){
                $scope.projectsMasterTable=res.data; 
        });         
     });

   }
   
   $scope.goToHomePage = function(projectId, projectName){
       userService.getUserByEmail(currentUserEmail).then(function(userDoc){
           var userId = userDoc.data._id;
           $location.path("/homePage/"+projectId+"/"+userId+"/"+projectName);
       });
   }
   
});