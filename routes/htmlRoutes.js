var db = require("../models");
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Asl
      .findAll({group: 'search', limit:3})
      .then(function(dbTop) {
        // into the main index, updating the page
          
          var hbsObject = {
            top: dbTop
          };
          return res.render("index", hbsObject);
      });
  });


//app.get for the Resources/Community Page
  app.get("/community", isAuthenticated,  function(req, res) {
    db.Saved
      .findAll({})
      .then(function(dbSaved) {
        var hbsObject = {
          saved: dbSaved
        };
        return res.render("community", hbsObject);
      });
  });

<<<<<<< HEAD
  //app.get for the Members Page
  app.get("/members", isAuthenticated, function(req, res) {
    db.Asl
      .findAll({group: 'search', limit:3})
      .then(function(dbTop) {
        // into the main index, updating the page
          
          var hbsObject = {
            top: dbTop
          };
          return res.render("members", hbsObject);
      });
=======
  //app.get for the Resources/Community Page
  app.get("/members",  function(req, res) {
    res.render("members");
>>>>>>> master
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
