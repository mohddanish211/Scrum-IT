angular.module('PriorityControllerModule', []).controller('PriorityController', function($scope, 
                priorityService) {
    console.log("Inside Priority Controller");
    $scope.addNewPriority = function() {
        var priorityName = $scope.priorityName;
        var priorityDescription = $scope.priorityDescription;
        var priorityDoc = {
            name : priorityName,
            description : priorityDescription       
        }
        priorityService.addPriority(priorityDoc).then(function(res){
            console.log("http post response");
            console.log(res);
            $scope.priorityName = res.config.data.params.name;
        });
        priorityService.getAllPriorities().then(function(res){
             $scope.priorities=res.data; 
         });
    }
    
    priorityService.getAllPriorities().then(function(res){
        console.log("Response is::")
        console.log(res);
       $scope.priorities=res.data; 
    });
    
    $scope.deletePriority = function(id){
        var idOfThePriority = id;
        console.log("ID of priority is "+idOfThePriority);
        priorityService.deletePriority(idOfThePriority).then(function(){
            priorityService.getAllPriorities().then(function(res){
                $scope.priorities=res.data; 
            });            
        });        
    }
   
   $scope.updatePriority = function(id,priorityName,priorityDescription){
    var priorityDoc = {
            name : priorityName,
            description : priorityDescription       
        }
        
     priorityService.editPriority(id,priorityDoc).then(function(){
        priorityService.getAllPriorities().then(function(res){
            $scope.priorities=res.data; 
        });
     });
   }
    
});