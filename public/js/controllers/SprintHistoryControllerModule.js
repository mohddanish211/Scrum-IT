angular.module('SprintHistoryControllerModule', []).controller('SprintHistoryController', 
    function($scope, backlogService, sprintService, statusService) {

    var projectId = $scope.hiddenProjectId;
    statusService.getNewStatusDoc(callBackAfterGettingStatus).then(function(dbResponse){
        var newStatusId = dbResponse.data[0]._id;
        callBackAfterGettingStatus(newStatusId);
    });
    
    function callBackAfterGettingStatus(newStatusId) {
        sprintService.getAllSprintsExceptCurrent(projectId, newStatusId).then(function(dataFromDataBase){
            console.log(dataFromDataBase);
                $scope.sprints = dataFromDataBase.data;  
        });
    }
    
});