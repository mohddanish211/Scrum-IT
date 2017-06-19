angular.module('UserServiceModule', []).factory('userService', ['$http', function($http) {

    return {
        registerUser : function(firstName,lastName,emailAddress,password,username){
            return  $http.post("/registerUser"
            ,{ params : {
                 firstName :firstName,
                  lastName : lastName, 
                  email : emailAddress, 
                  password : password,
                  username : username
                   }
                  })
        },
        checkUsername :function(username){
            return $http.post("/checkUsername"
            ,{ params : {
                username : username
            }                
            })
        }, 
        getSelectedUserNameList : function(userId, projectId){
            return $http.post("/getSelectedUserNameList",{
               params: {
                   userId       :   userId,
                   projectId    :   projectId
               }
            })
        },
        getUser : function (username) {
            return $http.post("/getUser", {
                params : {
                    username : username
                }
            })
        },
        getUserByUserId : function(userId){
            return $http.post('/getUserByUserId',{
                params : {
                    id : userId
                }
            })
        },
        
        
        updateUserByUserId : function(userDoc,userId){
            return $http.post('/updateUserByUserId',{
               params : {
                   userDoc : userDoc,
                   id : userId
               } 
            });
        },
        
        
        getUserByEmail : function (email) {
            return $http.post("/getUserByEmail", {
                params : {
                    email : email
                }
            })
        },
        addUserProjectRole : function(userId, projectId, roleId, createdBy) {
            return $http.post("/addUserProjectRole", {
                params : {
                    userId      :   userId,
                    projectId   :   projectId,
                    roleId      :   roleId,
                    createdBy   :   createdBy
                }
            })
        },
        getUnassignedUserNameList : function(excludeUserListArray) {
            return $http.post("/getUnassignedUserNameList", {
                params : {
                    excludeUserListArray : excludeUserListArray
                }
            });
        },
        getAllUserProjectRolesByProductOwner : function (roleId) {
            return $http.post("/getAllUserProjectRolesByProductOwner", {
                params : {
                    roleId : roleId
                }
            });
        },
        getAllUsersExceptSuperUser : function(){
            return $http.get("/getAllUsersExceptSuperUser");
        },
        editUserProjectRole : function(userProjectRoleId, userProjectRoleDoc) {
            return $http.post("/editUserProjectRole", {
                params : {
                    _id   :   userProjectRoleId,
                    doc   :   userProjectRoleDoc
                }
            })
        },
        deleteUserProjectRole : function(id){
            return $http.post("/deleteUserProjectRole", {
                params : {
                    id  :   id
                }
            });
        },
        removeUserFromProject : function(userProjectRoleid){
            return $http.post("/removeUserFromProject",{
                params : {
                    id: userProjectRoleid
                }
            });
        },
        modifyUserRole : function(id,modifiedRoleDoc){
            return $http.post("/modifyUserRole",{
                params :{
                    id : id,
                    modifiedRoleDoc : modifiedRoleDoc
                }
            })
        }
        
    }
}]);