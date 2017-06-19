angular.module('LoginControllerModule', []).controller('LoginController', function($scope,$location, 
                loginService) {
    console.log("Inside Login Controller");
    $scope.loginNewUser = function(){
        
    var emailAddress = $scope.emailAddress;
    var password = $scope.password;
    
    if ($scope.emailAddress == null || $scope.password == null){
        
        $scope.loginErrMessage = 'Please fill up the required fields !!';
    }
    else
    {
        $scope.registerUserInfoFromServer = loginService.loginUser(emailAddress,password).then(function(dataFromServer){
           $scope.responseFromServer = dataFromServer.data;
           
           if(dataFromServer.data == "Login Successfull !!")
             $location.path("/project/"+$scope.emailAddress);
           else
             $scope.loginErrMessage = 'Invalid Credentials !!';
        });        
        
    }
    
    
    }
});