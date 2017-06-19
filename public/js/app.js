angular.module('scrumit', ['ui.router','btford.socket-io','xeditable','ngRoute', 'appRoutes', 'DashboardControllerModule', 
'BacklogItemsControllerModule','TaskSettingsControllerModule', 'MasterTablesControllerModule', 'ProjectControllerModule', 
'StatusControllerModule','RoleControllerModule', 'UserControllerModule', 'PriorityControllerModule', 
'UserStoryTypeControllerModule','LoginControllerModule','ProjectSettingsControllerModule','CreateNewSprintControllerModule',
'ViewCurrentSprintControllerModule', 'SprintHistoryControllerModule', 'AssignedProjectMembersControllerModule',
 'AssignProductOwnerControllerModule', 'ChatControllerModule','CompletedBacklogItemsControllerModule', 'ClosedBacklogItemsControllerModule','MasterTablesServiceModule', 
'ProjectServiceModule','StatusServiceModule','UserServiceModule','RoleServiceModule','PriorityServiceModule', 
'UserStoryTypeServiceModule', 'BacklogServiceModule','LoginServiceModule',
'SprintServiceModule','ChatServiceModule', 'SprintBacklogServiceModule'
]).run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
