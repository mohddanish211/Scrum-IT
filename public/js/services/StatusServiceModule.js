angular.module('StatusServiceModule', []).factory('statusService', ['$http', function($http) {

   return {
        addStatus : function(statusDoc){
            console.log(statusDoc);
            return $http.post("/addStatus", {
                params:statusDoc
                });
        },
        getAllStatus : function(){
            return $http.get("/getAllStatus")
        },
        deleteStatus : function(idOfTheStatus){
            console.log("Inside delete service::"+idOfTheStatus);
            return $http.post("/deleteStatus",{
                params : {
                    id : idOfTheStatus
                }
            })
        },
        editStatus : function(idOfTheStatus,statusDoc){
            return $http.post("/editStatus",{
                params :{
                    id : idOfTheStatus,
                    doc : statusDoc 
                }
            })
        },
        getNewStatusDoc : function(){
            return $http.get("/getNewStatusDoc");
        },
        getStatusDocByName : function(statusName) {
            return $http.post("/getStatusDocByName", {
               params : {
                   name : statusName
               } 
            });
        }
    }
}]);