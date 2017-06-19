angular.module('ProjectSettingsControllerModule', []).controller('ProjectSettingsController', function($scope, $filter,
    userService, roleService,$location) {

   var userId = $scope.hiddenCurrentUserId;
   var projectId = $scope.hiddenProjectId;
   
// Code for role drop down
    
    $scope.role = {
        roleId : 0,
        roleName : "--choose and assign a role--"
    }    
    $scope.roles = [];
    $scope.loadRoles = function() {
        return $scope.roles.length ? null : roleService.getAllRolesExceptUserId(userId, projectId).then(function(dataFromDataBase){
            $scope.roles = dataFromDataBase.data;  
        });
    };
    $scope.$watch('role.roleId', function(newVal, oldVal) {
        if (newVal !== oldVal) {
            var selected = $filter('filter')($scope.roles, {
                _id: $scope.role.roleId
            });
            $scope.role.roleName = selected.length ? selected[0].name : null;
        }
    });
    
    $scope.editProjectMember = function(){
           $location.path("/editProjectMember");
    }
    
    roleService.getAllRolesExceptUserId(userId, projectId).then(function(dataFromDataBase){
            $scope.roles = dataFromDataBase.data;  
    });
            
    $scope.addUserProjectRole = function(assignedUserId){
        userService.addUserProjectRole(assignedUserId, projectId, $scope.role.roleId, userId).then(function(){
            $scope.role.roleName = "--choose and assign a role--";
            getUnassignedUserList();
        });
    }
    
    function getUnassignedUserList(){
        userService.getSelectedUserNameList(userId, projectId).then(function(dbResponse){
            console.log(dbResponse);
            var excludeUserList = [];
            excludeUserList.push('admin'); //Excluding Super User from list
            for(var i=0 ; i<dbResponse.data.length; i++) {
                excludeUserList.push(dbResponse.data[i].userId.username);
            }
            console.log(excludeUserList);
            userService.getUnassignedUserNameList(excludeUserList).then(function(dbResponse){
                console.log(dbResponse);
                $scope.userList = dbResponse.data;
            })
        });
    }

    //Function to get initial list of all unassigned users
    getUnassignedUserList();


});