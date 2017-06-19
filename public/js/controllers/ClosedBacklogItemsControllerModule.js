angular.module('ClosedBacklogItemsControllerModule', []).controller('ClosedBacklogItemsController', function($scope,statusService,backlogService) {
   var status="Closed";
    statusService.getStatusDocByName(status).then(function(dataFromServer){
        console.log(dataFromServer.data[0]._id);
        var id= dataFromServer.data[0]._id;
         backlogService.getAllUserStoriesWithCompleteStatus(id).then(function(data) {
        $scope.userStoryList = data.data;
        console.log("--------------------------");
        console.log($scope.userStoryList);
    });
 });
 
 function refreshList(){
      statusService.getStatusDocByName(status).then(function(dataFromServer){
        console.log(dataFromServer.data[0]._id);
        var id= dataFromServer.data[0]._id;
         backlogService.getAllUserStoriesWithCompleteStatus(id).then(function(data) {
        $scope.userStoryList = data.data;
        console.log("--------------------------");
        console.log($scope.userStoryList);
    });
 });
 }
 
 statusService.getStatusDocByName("Closed").then(function(dataFromServer){
     $scope.closeStatus= dataFromServer.data[0]._id;
 });
    
    $scope.closeUserStory = function(doc,id){
        console.log(doc);
        var updatedDoc= doc;
        updatedDoc.statusId= $scope.closeStatus;
        backlogService.upadteUserStory(id,updatedDoc).then(function(dataFromServer){
            console.log("Success!!");
            refreshList();
            
        });
        
    }

});