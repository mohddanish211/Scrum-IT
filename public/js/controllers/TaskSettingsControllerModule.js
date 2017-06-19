angular.module('TaskSettingsControllerModule', []).controller('TaskSettingsController', 
    function($scope,$filter,userService, sprintBacklogService, statusService, sprintService) {

function loadTaskList(){
    console.log("loadTaskList");
    statusService.getNewStatusDoc(callbackStatusDoc).then(function(data){
        callbackStatusDoc(data._id);
    });
 }

loadTaskList();

function callbackStatusDoc(statusId){
    console.log("callbackStatusDoc");
        statusService.getNewStatusDoc(callBackAfterGettingStatus).then(function(dbResponse){
            var newStatusId = dbResponse.data[0]._id;
            callBackAfterGettingStatus(newStatusId);
        });

    }
    
    function callBackAfterGettingStatus(newStatusId){
        console.log("callBackAfterGettingStatus");

        sprintService.getCurrentSprint($scope.hiddenProjectId, newStatusId, callBackAfterGettingCurrentSprint).then(function(dataFromServer){
            callBackAfterGettingCurrentSprint(dataFromServer.data[0]._id);
            $scope.currentSprintId = dataFromServer.data[0]._id;
        });
    }

function callBackAfterGettingCurrentSprint(currentSprintId) {
    console.log("callBackAfterGettingCurrentSprint");
    sprintService.getAllTasksForCurrentSprint(currentSprintId, callbackLoadTaskList).then(function(dbResponse){
        var taskDocList = [];
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log(dbResponse);
        for(var i=0 ; i<dbResponse.data.length; i++) {
            taskDocList.push(dbResponse.data[i]);
        }
        $scope.tasks = taskDocList;
        callbackLoadTaskList(currentSprintId);
    });    
 }  
  
  
  function callbackLoadTaskList(currentSprintId){
    console.log("callbackLoadTaskList");

    //Load assignees start
    $scope.users = [];
    $scope.loadUsers = function() {
        return $scope.users.length ? null : userService.getSelectedUserNameList($scope.hiddenCurrentUserId, $scope.hiddenProjectId).then(function(dbResponse){
            var userDocList = [];
            console.log("Selected User List");
        console.log(dbResponse);
            for(var i=0 ; i<dbResponse.data.length; i++) {
                userDocList.push(dbResponse.data[i].userId);
            }
            $scope.users = userDocList;
        });
    };

    $scope.showUser = function(task) {
        if(task.assignee._id && $scope.users.length) {
        var selected = $filter('filter')($scope.users, {_id: task.assignee._id});
        return selected.length ? selected[0].username : 'Not set';
        } else {
        return task.assignee.username || 'Not set';
        }
    };
    //Load assignees finish
    
    //Load sprint backlog items start
    $scope.sprintBacklogs = [];
    $scope.loadSprintBacklogs = function() {
        return $scope.sprintBacklogs.length ? null : sprintService.getAllSprintBacklogsForCurrentSprint(currentSprintId).then(function(dbResponse){
            var sprintBacklogDocList = [];
            for(var i=0 ; i<dbResponse.data.length; i++) {
                sprintBacklogDocList.push(dbResponse.data[i]);
            }
            $scope.sprintBacklogs = sprintBacklogDocList;
        });
    };

    $scope.showSprintBacklog = function(task) {
        if(task.sprintBacklogId._id && $scope.sprintBacklogs.length) {
        var selected = $filter('filter')($scope.sprintBacklogs, {_id: task.sprintBacklogId._id});
        return selected.length ? selected[0].name : 'Not set';
        } else {
        return task.sprintBacklogId.name || 'Not set';
        }
    };
    //Load sprint backlog items finish

    //Load statuses start
    $scope.statuses = [];
    $scope.loadStatuses = function() {
        return $scope.statuses.length ? null : statusService.getAllStatus().then(function(dbResponse){
            var statusDocList = [];
            for(var i=0 ; i<dbResponse.data.length; i++) {
                statusDocList.push(dbResponse.data[i]);
            }
            $scope.statuses = statusDocList;
        });
    };

    $scope.showStatus = function(task) {
        if(task.statusId._id && $scope.statuses.length) {
        var selected = $filter('filter')($scope.statuses, {_id: task.statusId._id});
        return selected.length ? selected[0].name : 'Not set';
        } else {
        return task.statusId.name || 'Not set';
        }
    };

    //Load Names
    $scope.showName = function(task) {
        return task.name || 'Not set';
    };

    //Load Description
    $scope.showDescription = function(task) {
        return task.description || 'Not set';
    };
    
    //Load Estimated Effort
    $scope.showEstimatedEffort = function(task) {
        return task.estimatedEffort || 'Not set';
    };
    //Load Actual Effort
    $scope.showActualEffort = function(task) {
        return task.actualEffort || 'Not set';
    };
      
  }
  


  // filter tasks to show
  $scope.filterTask = function(task) {
    return task.isDeleted !== true;
  };

  // mark task as deleted
  $scope.deleteTask = function(id) {
    var filtered = $filter('filter')($scope.tasks, {_id: id});
    if (filtered.length) {
      filtered[0].isDeleted = true;
    }
  };

  // add task
  $scope.addTask = function() {
    $scope.tasks.push({
      id: $scope.tasks.length+1,
      name : null,
      description : null,
      assignee: {
          _id : null,
          username : null
      },
      sprintBacklogId: {
          _id : null,
          name : null
      },
      sprintId : {
          _id : null,
          name : null
      },
      statusId : {
          _id : null,
          name : null
      },
      estimatedEffort : null,
      actualEffort : null,
      isNew: true
    });
  };

  // cancel all changes
  $scope.cancel = function() {
    for (var i = $scope.tasks.length; i--;) {
      var task = $scope.tasks[i];
      // undelete
      if (task.isDeleted) {
        delete task.isDeleted;
      }
      // remove new 
      if (task.isNew) {
        $scope.tasks.splice(i, 1);
      }      
    };
  };

  // save edits
  $scope.saveTable = function() {
    var results = [];
    console.log("All tasks");
    console.log($scope.tasks)
    for (var i = $scope.tasks.length; i--;) {
      var task = $scope.tasks[i];
      // actually delete task
      if (task.isDeleted) {
          console.log("Tasks to be deleted");
          console.log(task);
        $scope.tasks.splice(i, 1);
        sprintService.deleteTask(task._id);
      }
      
      if(task.isNew) {
          //Add this task
          var taskDoc = {
                name : task.name,
                description : task.description,
                assignee : task.assignee._id,
                sprintBacklogId : task.sprintBacklogId._id,
                statusId : task.statusId._id,
                sprintId : $scope.currentSprintId,
                estimatedEffort : task.estimatedEffort,
                actualEffort : task.actualEffort
          }
          console.log("Task to be added");
          console.log(task);
          sprintService.addTask(taskDoc);          
      }
      if(!task.isNew && !task.isDeleted && task._id) {
          //Edit this task
          var taskDocEdit = {
                _id  : task._id,
                name : task.name,
                description : task.description,
                assignee : task.assignee._id,
                sprintBacklogId : task.sprintBacklogId._id,
                sprintId : task.sprintId._id,
                statusId : task.statusId._id,
                estimatedEffort : task.estimatedEffort,
                actualEffort : task.actualEffort
          }
          console.log("Tasks to be Edited");
          console.log(taskDocEdit);
          sprintService.editTask(task._id, taskDocEdit);
      }      
    }//End of for loop
    loadTaskList();
  };

});