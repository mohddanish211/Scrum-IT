angular.module('BacklogServiceModule', []).factory('backlogService', ['$http', function($http) {

    return {
        addUserStory : function(userStoryDoc){
            return $http.post("/addUserStory", {
                params:userStoryDoc
                });
        },
        
        getAllUserStories : function(projectId){
            return $http.post("/getAllUserStories",{
                params : {
                    projectId : projectId
                }
            })
        },
        
        getAllUserStoriesWithNewStatus : function(projectId, statusId){
            return $http.post("/getAllUserStoriesWithNewStatus",{
                params : {
                    projectId : projectId,
                    statusId : statusId
                }
            })
        },
        
        deleteUserStory : function(userStoryId){
            return $http.post("/deleteUserStory",{
                params : {
                    id : userStoryId
                }
            })
        },
        
        editUserStory : function(userStoryId, userStoryDoc){
            return $http.post("/editUserStory",{
                params :{
                    id : userStoryId,
                    doc : userStoryDoc 
                }
            })
        },
        getAllUserStoriesWithCompleteStatus : function(statusId){
            return $http.post("/getAllUserStoriesWithCompleteStatus",{params:
                {
                    statusId : statusId
                }});
        },
      getAllUserStoriesExceptStatus : function(statusId1,statusId2){
            return $http.post("/getAllUserStoriesExceptStatus",{params:
                {
                    statusId1 : statusId1,
                    statusId2 : statusId2
                }});
        },
        
        upadteUserStory : function(id,updatedDoc){
            return $http.post("/updateUserStory",{
                params :{
                    id: id,
                    doc : updatedDoc
                }
            })
        },
        getAllUserStoriesExceptCompletedAndClosed :  function(completedStatusId, closedStatusId){
            return $http.post("/getAllUserStoriesExceptCompletedAndClosed",{
                params : {
                    completedStatusId   :   completedStatusId,
                    closedStatusId      :   closedStatusId
                }});
        }
        
    }

}]);