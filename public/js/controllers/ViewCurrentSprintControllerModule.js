angular.module('ViewCurrentSprintControllerModule', []).controller('ViewCurrentSprintController', 
function($scope, backlogService, sprintService, statusService) {

    var projectId = $scope.hiddenProjectId;
    $scope.projectNameCurrentSprint = $scope.hiddenProjectName;

    $scope.getCurrentSprint = function() {
        statusService.getNewStatusDoc(callBackAfterGettingStatus).then(function(dbResponse){
            var newStatusId = dbResponse.data[0]._id;
            callBackAfterGettingStatus(newStatusId);
        });

    }
    
    function callBackAfterGettingStatus(newStatusId){
        sprintService.getCurrentSprint(projectId, newStatusId).then(function(dataFromServer){
            console.log(dataFromServer);
            $scope.name = dataFromServer.data[0].name;
            $scope.description = dataFromServer.data[0].description;
            $scope.createdBy = dataFromServer.data[0].createdBy.username;
            $scope.status = dataFromServer.data[0].statusId.name;
            $scope.startDate = dataFromServer.data[0].startDate;
            $scope.endDate = dataFromServer.data[0].endDate;
            $scope.estimatedEffort = dataFromServer.data[0].estimatedEffort;
            $scope.actualEffort = dataFromServer.data[0].actualEffort;

            sprintService.getAllSprintBacklogsForCurrentSprint(dataFromServer.data[0]._id).then(function(dbResponse){
                var sprintBacklogDocList = "";
                console.log(dbResponse);
                for(var i=0 ; i<dbResponse.data.length; i++) {
                    sprintBacklogDocList+=dbResponse.data[i].name+",";
                }
                $scope.sprintBacklogs = sprintBacklogDocList;
            });

        }); 
        
    }
    
});