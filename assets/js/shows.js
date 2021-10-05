
var showsList = $("#show-lists");
var showsRow = "";
var showsCol = "";
var showsCardContainer = "";
var cardImg = "";
var cardHeading = "";
var cardType = "";
function getApiInfo(showName) {
    var showAPI = "https://api.tvmaze.com/search/shows?q=" + showName;
    fetch(showAPI)
	.then(response => {
        if(response.ok){
            response.json().then(data => {
                displayCards(data);
            })
        } else {
            alert("Something is wrong/ show doesn't exist!. Try again with correct input")
        }
    });
};

function displayCards(apiData){
 showsList.html("");
 for(var i=0; i<apiData.length; i++){
    if(i%5 === 0){
        showsRow = $("<div>").addClass("row d-flex justify-content-center align-items-center show-row-"+i);
        showsList.append(showsRow);
    }
    showsCol = $("<div>").addClass("col d-flex justify-content-center align-items-center show-col-"+i);
    $(showsRow).append(showsCol);
    showsCardContainer = $("<div>").addClass("card m-3 text-center").attr("style", "width:18rem");
    $(showsCol).append(showsCardContainer);
    cardImg = $("<img>").attr("src", apiData[i].show.image.medium).addClass("card-img-top");
    cardHeading = $("<h4>").append(apiData[i].show.name);
    cardType = $("<p>").append(apiData[i].show.type);
    $(showsCardContainer).append(cardImg);
    $(showsCardContainer).append(cardHeading);
    $(showsCardContainer).append(cardType);
 }
}

getApiInfo("dragon ball")