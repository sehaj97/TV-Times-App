var searchInput = $("#article-input");
var searchFormEl = $("#article-form");
var searchNameParam = "";

function getApiInfo(searchInput) {
  window.localStorage.clear();
  fetch("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=Y6O05eGFrocThyWgTXDwGb0TdGjddUZg&q="+ searchInput)
  .then(response => response.json()) 
  .then(data => { 
    localStorage.setItem('articleapi', JSON.stringify(data));
   displayData();
    } 
  )
}

function displayData() {
    
  var responseData = JSON.parse(localStorage.getItem('articleapi'));
  $("#article-list").html("");
  for (var i=0 ; i<responseData.response.docs.length ; i++){
      if(i%5===0){
          var articleRow = $("<div>").addClass("row m-3 d-flex justify-content-center align-items-center");
          $("#article-list").append(articleRow);
      }
      var articleCol= $("<div>").addClass("col-md-3 d-flex flex-column justify-content-center align-items-center bg-dark text-white rounded p-2 m-3").css({"width":"320px", "height":"550px"});
      $(articleRow).append(articleCol);
      var articleHeading = $("<h4>").addClass("font-weight-light").text(responseData.response.docs[i].headline.main);
      $(articleCol).append(articleHeading);
      var test = responseData.response.docs[i].multimedia[0];
      console.log(test)
      if(test !== undefined){
          var articleImage = $("<img>").addClass("img-thumbnail").attr("src", "https://www.nytimes.com/" + test.legacy.xlarge).css({"width":"230px","height":"230px"});
          $(articleCol).append(articleImage);
      }
      var articleSummary = $("<p>").text(responseData.response.docs[i].lead_paragraph).css({"height":"150px","width": "200px", "overflowY":"scroll"});
      $(articleCol).append(articleSummary);
      var articleLink = $("<a>").text("Click To Read More").attr("href", responseData.response.docs[i].web_url);
      $(articleCol).append(articleLink);
    }
  }
  var formSubmitHandler = function(event) {
    
    event.preventDefault();
    event.stopPropagation();
    if(searchInput.val() != ""){
        searchNameParam = searchInput.val();
        getApiInfo(searchNameParam);
        searchInput.val("");
    }
};

searchFormEl.unbind('submit').bind('submit',  formSubmitHandler);
getApiInfo("news");