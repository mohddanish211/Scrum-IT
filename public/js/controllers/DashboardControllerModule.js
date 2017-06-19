angular.module('DashboardControllerModule', []).controller('DashboardController', function($scope, $stateParams,
    userService, sprintService, statusService ) {
    // Setting hidden IDs for project and user
    $scope.hiddenProjectId = $stateParams.projectId;
    $scope.hiddenCurrentUserId = $stateParams.userId;
    $scope.hiddenProjectName = $stateParams.projectName;
    userService.getUserByUserId($stateParams.userId).then(function(dataFromServer){
        $scope.hiddenCurrentUserName = dataFromServer.data.username;    
    })

});