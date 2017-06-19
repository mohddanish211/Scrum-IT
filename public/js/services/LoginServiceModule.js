angular.module('LoginServiceModule', []).factory('loginService', ['$http', function($http) {

    return {
        loginUser : function(emailAddress,password){
            return  $http.post("/login"
            ,{ params : {
                 email : emailAddress, 
                 password : password
                   }
                  })
        }
        
    }
}]);