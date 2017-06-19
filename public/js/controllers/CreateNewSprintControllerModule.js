angular.module('CreateNewSprintControllerModule', []).controller('CreateNewSprintController', 
    function($scope, backlogService, sprintService, statusService, sprintBacklogService) {
    
    $scope.sprintStartDate = new Date();
    $scope.sprintEndDate = new Date();

    $scope.sprintBacklog = {
        userStory: []
    }; 

    //Function to load all user stories (product backlog items)
    function loadUserStories(){
        statusService.getNewStatusDoc(callBackAfterGettingStatus).then(function(dbResponse){
            var newStatusId = dbResponse.data[0]._id;
            console.log("##################"+newStatusId);
            backlogService.getAllUserStoriesWithNewStatus($scope.hiddenProjectId, newStatusId).then(function(res){
                $scope.userStories =  res.data;
            });
        });
    }
    
    loadUserStories();

    $scope.showUserStory = function() {
        var selected = [];
        angular.forEach($scope.userStories, function(s) { 
            if ($scope.sprintBacklog.userStory.indexOf(s._id) >= 0) {
                selected.push(s.name);
            }
        });
        return selected.length ? selected.join(', ') : 'Not set';
    };
    
    $scope.createNewSprint = function() {
        statusService.getNewStatusDoc(callBackAfterGettingStatus).then(function(dbResponse){
            var newStatusId = dbResponse.data[0]._id;
            console.log(newStatusId);
            callBackAfterGettingStatus(newStatusId);
        });
    }
    
    function callBackAfterGettingStatus(newStatusId) {
        console.log("Inside call")
            sprintService.checkSprintAlreadyRunning($scope.hiddenProjectId, newStatusId).then(function(dbResponse){
                console.log("Check status");
                console.log(dbResponse);
                var sprintRunning = dbResponse.data.length;
                if(sprintRunning > 0) {
                    //Sprint Already Running
                    $scope.sprintRunningError = "Create New Sprint Error :: Sprint already running for current project!!"
                    $scope.sprintRunningSuccess = "";
                } else {
                    //Create new sprint
                    var sprintDoc = {
                        name : $scope.sprintName,
                        description : $scope.sprintDescription,
                        projectId : $scope.hiddenProjectId,
                        createdBy : $scope.hiddenCurrentUserId,
                        statusId : newStatusId,
                        startDate : $scope.sprintStartDate,
                        endDate : $scope.sprintEndDate,
                        estimatedEffort : $scope.estimatedEffort,
                        actualEffort : 0
                    };
                    sprintService.addSprint(sprintDoc).then(function(dbResponse){
                        console.log("###########Sprint Backlog  Sprint Doc##############");
                        var sprintId = dbResponse.data._id;
                        var sprintBacklogArray = $scope.sprintBacklog.userStory;
                        var userStoriesArray = $scope.userStories;
                        var selectedUserStoriesArray = [];
                        for(var i=0; i< userStoriesArray.length;i++){
                            console.log(userStoriesArray[i]);
                            for(var j=0; j<sprintBacklogArray.length; j++){
                                console.log(sprintBacklogArray[j]);
                                if(sprintBacklogArray[j] == userStoriesArray[i]._id){
                                    selectedUserStoriesArray.push(userStoriesArray[i]);
                                }
                            }
                        }
                        addSprintBacklogFinal(selectedUserStoriesArray, sprintId, newStatusId);
                        statusService.getStatusDocByName("In Sprint").then(function(dataFromServer){
                            console.log("######### INNNNNN SPRINT RESPONSE ###########");
                            console.log(dataFromServer);
                            for(var i = 0; i<selectedUserStoriesArray.length;i++){
                                selectedUserStoriesArray[i].statusId = dataFromServer.data[0]._id;
                                backlogService.editUserStory(selectedUserStoriesArray[i]._id, selectedUserStoriesArray[i]).then(function(data){});
                            }
                            $scope.sprintRunningSuccess = "New Sprint created successfully!!";
                            $scope.sprintRunningError = "";
                        });
                    });
                }
            });        
    }
    
    function addSprintBacklogFinal(selectedUserStoriesArrayFinal, sprintId, newStatusId){
        for(var i=0; i<selectedUserStoriesArrayFinal.length; i++) {
            var sprintBacklogDoc = {
                name            :   selectedUserStoriesArrayFinal[i].name,
                userStoryId     :   selectedUserStoriesArrayFinal[i]._id,
                sprintId        :   sprintId,
                statusId        :   newStatusId,
                estimatedEffort :   0,
                actualEffort    :   0
            };
            //Creating Sprint Backlog with selected Product backlog items
            sprintBacklogService.addSprintBacklog(sprintBacklogDoc).then(function(data){});            
            }
    }
});