angular.module('appRoutes', ['ui.router']).config(['$stateProvider' ,'$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	 $urlRouterProvider.otherwise("/");
    $stateProvider.state('/', {
      url: "/",
      templateUrl: 'views/login.html',
			controller: 'LoginController'
    })
    .state('project', {
      url: "/project/:emailAddress",
     templateUrl: 'views/project.html',
      controller: 'ProjectController'
    })
    .state('homePage', {
      url: "/homePage/:projectId/:userId/:projectName",
     templateUrl: 'views/homePage.html',
      controller: 'DashboardController'
    })
    .state('homePage.projectSettings', {
      url: "/projectSettings",
     templateUrl: 'views/projectSettings.html',
      controller: 'ProjectSettingsController'
    }).state('homePage.assignProductOwner', {
      url: "/assignProductOwner",
     templateUrl: 'views/assignProductOwner.html',
      controller: 'AssignProductOwnerController'
    })
    .state('homePage.sprintSettings', {
      url: "/sprintSettings",
     templateUrl: 'views/sprintSettings.html',
      controller: 'CreateNewSprintController'
    }).state('homePage.sprintSettings.createNewSprint', {
      url: "/createNewSprint",
     templateUrl: 'views/createNewSprint.html',
      controller: 'CreateNewSprintController'
    }).state('homePage.sprintSettings.viewCurrentSprint', {
      url: "/viewCurrentSprint",
     templateUrl: 'views/viewCurrentSprint.html',
      controller: 'ViewCurrentSprintController'
    }).state('homePage.sprintSettings.sprintHistory', {
      url: "/sprintHistory",
     templateUrl: 'views/sprintHistory.html',
      controller: 'SprintHistoryController'
    }).state('homePage.backlogSettings', {
      url: "/backlogSettings",
     templateUrl: 'views/backlogSettings.html',
      controller: 'BacklogItemsController'
    }).state('homePage.backlogSettings.createNewBacklogItems', {
      url: "/createNewBacklogItems",
     templateUrl: 'views/createNewBacklogItems.html',
      controller: 'BacklogItemsController'
    }).state('homePage.backlogSettings.completedBacklogItems', {
      url: "/completedBacklogItems",
     templateUrl: 'views/completedBacklogItems.html',
      controller: 'CompletedBacklogItemsController'
    }).state('homePage.backlogSettings.closedBacklogItems', {
      url: "/closedBacklogItems",
     templateUrl: 'views/closedBacklogItems.html',
      controller: 'ClosedBacklogItemsController'
    }).state('homePage.dashboard', {
      url: "/dashboard",
     templateUrl: 'views/dashboard.html',
      controller: 'DashboardController'
    }).state('homePage.assignedProjectMembers', {
      url: "/assignedProjectMembers",
     templateUrl: 'views/assignedProjectMembers.html',
      controller: 'AssignedProjectMembersController'
    }).state('login', {
      url: "/login",
     templateUrl: 'views/login.html',
      controller: 'UserController'
    }).state('homePage.userProfile', {
      url: "/userProfile",
     templateUrl: 'views/userProfile.html',
      controller: 'UserController'
    })
    .state('register', {
      url: "/register",
     templateUrl: 'views/register.html',
      controller: 'UserController'
    })
    .state('homePage.taskSettings', {
      url: "/taskSettings",
      templateUrl: 'views/taskSettings.html',
	   controller: 'TaskSettingsController'
    }).state('homePage.chart', {
      url: "/chart",
      templateUrl: 'views/burnDownCharts.html',
	   controller: 'MasterTablesController'
    }).state('homePage.chat', {
      url: "/chat",
      templateUrl: 'views/chat.html',
	   controller: 'ChatController'
    })
    .state('homePage.masterTables', {
      url: "/masterTables",
     templateUrl: 'views/masterTables.html',
	 controller: 'MasterTablesController'
    }).state('homePage.masterTables.priority', {
      url: "/priorityMaster",
     templateUrl: 'views/priorityMaster.html',
	 controller: 'PriorityController'
    }).state('homePage.masterTables.project', {
      url: "/projectMaster",
     templateUrl: 'views/projectMaster.html',
	 controller: 'ProjectController'
    }).state('homePage.masterTables.role', {
      url: "/roleMaster",
     templateUrl: 'views/roleMaster.html',
	 controller: 'RoleController'
    }).state('homePage.masterTables.status', {
      url: "/statusMaster",
     templateUrl: 'views/statusMaster.html',
	 controller: 'StatusController'
    }).state('homePage.masterTables.userStoryType', {
      url: "/userStoryTypeMaster",
     templateUrl: 'views/userStoryTypeMaster.html',
	 controller: 'UserStoryTypeController'
    });

    

}]);