angular.module('UserControllerModule', []).controller('UserController', function($scope,$location, 
                userService) {
    console.log("Inside User Controller");
    
    //Register User
    $scope.registerNewUser = function(){
        var firstName= $scope.firstName;
        var lastName = $scope.lastName;
        var emailAddress = $scope.emailAddress;
        var password = $scope.password;
        var confirmPassword = $scope.confirmPassword;
        var userName = $scope.userName;
        //var userRoleId=$scope.userRoleList._id;
        if(password==confirmPassword){
            console.log("------Inside password and confirmpassword check--------");
            //Check whether user already exists or not
            userService.checkUsername(userName).then(function(dataFromServer){
                console.log("!!!!!!!Check Username data!!!!");
                console.log(dataFromServer);
                if(dataFromServer.data != "") {
                    $scope.message="Username already Exists !!";                     
                } else { // Save new user in database
                    userService.registerUser(firstName,lastName,emailAddress,
                            password,userName).then(function(dataFromServer){
                                console.log("!!!!! Register User dataFromServer !!!!!");
                                console.log(dataFromServer);
                                $scope.message="User Registered ! Please click on Back to Login link below !";                                
                    }); 
                }                
            });            
        } else {
                $scope.message="The two passwords do not match !!";  
        }
    }
    
    //Getuser
    $scope.getUserProfile = function() {
        var userId = $scope.hiddenCurrentUserId;
        console.log("Username from $scope inside getUserProfile method--------------");
        console.log(userId);
            userService.getUserByUserId(userId).then(function(dataFromServer){
                
                console.log("INSIDE getUser METHOD");
                
                console.log("----------!!!!!!!-------------");
                console.log(dataFromServer);
                
                $scope.user = dataFromServer.data;
                
                $scope.firstName = dataFromServer.data.firstName;
                $scope.lastName = dataFromServer.data.lastName;
                $scope.emailAddress = dataFromServer.data.email;
                $scope.password = dataFromServer.data.password;
                $scope.userName = dataFromServer.data.username;
                
            }); 
        
        
    }
    
    //Update user
    $scope.editUser = function () {
        var userId = $scope.hiddenCurrentUserId;
        var firstName= $scope.firstName;
        var lastName = $scope.lastName;
        var emailAddress = $scope.emailAddress;
        var username = $scope.userName;
                     
        var userDoc = {firstName : firstName, lastName : lastName, email : emailAddress, username: username, password: $scope.password};
          
        
        userService.updateUserByUserId(userDoc, userId).then(function(dataFromServer){
            
            console.log("-------!!!!!!!!!!!!!!!----------->");
            console.log(dataFromServer);
            
            if (dataFromServer.data == "User_details_updated"){
                $scope.message = "User details have been successfully updated !!";                
            }
            else
                $scope.message = "Failed updation request!!"            
        });
    }
    
});