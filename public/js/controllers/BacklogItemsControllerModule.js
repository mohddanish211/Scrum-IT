angular.module('BacklogItemsControllerModule', []).controller('BacklogItemsController', 
    function($scope,$filter,priorityService,userStoryTypeService,statusService, backlogService) {
statusService.getNewStatusDoc().then(function(dataFromDataBase){
    console.log(dataFromDataBase);
   $scope.newStatusDoc= dataFromDataBase.data;
});
// Code for user story status drop down
    $scope.status = {
        statusId : 0,
        statusName : "--choose an option--"
    }    
    $scope.statuses = [];
    $scope.loadStatuses = function() {
    return $scope.statuses.length ? null : statusService.getAllStatus().then(function(res){
             $scope.statuses = res.data;
         });
    };
    $scope.$watch('status.statusId', function(newVal, oldVal) {
        if (newVal !== oldVal) {
            var selected = $filter('filter')($scope.statuses, {
                _id: $scope.status.statusId
            });
            $scope.status.statusName = selected.length ? selected[0].name : null;
        }
    });
  
// Code for user story priority drop down
    
    $scope.priority = {
        priorityId : 0,
        priorityName : "--choose an option--"
    }    
    $scope.priorities = [];
    $scope.loadPriorities = function() {
    return $scope.priorities.length ? null : priorityService.getAllPriorities().then(function(dataFromDataBase){
       $scope.priorities = dataFromDataBase.data;  
    });
    };
    $scope.$watch('priority.priorityId', function(newVal, oldVal) {
        if (newVal !== oldVal) {
            var selected = $filter('filter')($scope.priorities, {
                _id: $scope.priority.priorityId
            });
            $scope.priority.priorityName = selected.length ? selected[0].name : null;
        }
    });

// Code for user story type drop down
       
    $scope.userStoryType = {
        userStoryTypeId : 0,
        userStoryTypeName : "--choose an option--"
    }    
    $scope.userStoryTypes = [];
    $scope.loadUserStoryTypes = function() {
        return $scope.userStoryType.length ? null : userStoryTypeService.getAllUserStoryTypes().then(function(res){
                $scope.userStoryTypes = res.data; 
        });
    };
    $scope.$watch('userStoryType.userStoryTypeId', function(newVal, oldVal) {
        if (newVal !== oldVal) {
            var selected = $filter('filter')($scope.userStoryTypes, {
                _id: $scope.userStoryType.userStoryTypeId
            });
            $scope.userStoryType.userStoryTypeName = selected.length ? selected[0].name : null;
        }
    });

// Code to add user story in database

	$scope.addNewUserStory = function(){
        var dbStatusId = $scope.newStatusDoc[0]._id;
        var dbPriorityId = $scope.priority.priorityId;
        var dbUserStoryTypeId = $scope.userStoryType.userStoryTypeId;
        var dbUserStoryName = $scope.userStoryName;
        var dbUserStoryDescription = $scope.userStoryDescription;
        var dbProjectId = $scope.hiddenProjectId;
        var dbCreatedBy = $scope.hiddenCurrentUserId;   //John Cena Object ID
        var dbCreatedDate = new Date();
        var dbModifiedDate = new Date();
        
        var userStoryDoc = {
            name            :   dbUserStoryName,
            description     :   dbUserStoryDescription,
            projectId       :   dbProjectId,
            statusId        :   dbStatusId,
            userStoryType   :   dbUserStoryTypeId,
            priority        :   dbPriorityId,
            createdBy       :   dbCreatedBy,
            createdDate     :   dbCreatedDate,
            modifiedDate    :   dbModifiedDate
        }
        
        backlogService.addUserStory(userStoryDoc).then(function(res){
            getAllUserStories();
        });
    }
    
    $scope.deleteUserStory = function(userStoryId){
        console.log("User Story ID is "+userStoryId);
        backlogService.deleteUserStory(userStoryId).then(function(){
            getAllUserStories();            
        });
    }
    
    statusService.getStatusDocByName("Completed", callbackStatusCompleted).then(function(dataFromServer){
        var id= dataFromServer.data[0]._id;
        callbackStatusCompleted(id);
    });
    
    function callbackStatusCompleted(completedStatusId) {
        statusService.getStatusDocByName("Closed", callbackStatusClosed).then(function(dataFromServer){
            var id= dataFromServer.data[0]._id;
            callbackStatusClosed(completedStatusId, id);
        });
    }
    function callbackStatusClosed(completedStatusId, closedStatusId){
        backlogService.getAllUserStoriesExceptCompletedAndClosed(completedStatusId, closedStatusId).then(function(dataFromServer){
           $scope.userStoryList = dataFromServer.data; 
        });
    }
    
    
    function getAllUserStories() {
        statusService.getStatusDocByName("Completed", callbackStatusCompleted).then(function(dataFromServer){
            var id= dataFromServer.data[0]._id;
            callbackStatusCompleted(id);
        });
    }
    
    $scope.editUserStory = function(userStoryId, userStoryDoc){
        console.log("Inside editUserStory function ");
        console.log(userStoryDoc);
        backlogService.editUserStory(userStoryId, userStoryDoc).then(function(){
            getAllUserStories();
        });
    }

});