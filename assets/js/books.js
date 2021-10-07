
function getApiInfo() {
    window.localStorage.clear();
    var booksAPI = "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=IlTS3Agt7O38JYk9APKPbG4xUMKPpAza";
    fetch(booksAPI)
    .then(response => {
        if(response.ok){
            response.json().then(data => {
                if(data.length !== 0){
                    localStorage.setItem('booksAPI', JSON.stringify(data));
                   displaydata()
                    
                }
            })
        } 
    });
};


function displaydata(){
    var responsedata = JSON.parse(localStorage.getItem('booksAPI'));
    for ( var l =0; l<responsedata.results.lists.length; l++){
        if(responsedata.results.lists !==null){
            var bookslist = $("#bookslist");
            var booksRow= $("<div>").addClass("row d-flex justify-content-center align-items-center");
            bookslist.append(booksRow);
            for  ( var b =0; b<responsedata.results.lists[l].books.length; b++){
               
                var booksCol= $("<div>").addClass("col d-flex justify-content-center align-items-center");
                var booksCard = $("<div>").addClass("card m-3 text-center").attr("style", "width:16rem");
                
                var test = responsedata.results.lists[l].books[b];
                
                if (test ==null){
                   test= "No book found";
                   return false;
                }
                var cardTitle= $("<h5>").append(test.title);
                test = responsedata.results.lists[l].books[b].book_image;
                if (test ==null){
                    test= "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
                 }
                var cardImg = $("<img>").attr("src",test).addClass("card-img-top");
               var cardLink = $("<a>").attr("href",responsedata.results.lists[l].books[b].amazon_product_url).text("Click to buy").addClass("btn btn-primary");
                booksRow.append(booksCol);
                booksCol.append(booksCard);
                booksCard.append(cardImg);
                booksCard.append(cardTitle);
                booksCard.append(cardLink);
                var bookswriter =$("<p>").text(responsedata.results.lists[l].books[b].contributor);
                booksCard.append(bookswriter);
            }
        } else{
            $("#bookslist").html("No books found")
        }


}}
getApiInfo();
