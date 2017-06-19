angular.module('ChatControllerModule', []).controller('ChatController', function($scope,$log,chatService,userService,$stateParams) {


userService.getUserByUserId($stateParams.userId).then(function(data){
    
    $scope.nameOfTheUser = data.data.firstName;
})
$scope.messageLog = 'Ready to chat!';


$scope.sendMessage = function() {
  chatService.emit('message', $scope.nameOfTheUser, $scope.message);
  $scope.message = '';
};

 $scope.$on('socket:broadcast', function(event, data) {
    if (!data.payload) {
      $log.error('invalid message', 'event', event, 
                 'data', JSON.stringify(data));
      return;
    } 
    
  $scope.$apply(function() {
      $scope.messageLog = messageFormatter(
            new Date(), data.source, 
            data.payload) + $scope.messageLog;
    }); 
  });
  
 function messageFormatter(date, nick, message){
     return date.toLocaleTimeString() + ' - ' + 
           nick + ' - ' + 
           message + '\n';
 }
  
});  // end of controller
