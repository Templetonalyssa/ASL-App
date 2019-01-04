

//youtube ajax hopefully of #search submit button
$("#search").on("click", function (event) {
  event.preventDefault();
  var inputText = $("#textInput").val().trim() + "asl"
  $.ajax({
    url: `https://www.googleapis.com/youtube/v3/search?part=id&key=AIzaSyAMGCYt9mZyJZB-D79iQr1mhAwKknMMdgk&q=${inputText}&maxResults=1`,
    dataType: "json",
    method: "GET"
  }).then(function (response) {
    console.log(inputText)
    console.log(response)
    $("#ytplayer").attr("src", "https://www.youtube.com/embed/" + response.items[0].id.videoId)
  })
  .catch(function(err){
    console.log(err);
  });
  upsert( 0 ,  inputText );
  
});

function upsert(count, search) {
  $.post("/api/search", {
    search: search,
    count: count
  }).then(function(data) {
    window.location.replace(data);
    // If there's an error, log the error
  }).catch(function(err) {
    console.log(err);
  });
}

$(".topSearch").on("click",function(event){
  event.preventDefault();
  var inputText = this.id + "asl"
  $.ajax({
    url: `https://www.googleapis.com/youtube/v3/search?part=id&key=AIzaSyAMGCYt9mZyJZB-D79iQr1mhAwKknMMdgk&q=${inputText}&maxResults=1`,
    dataType: "json",
    method: "GET"
  }).then(function (response) {
    console.log(inputText)
    console.log(response)
    $("#ytplayer").attr("src", "https://www.youtube.com/embed/" + response.items[0].id.videoId)
  })
  .catch(function(err){
    console.log(err);
  });
  upsert( 0 ,  inputText );
  
});


