var db = require("../models");
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Asl.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/members", isAuthenticated, function(req, res) {
    res.render("members");
  });

  // Load example page and pass in an example by id
  app.get("/members/:id?", function(req, res) {
    db.Asl.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("members", {
        example: dbExample
      });
    });
  });

//app.get for the Resources/Community Page
  app.get("/community",  function(req,res) {
    res.render("community");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
