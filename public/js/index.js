// Get references to page elements
var phraseSearch = $(".phrase-search");
var search = $("#search");


// //youtube ajax hopefully of #search submit button
// $("#search").on("click", function (event) {
//   event.preventDefault();
//   $.ajax({
//     url: "https://www.googleapis.com/youtube/v3/channels?key={videokey}&forUsername=UC2a61_fpDR-lcZQX342ho2w=id",
//     dataType: "json",
//     method: "GET"
//   }).then(function (response) {
//     $("#searchResult").attr("src", "http://www.youtube.com/user/" + response.matches)
//     $(".videodiv").attr("data-url", "http://www.youtube.com/user/" + response.matches)
//     console.log(response.matches)
//   });
// });

$(function() {
  $("#search").on("click", function(e) {
    e.preventDefault();
    console.log("button hit");
    var request = gapi.client.youtube.search.list({
      part: "snippet",
      channelID: "UC2a61_fpDR-lcZQX342ho2w",
      type: "video",
      q: encodeURIComponent($("#phrasesearchlabel").val()).replace(/%20/g, "+"),
      maxResults: 3,
    });
    request.execute(function(response) {
      console.log(response);
      console.log("this being hit?");
    })
  })
})

//test api function?
function init(){
  gapi.client.setApiKeY("AIzaSyAMGCYt9mZyJZB-D79iQr1mhAwKknMMdgk");
  gapi.client.load("youtube", "v3", function(){
    //youtube api is ready
  });
}

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);


function upsert(value, condition) {
  return db.Asl
    .findOne({ where: condition })
    .then(function(obj) {
        if(obj) { // update
            return obj.update({ count: sequelize.literal('count + 1') }, { where: {condition} });
        }
        else { // insert
            return db.Asl.create(condition, value);
        }
    
    })
}

upsert({ count: 1 }, { search: $(".search-phrase").val().trim() }).then(function(result){
  res.status(200).send({success: true});
});