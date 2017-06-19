angular.module('MasterTablesServiceModule', []).factory('masterTablesService', ['$http', function($http) {

    return {
        addRole : function(roleData){
            console.log("Role data is "+roleData);
            return $http.post("/addRole",{
                params:{
                           name:roleData
                    }
                });
        }
    }
}]);