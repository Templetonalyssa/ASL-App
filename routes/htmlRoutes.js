var db = require("../models");
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Asl.findAll({}).then(function(dbExamples) {
      res.render("index", {        
      });
    });
  });


//app.get for the Resources/Community Page
  app.get("/community",  function(req, res) {
    res.render("community");
  });

  //app.get for the Resources/Community Page
  app.get("/members",  function(req, res) {
    res.render("members");
  });

  app.get('/logout', function(req, res){
    console.log('logging out');
    req.logout();
    res.redirect('/');
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
