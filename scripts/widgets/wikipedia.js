/***************************************************************************
 * WIKIPEDIA
 ***************************************************************************/

 $(document).ready(function(){
  
  /* Helper function that builds an html element based on search result
     Each element will have the following structure :
     <a href="https://en.wikipedia.org/wiki/..." class="item-link">
       <h2 class="item-title">Title</h2>
     </a>
  */
  function buildResult(title) {
    var link = "https://en.wikipedia.org/wiki/" + title.replace(/\s/g, "_");
    var resultLink = $("<a></a>").addClass("wiki-item-link").attr("href", link).attr("target", "_blank");
    var resultTitle  = $("<h2></h2>").html(title).addClass("wiki-item-title");
    resultLink.append(resultTitle);
    return resultLink;
  }
  
  var results = 5;
  
  /* Main event listener */
  
  $("#wiki-submit").on("click", function(){
    
    // removes previous outputs if they're present
    $("#wiki-output").remove();
    
    // building the search URL for the wikipedia API
    var searchQuery = $("#wiki-search").val();
    var url  = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=";
        url += searchQuery + "&format=json&callback=?";

    // Launching the search and building the output
    $.getJSON(url, function(json){
      var data = json.query.search;
      var output = $("<div id='wiki-output'></div>");
      for (var i = 0 ; i < results ; i++) {
        output.append(buildResult(data[i].title)); 
      }
      
      // The output is bound at once to avoid multiple interactions with the DOM
      $(".wikipedia").append(output);
    });
    
  });
  
  // Pressing "Enter" when the search box is on focus
  // has the same effect that clicking the submit button
  $("#wiki-search").keypress(function(e){
    if(e.keyCode==13) {
      $("#wiki-submit").click();
    }
  });
  
});