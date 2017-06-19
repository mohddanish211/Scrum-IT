angular.module('MasterTablesControllerModule', []).controller('MasterTablesController', function($scope, 
                masterTablesService) {
    console.log("Inside Master Controller");
    $scope.message="Master";
    $scope.addRole = function() {
        masterTablesService.addRole($scope.role).then(function(responseFromServer){
            console.log(responseFromServer);
            $scope.listRoles = responseFromServer.data;
        });
    }
    
});