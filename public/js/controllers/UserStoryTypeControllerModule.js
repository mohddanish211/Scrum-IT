angular.module('UserStoryTypeControllerModule', []).controller('UserStoryTypeController', function($scope, 
                userStoryTypeService) {
    console.log("Inside User Story Type Controller");
    $scope.addNewUserStoryType = function() {
        var userStoryTypeName = $scope.userStoryTypeName;
        var userStoryTypeDescription= $scope.userStoryTypeDescription;
        var userStoryTypeDoc = {
            name : userStoryTypeName,
            description : userStoryTypeDescription        
        }
        userStoryTypeService.addUserStoryType(userStoryTypeDoc).then(function(res){
            $scope.userStoryTypeName = res.config.data.params.name;
        });
        userStoryTypeService.getAllUserStoryTypes().then(function(res){
             $scope.userStoryTypes=res.data; 
         });
    }
    
    userStoryTypeService.getAllUserStoryTypes().then(function(res){
        console.log("Response is::")
        console.log(res);
       $scope.userStoryTypes=res.data; 
    });
    
    $scope.deleteUserStoryType = function(id){
        var idOfTheUserStoryType = id;
        console.log(idOfTheUserStoryType);
        userStoryTypeService.deleteUserStoryType(idOfTheUserStoryType).then(function(){
            userStoryTypeService.getAllUserStoryTypes().then(function(res){
                $scope.userStoryTypes=res.data; 
            });
        });
    }
    
    $scope.updateUserStoryType = function(id,userStoryTypeName,userStoryTypeDescription){
    var userStoryTypeDoc = {
            name : userStoryTypeName,
            description : userStoryTypeDescription       
        }        
     userStoryTypeService.editUserStoryType(id,userStoryTypeDoc).then(function(){
        userStoryTypeService.getAllUserStoryTypes().then(function(res){
                $scope.userStoryTypes=res.data; 
        });
     });
   }
});