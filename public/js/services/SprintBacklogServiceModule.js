angular.module('SprintBacklogServiceModule', []).factory('sprintBacklogService', ['$http', function($http) {

    return {
        addSprintBacklog : function(sprintBacklogDoc){
            return $http.post("/addSprintBacklog",{
                params : {
                    doc   :   sprintBacklogDoc      
                }
            });
        }

    }

}]);