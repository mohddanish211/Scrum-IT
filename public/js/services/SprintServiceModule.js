angular.module('SprintServiceModule', []).factory('sprintService', ['$http', function($http) {

    return {
        checkSprintAlreadyRunning : function(projectId, statusId){
            return $http.post("/checkSprintAlreadyRunning",{
                params : {
                    projectId   :   projectId,
                    statusId    :   statusId        
                }
            });
        },
        addSprint : function(sprintDoc) {
            return $http.post("/addSprint", {
               params : {
                   doc : sprintDoc
               } 
            });
        },
        getCurrentSprint : function(projectId, statusId){
            return $http.post("/getCurrentSprint", {
                params : {
                    projectId : projectId,
                    statusId : statusId
                }
            })
        },
        getAllSprintsExceptCurrent : function(projectId, statusId){
            return $http.post("/getAllSprintsExceptCurrent", {
                params : {
                    projectId : projectId,
                    statusId : statusId
                }
            })
        },
        getAllTasksForCurrentSprint : function(currentSprintId){
            return $http.post("/getAllTasksForCurrentSprint", {
                params : {
                    sprintId : currentSprintId
                }
            })
        },
        getAllSprintBacklogsForCurrentSprint : function(currentSprintId){
            return $http.post("/getAllSprintBacklogsForCurrentSprint", {
                params : {
                    sprintId : currentSprintId
                }
            })
        },
        addTask :   function(taskDoc) {
            return $http.post("/addTask", {
               params : {
                   doc : taskDoc
               } 
            });
        },editTask : function(taskId, taskDoc) {
            return $http.post("/editTask", {
               params : {
                   _id : taskId,
                   doc : taskDoc
               } 
            })
        },
        deleteTask : function(taskId) {
            return $http.post("/deleteTask", {
               params : {
                   _id : taskId
               } 
            });
        }
    }

}]);