module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests

    //All 'Role' related requests
    require('./serverRequests/roleRequests')(app);
    
    //All 'Project' related requests
    require('./serverRequests/projectRequests')(app);
    
    //All 'Priority' related requests
    require('./serverRequests/priorityRequests')(app);

    //All 'Status' related requests
    require('./serverRequests/statusRequests')(app);

    //All 'User' related requests
    require('./serverRequests/userRequests')(app);

    //All 'User Story Type' related requests
    require('./serverRequests/userStoryTypeRequests')(app);
    
    //All 'User Project Role' related requests
    require('./serverRequests/userProjectRoleRequests')(app);

    //Initial set up requests
    require('./serverRequests/initialSetUpRequest')(app);
    
    //User Story requests
    require('./serverRequests/userStoryRequests')(app);
    
    //Sprint requests
    require('./serverRequests/sprintRequests')(app);
    
    //Task requests
    require('./serverRequests/taskRequests')(app);
    
    //Always keep this function at end 
    app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
    
    
};