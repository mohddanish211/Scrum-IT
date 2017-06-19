angular.module('PriorityServiceModule', []).factory('priorityService', ['$http', function($http) {

    return {
        addPriority : function(priorityDoc){
            console.log(priorityDoc);
            return $http.post("/addPriority", {
                params:priorityDoc
                });
        },
        getAllPriorities : function(){
            return $http.get("/getAllPriorities")
        },
        deletePriority : function(idOfThePriority){
            console.log("Inside delete service::"+idOfThePriority);
            return $http.post("/deletePriority",{
                params : {
                    id : idOfThePriority
                }
            })
        },
        editPriority : function(idOfThePriority,priorityDoc){
            return $http.post("/editPriority",{
                params :{
                    id : idOfThePriority,
                    doc : priorityDoc 
                }
            })
        }
    }
}]);