angular.module('UserStoryTypeServiceModule', []).factory('userStoryTypeService', ['$http', function($http) {

    return {
        addUserStoryType : function(userStoryTypeDoc){
            console.log(userStoryTypeDoc);
            return $http.post("/addUserStoryType", {
                params:userStoryTypeDoc
                });
        },
        getAllUserStoryTypes : function(){
            return $http.get("/getAllUserStoryTypes")
        },
        deleteUserStoryType : function(idOfTheUserStoryType){
            console.log("Inside delete service::"+idOfTheUserStoryType);
            return $http.post("/deleteUserStoryType",{
                params : {
                    id : idOfTheUserStoryType
                }
            })
        },
        editUserStoryType : function(idOfTheUserStoryType,userStoryTypeDoc){
            return $http.post("/editUserStoryType",{
                params :{
                    id : idOfTheUserStoryType,
                    doc : userStoryTypeDoc 
                }
            })
        }
    }
}]);