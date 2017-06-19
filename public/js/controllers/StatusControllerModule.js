angular.module('StatusControllerModule', []).controller('StatusController', function($scope, 
                statusService) {
    console.log("Inside Status Controller");
 $scope.addNewStatus = function() {
        var statusName = $scope.statusName;
        var statusDescription = $scope.statusDescription;
        var statusDoc = {
            name : statusName,
            description : statusDescription       
        }
        statusService.addStatus(statusDoc).then(function(res){
           
        });
        statusService.getAllStatus().then(function(res){
             $scope.statuses=res.data; 
         });
    }
    
    statusService.getAllStatus().then(function(res){
        console.log("Response is::")
        console.log(res);
       $scope.statuses=res.data; 
    });
    
    $scope.deleteStatus = function(id){
        var idOfTheStatus = id;
        console.log(idOfTheStatus);
        statusService.deleteStatus(idOfTheStatus).then(function(){
            statusService.getAllStatus().then(function(res){
                $scope.statuses=res.data; 
            });
        });        
    }
   
   $scope.updateStatus = function(id,statusName,statusDescription){
    var statusDoc = {
            name : statusName,
            description : statusDescription       
    }
    statusService.editStatus(id,statusDoc).then(function(){
        statusService.getAllStatus().then(function(res){
            $scope.statuses=res.data; 
        });
    });
   }
    
});