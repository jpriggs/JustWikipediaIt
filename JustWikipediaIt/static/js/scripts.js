var randWikiUrl = "https://en.wikipedia.org/wiki/Special:Random";

$(document).ready(function() {
  $(".btn").mouseup(function(){
    $(this).blur();
  });
  $("#lucky-button").on("click", function() {
    window.open(randWikiUrl);
  });
  $("#search-item").keypress(function(event) {
    if (event.which == 13) {
      getWikiSearch($("#search-item").val());
      $("#search-item").val("");
      $(this).blur();
    }
  });
  $("#search-button").on("click", function() {
    getWikiSearch($("#search-item").val());
     $("#search-item").val("");
  });
  $("#results-list").on("click", "li", function() {
    var elementLink = $(this).find("a").attr("href");
    window.open(elementLink);
  });
});
function getWikiSearch(searchStr) {
  var userSearch = String(searchStr).toLowerCase();
  var searchUrlBase = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";

  $("li:has('a')").remove();
  $.ajax({
    url: searchUrlBase + userSearch + "&callback=JSON_CALLBACK",
    type: 'GET',
    dataType: 'jsonp',
    success: function(data) {
      var apiResults = data.query.pages;
      var listItems = [];
      $.each(apiResults, function(value, key) {
        listItems.push('<li class="results-item" id="results-item"><a id="article-url" href=\"https://en.wikipedia.org/?curid=' + key.pageid + '\">' + "<h1 class='article-title' id='article-title'>" + key.title + "</h1><p class='article-extract' id='article-extract'>" + key.extract + "</p></a></li>");
      });
      $.each(listItems, function(value) {
        $("#results-list").hide().append(this).fadeIn(1000);
      });
    }
  });
}
