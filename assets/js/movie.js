function getApiInfo() {
    window.localStorage.clear();
    var movieapi = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=w0C3z7bpN0npCBXWAjTsW6UuX1TP8BaL";
    fetch(movieapi)
    .then(response => {
        if(response.ok){
            response.json().then(data => {
                if(data.length !== 0){
                    localStorage.setItem('movieapi', JSON.stringify(data));
                    var res =JSON.parse(localStorage.getItem("movieapi")); 
                    console.log(res);
                }
            })
        }
    });
};

getApiInfo();