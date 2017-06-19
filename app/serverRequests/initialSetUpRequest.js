/* global mongoose */
module.exports = function(app) {

  /* global ProjectModel */
  var projectModel = require('../database/models/projectSchema');
  var roleModel = require('../database/models/roleSchema');
  var userModel = require('../database/models/userSchema');
  var userProjectRoleModel = require('../database/models/userProjectRoleSchema');
  var statusModel = require('../database/models/statusSchema');
  var priorityModel = require('../database/models/prioritySchema');
  var userStoryTypeModel = require('../database/models/userStoryTypeSchema');

  app.get("/initialSetUp", function(req, res) {

    //Adding super user
    var superUserDoc = {
      firstName: "Team",
      lastName: "November",
      email: "admin@admin.com",
      password: "admin",
      username: "admin"
    }
    userModel.statics.addUser(superUserDoc).then(function(data) {});

    //Adding another user to be assigned a product owner role
    var productOwnerDoc = {
      firstName: "John",
      lastName: "Cena",
      email: "john_cena@admin.com",
      password: "john",
      username: "john"
    }
    userModel.statics.addUser(productOwnerDoc).then(function(data) {});

    //Adding super user and product owner roles
    var roleSuperUserDoc = {
      name: "Super User",
      description: "Super User"
    }
    var roleProductOwnerDoc = {
      name: "Product Owner",
      description: "Product Owner"
    }

    roleModel.statics.addRole(roleSuperUserDoc).then(function(data) {});
    roleModel.statics.addRole(roleProductOwnerDoc).then(function(data) {});

    //Ading Super User Project
    var projectDoc = {
      name: "super_user_project",
      description: "Super User Project for initial set up"
    }
    projectModel.statics.addProject(projectDoc).then(function(data) {});

    //Ading First Project to be used by product owner
    var projectProductOwnerDoc = {
      name: "Scrum Web App",
      description: "Web implementation of scrum"
    }
    projectModel.statics.addProject(projectProductOwnerDoc).then(function(data) {});

    //Adding an entry in userProjectRole Schema
    var superUserProjectId, productOwnerProjectId, superUserRoleId, productOwnerRoleId, superUserId, productOwnerUserId;

    //Add super user in userProjectRole schema
    projectModel.statics.getProject("super_user_project", callbackSuperUserProject).then(function(data) {
      superUserProjectId = data._id;
      callbackSuperUserProject();
    });

    function callbackSuperUserProject() {
      roleModel.statics.getRole("Super User", callbackSuperUserName).then(function(data) {
        superUserRoleId = data._id;
        callbackSuperUserName();
      });
    }

    function callbackSuperUserName() {
      userModel.statics.getUser("admin").then(function(data) {
        superUserId = data._id;
        console.log(data);
        var userProjectRoleSuperUserDoc = {
          projectId: superUserProjectId,
          userId: superUserId,
          roleId: superUserRoleId,
          createdBy: superUserId
        }
        userProjectRoleModel.statics.addUserProjectRole(userProjectRoleSuperUserDoc).then(function(data) {});

      });
    }

    //Add product owner in userProjectRole schema
    projectModel.statics.getProject("Scrum Web App", callbackProductOwnerProject).then(function(data) {
      productOwnerProjectId = data._id;
      callbackProductOwnerProject();
    });

    function callbackProductOwnerProject() {
      roleModel.statics.getRole("Product Owner", callbackProductOwnerUserName).then(function(data) {
        productOwnerRoleId = data._id;
        callbackProductOwnerUserName();
      });
    }

    function callbackProductOwnerUserName() {
      userModel.statics.getUser("john").then(function(data) {
        productOwnerUserId = data._id;
        console.log(data);
        var userProjectRoleProductOwnerDoc = {
          projectId: productOwnerProjectId,
          userId: productOwnerUserId,
          roleId: productOwnerRoleId,
          createdBy: productOwnerUserId
        }
        userProjectRoleModel.statics.addUserProjectRole(userProjectRoleProductOwnerDoc).then(function(data) {});
      });
    }


    //Adding 10 new Users
    for (var i = 0; i < 10; i++) {
      var normalUserDoc = {
        firstName: "John" + i,
        lastName: "Cena" + i,
        email: "user" + i + "@admin.com",
        password: "user" + i,
        username: "user" + i
      }
      userModel.statics.addUser(normalUserDoc).then(function(data) {});
    }


    //status 
    var status = [{
      name: "New",
      description: "New"
    }, {
      name: "In Sprint",
      description: "In Sprint"
    }, {
      name: "In Progress",
      description: "In Progress"
    }, {
      name: "Completed",
      description: "Completed"
    }, {
      name: "Pending",
      description: "Pending"
    }, {
      name: "Closed",
      description: "Closed"
    }, {
      name: "Not Started",
      description: "Not Started"
    }, {
      name: "Ready For Test",
      description: "Ready For Test"
    }, {
      name: "Cancelled",
      description: "Cancelled"
    }];
    //priorities
    var priorities = [{
      name: "Low",
      description: "Low priority"
    }, {
      name: "High",
      description: "High priority"
    }, {
      name: "Medium",
      description: "Medium priority"
    }];
    //user story type
    var userStoryType = [{
      name: "Feature",
      description: "Feature"
    }, {
      name: "Enhancement",
      description: "Enhancement"
    }, {
      name: "Fix",
      description: "Fix"
    }];
    // roles
    var roles = [{
      name: "Developer",
      description: "Developer"
    }, {
      name: "Tester",
      description: "Tester"
    }];
    //Adding status
    for (var i = 0; i < status.length; i++) {
        console.log("***************Status********************");
      statusModel.statics.addStatus(status[i]).then(function(data) {});
    }
    //Adding priorities
    for (var i = 0; i < priorities.length; i++) {
        console.log("***************Priority********************");
      priorityModel.statics.addPriority(priorities[i]).then(function(data) {});
    }
    //Adding user story type
    for (var i = 0; i < userStoryType.length; i++) {
         console.log("***************User Story Type********************");
      userStoryTypeModel.statics.addUserStoryType(userStoryType[i]).then(function(data) {});
    }
    //Adding role
 for (var i = 0; i< roles.length; i++) {
      roleModel.statics.addRole(roles[i]).then(function(data) {});
    }


    res.send("Initial set up complete!!");

  });

}
