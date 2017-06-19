angular.module('AssignedProjectMembersControllerModule', []).controller('AssignedProjectMembersController', function($scope,userService,roleService) {
    console.log("Inside AssignedProjectMembersController");
    var userId = $scope.hiddenCurrentUserId;
   var projectId = $scope.hiddenProjectId;
    roleService.getAllRolesExceptUserId(userId, projectId).then(function(dataFromDataBase){
            $scope.roles = dataFromDataBase.data;  
    });
    userService.getSelectedUserNameList(userId, projectId).then(function(dbResponse){
            console.log(dbResponse);
            var includedList = [];
            for(var i=0 ; i<dbResponse.data.length; i++) {
                includedList.push({userId:dbResponse.data[i].userId,id:dbResponse.data[i]._id,roleId:dbResponse.data[i].roleId});
            }
            console.log(includedList);
            $scope.includedUserList=includedList;
        });
        
    function refreshAssignedUserList(){
         userService.getSelectedUserNameList(userId, projectId).then(function(dbResponse){
            console.log(dbResponse);
            var includedList = [];
            for(var i=0 ; i<dbResponse.data.length; i++) {
                includedList.push({userId:dbResponse.data[i].userId,id:dbResponse.data[i]._id,roleId:dbResponse.data[i].roleId});
            }
            console.log(includedList);
            $scope.includedUserList=includedList;
        });
    }
    
    
    
    $scope.deleteUserFromProject = function(idOfTheUser){
        console.log("User to be deleted:: "+idOfTheUser);
         userService.removeUserFromProject(idOfTheUser,projectId).then(function(data){
             console.log("User Deleted");
             //Refresh The List
          refreshAssignedUserList();
         });
    }
    
    $scope.changeUserProjectRole = function(idOfUserRoleProject,modifiedUserRoleId){
        roleService.getOldRoleIdFromId(idOfUserRoleProject).then(function(data){
            console.log(data.roleId); 
              var modifiedUserRoleDoc= {
                   projectId : data.data.projectId, 
                    userId : data.data.userId, 
                    roleId : modifiedUserRoleId, 
                    createdBy : data.data.createdBy
              }
              userService.modifyUserRole(idOfUserRoleProject,modifiedUserRoleDoc);
              refreshAssignedUserList();
        });
       
    }
        
    
    
});