$(document).ready(function() {
    // Getting references to our form and input
    var signUpForm = $("#signup");
    var emailInput = $("#username");
    var passwordInput = $("#password");
  
    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("click", function(event) {
      event.preventDefault();
      console.log("button clicked "+emailInput.val()+" "+passwordInput.val())
      var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.email || !userData.password) {
        return;
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData.email, userData.password);
      emailInput.val("");
      passwordInput.val("");
    });
  
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(email, password) {
      $.post("/api/signup", {
        email: email,
        password: password
      }).then(function(data) {
        window.location.replace(data);
        // If there's an error, handle it by throwing up a bootstrap alert
      }).catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  });