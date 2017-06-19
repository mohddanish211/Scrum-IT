angular.module('RoleServiceModule', []).factory('roleService', ['$http', function($http) {

    return {
        addRole : function(roleDoc){
            console.log(roleDoc);
            return $http.post("/addRole", {
                params:roleDoc
                });
        },
        
        getAllRoles : function(){
            return $http.get("/getAllRoles");
        },
        
        deleteRole : function(idOfTheRole){
            console.log("Inside delete service::"+idOfTheRole);
            return $http.post("/deleteRole",{
                params : {
                    id : idOfTheRole
                }
            })
        },
        
        editRole : function(idOfTheRole,roleDoc){
            return $http.post("/editRole",{
                params :{
                    id : idOfTheRole,
                    doc : roleDoc
                }
            })
        },
        getAllRolesExceptUserId : function(userId, projectId){
            return $http.post("/getAllRolesExceptUserId",{
                params :{
                    userId: userId,
                    projectId : projectId
                }
            })
        },
        getRoleByName : function(roleName) {
            return $http.post("/getRoleByName", {
                params : {
                    roleName : roleName
                }
            })
        },
        getOldRoleIdFromId : function(id){
            return $http.post("/getRoleIdFromId",{
                params : {
                    id : id
                }
            })
        }
    }
}]);