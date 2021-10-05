
var showsList = $("#show-lists");
var showsRow = "";
var showsCol = "";
var showsCardContainer = "";
var cardImg = "";
var cardHeading = "";
var cardType = "";
var cardRatings = "";
var learnMore = "";
var replaceValue = "";
var errorModal = new bootstrap.Modal(document.getElementById('showModal'), {
    keyboard: false
  });
function getApiInfo(showName) {
    var showAPI = "https://api.tvmaze.com/search/shows?q=" + showName;
    fetch(showAPI)
	.then(response => {
        if(response.ok){
            response.json().then(data => {
                console.log(data);
                if(data.length !== 0){
                    displayCards(data);
                } else {
                    errorModal.toggle();
                }
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
    showsCardContainer = $("<div>").addClass("card m-3 text-center").attr("style", "width:15rem");
    $(showsCol).append(showsCardContainer);
    replaceValue = apiData[i].show.image.medium;
    if(apiData[i].show.image.medium == null){
        replaceValue = "../images/popcorn.png"
    }
    cardImg = $("<img>").attr("src", replaceValue).addClass("card-img-top");
    cardHeading = $("<h4>").append(apiData[i].show.name);
    cardType = $("<p>").append(apiData[i].show.type + " | " + apiData[i].show.language);
    cardRatings = $("<p>").append(apiData[i].show.rating.average + " stars");
    learnMore = $("<button>").addClass("btn btn-dark").append("Learn More");
    $(showsCardContainer).append(cardImg);
    $(showsCardContainer).append(cardHeading);
    $(showsCardContainer).append(cardType);
    $(showsCardContainer).append(cardRatings);
    $(showsCardContainer).append(learnMore); 
 }
}

getApiInfo("dragon Ball")