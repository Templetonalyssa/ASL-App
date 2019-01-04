$(document).ready(function() {

  var userId = ""
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
      $(".member-name").text(data.email);
      userId = data.id
    });

    $("#save").on("click", function(event) {
      event.preventDefault();
      var search = $("#textInput").val();
      var rating = $("#rateYo").rateYo("option", "rating");
      console.log(search+" "+rating)
      $.post("/api/saved", {
        search: search,
        rating: rating,
        UserId: userId
      }).then(function(data) {
        window.location.replace(data);
        // If there's an error, log the error
      }).catch(function(err) {
        console.log(err);
      });
    });

   $.get("/api/savedlist").then(function(data){
     
     data.data.forEach(element => {       
       if(element.UserId == userId){
         $("#saved-container").append(
          `
            
          <li class="w3-display-container">${element.rating}
              <button onclick="document.getElementById('myModal').style.display='block'"class="savedList w3-cell w3-button" id="${element.search}">${element.search}</button>
              <span id="${element.id}" class="w3-button w3-transparent w3-display-right remove">&times;</span></li>
          </li>  
          `)
       }
        $(".savedList").on("click",function(event){  
          event.preventDefault()  
          var inputText = this.id + " asl"        
          $.ajax({
            url: `https://www.googleapis.com/youtube/v3/search?part=id&key=AIzaSyAMGCYt9mZyJZB-D79iQr1mhAwKknMMdgk&q=${inputText}&maxResults=1`,
            dataType: "json",
            method: "GET"
          }).then(function (response) {
            console.log(inputText)
            console.log(response)
            $("#modalVideo").attr("src", "https://www.youtube.com/embed/" + response.items[0].id.videoId)
          })
          .catch(function(err){
            console.log(err);
          });
              
        });
        $(".remove").on("click", function(event){
          event.preventDefault()
          var id = this.id
          $.ajax({
            method: "DELETE",
            url: "/api/remove/"+id,
          }).done(function(data) {
            console.log(data)
            window.location = "/community"
        })
        })
     });
   });

  
});
