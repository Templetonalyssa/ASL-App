var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {

  // // GET /auth/google
  // //   Use passport.authenticate() as route middleware to authenticate the
  // //   request.  The first step in Google authentication will involve redirecting
  // //   the user to google.com.  After authorization, Google will redirect the user
  // //   back to this application at /auth/google/callback
  // app.get('/auth/google',
  // passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }));

  // // GET /auth/google/callback
  // //   Use passport.authenticate() as route middleware to authenticate the
  // //   request.  If authentication fails, the user will be redirected back to the
  // //   login page.  Otherwise, the primary route function function will be called,
  // //   which, in this example, will redirect the user to the home page.
  // app.get('/auth/google/callback', 
  // passport.authenticate('google', { failureRedirect: '/login' }),
  // function(req, res) {
  //   res.redirect('/');
  // });

  app.post("/api", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Asl.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Asl.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Asl.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
