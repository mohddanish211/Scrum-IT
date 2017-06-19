angular.module('ChatServiceModule', []).factory('chatService', function($http,socketFactory) {

	console.log("Inside Chat Service");
    var socket = socketFactory();
      socket.forward('broadcast');
      return socket;


});
