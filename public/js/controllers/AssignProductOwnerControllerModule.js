angular.module('AssignProductOwnerControllerModule', []).controller('AssignProductOwnerController',
    function($scope,$filter,userService, roleService, projectService) {

var productOwnerRoleId;
var currentUserId = $scope.hiddenCurrentUserId;

 // Getting role id of product owner
function loadUserProjectRoleList(){
    roleService.getRoleByName("Product Owner").then(function(roleDoc){
    productOwnerRoleId = roleDoc.data._id;
    userService.getAllUserProjectRolesByProductOwner(productOwnerRoleId, callbackLoadUserProjectRoleList).then(function(dbResponse){
        var userProjectRoleDocList = [];
        for(var i=0 ; i<dbResponse.data.length; i++) {
            userProjectRoleDocList.push(dbResponse.data[i]);
        }
        $scope.userProjectRoles = userProjectRoleDocList;
        callbackLoadUserProjectRoleList();
        });
    });
}
  loadUserProjectRoleList();
  
  function callbackLoadUserProjectRoleList(){
    $scope.users = [];
    $scope.loadUsers = function() {
        return $scope.users.length ? null : userService.getAllUsersExceptSuperUser().then(function(dbResponse){
            var userDocList = [];
            for(var i=0 ; i<dbResponse.data.length; i++) {
                userDocList.push(dbResponse.data[i]);
            }
            $scope.users = userDocList;
        });
    };

    $scope.showUser = function(userProjectRole) {
        if(userProjectRole.userId._id && $scope.users.length) {
        var selected = $filter('filter')($scope.users, {_id: userProjectRole.userId._id});
        return selected.length ? selected[0].username : 'Not set';
        } else {
        return userProjectRole.userId.username || 'Not set';
        }
    };
    var superUserProjectId = $scope.hiddenProjectId;
    $scope.projects = [];
    $scope.loadProjects = function() {
        return $scope.projects.length ? null : projectService.getAllProjectsExceptSuperUserProject(superUserProjectId).then(function(dbResponse){
            var projectDocList = [];
            for(var i=0 ; i<dbResponse.data.length; i++) {
                projectDocList.push(dbResponse.data[i]);
            }
            $scope.projects = projectDocList;
        });
    };

    $scope.showProject = function(userProjectRole) {
        if(userProjectRole.projectId._id && $scope.projects.length) {
        var selected = $filter('filter')($scope.projects, {_id: userProjectRole.projectId._id});
        return selected.length ? selected[0].name : 'Not set';
        } else {
        return userProjectRole.projectId.name || 'Not set';
        }
    };

      
  }
  


  // filter userProjectRoles to show
  $scope.filterUserProjectRole = function(userProjectRole) {
    return userProjectRole.isDeleted !== true;
  };

  // mark userProjectRole as deleted
  $scope.deleteUserProjectRole = function(id) {
    var filtered = $filter('filter')($scope.userProjectRoles, {_id: id});
    if (filtered.length) {
      filtered[0].isDeleted = true;
    }
  };

  // add user
  $scope.addUserProjectRole = function() {
    $scope.userProjectRoles.push({
      id: $scope.userProjectRoles.length+1,
      userId: {
          _id : null,
          username : null
      },
      projectId: {
          _id : null,
          name : null
      },
      isNew: true
    });
  };

  // cancel all changes
  $scope.cancel = function() {
    for (var i = $scope.userProjectRoles.length; i--;) {
      var userProjectRole = $scope.userProjectRoles[i];
      // undelete
      if (userProjectRole.isDeleted) {
        delete userProjectRole.isDeleted;
      }
      // remove new 
      if (userProjectRole.isNew) {
        $scope.userProjectRoles.splice(i, 1);
      }      
    };
  };

  // save edits
  $scope.saveTable = function() {
    var results = [];
    for (var i = $scope.userProjectRoles.length; i--;) {
      var userProjectRole = $scope.userProjectRoles[i];
      // actually delete user
      if (userProjectRole.isDeleted) {
        $scope.userProjectRoles.splice(i, 1);
        userService.deleteUserProjectRole(userProjectRole._id);
      }
      
      if(userProjectRole.isNew) {
          //Add this userProjectRole
            userService.addUserProjectRole(userProjectRole.userId._id, userProjectRole.projectId._id, productOwnerRoleId, currentUserId);          
      }
      if(!userProjectRole.isNew && !userProjectRole.isDeleted) {
          //Edit this userProjectRole
          var userProjectRoleDoc = {
              projectId :   userProjectRole.projectId._id,
              userId    :   userProjectRole.userId._id,
              roleId    :   userProjectRole.roleId,
              createdBy :   userProjectRole.createdBy
          }
          userService.editUserProjectRole(userProjectRole._id, userProjectRoleDoc);
      }      
    }//End of for loop
    loadUserProjectRoleList();
  };

});