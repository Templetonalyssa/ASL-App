// Get references to page elements
var phraseSearch = $(".phrase-search");
var search = $("#search");


//youtube ajax hopefully of #search submit button
$("#search").on("click", function (event) {
  event.preventDefault();
  var inputText = $("#textInput").val().trim()
  $.ajax({
    url: `https://www.googleapis.com/youtube/v3/search?part=id&key=AIzaSyAMGCYt9mZyJZB-D79iQr1mhAwKknMMdgk&channelId=UC2a61_fpDR-lcZQX342ho2w&q=${inputText}&maxResults=1`,
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
});


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