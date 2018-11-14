// create the events
window.onload = (e) => {
    document.querySelector("#searchingTerm").onclick = getDataTerm;
    document.querySelector("#searchingCategory").onclick = getDataCategory
};


let displayTerm = "";

// Gets the Url for a list of Facts with a given term
function getDataTerm() {
    //The URL
    const NORRIS_URL = "https://api.chucknorris.io/jokes/";

    //shortening the url
    let url = NORRIS_URL;

    //get the term to be searched
    let term = document.querySelector('#searchterm').value;
    displayTerm = term;

    //trim the term and encode
    term = term.trim();
    term = encodeURIComponent(term);

    //terminate if no term
    if (term.length < 1) return;

    //add to url
    url += "search?query=" + term;

    //get limit of results
    let limit = document.querySelector("#limit").value;

    //display what you're searching for and a loading bar
    document.querySelector("#content").innerHTML = "<b>Searching for " + displayTerm + "<b> <br>";
    document.querySelector("#content").innerHTML += "<br><img src=\"../images/loading.gif\" alt=\"Loading\">";

    //check url
    console.log(url);

    //test
    console.log(jQuery);
    console.log($); // $ is an alias to the jQuery object

    //send to jsonLoaded
    $.ajax({
        dataType: "json",
        url: url,
        data: null,
        success: jsonLoaded
    });
    //fadeout effect
    $("#content").fadeOut(100);

}

//get a randm fact in a given category
function getDataCategory() {
    //main url
    const NORRIS_URL = "https://api.chucknorris.io/jokes/";

    //shorten url
    let url = NORRIS_URL;

    //get the category
    let term = document.querySelector('#category').value;
    console.log(term);
    displayTerm = term;

    //trim the term
    term = term.trim();
    term = encodeURIComponent(term);

    //add to url
    url += "random?category=" + term;

    //display what you're looking for and a loading bar
    document.querySelector("#content").innerHTML = "<b>Searching for " + displayTerm + "<b>";
    document.querySelector("#content").innerHTML += "<br><img src=\"../images/loading.gif\" alt=\"Loading\">";

    //check url
    console.log(url);

    //test
    console.log(jQuery);
    console.log($); // $ is an alias to the jQuery object

    //send to jsonLoaded
    $.ajax({
        dataType: "json",
        url: url,
        data: null,
        success: jsonLoaded
    });


    $("#content").fadeOut(100);

}

function jsonLoaded(obj) {
    //tests
    console.log("obj = " + obj);
    console.log(obj.total);
    console.log("obj stringified = " + JSON.stringify(obj));

    //create bigString
    let bigString = "";
    //if searching for a term
    if (obj.result && obj.result.constructor == Array) {

        //if there are no results
        if (!obj.total || obj.total == 0) {
            document.querySelector("#content").innerHTML = `<p><i>No results found for '${displayTerm}'</i></p>`;
            $("#content").fadeIn(500);
        }

        //limit results to limit
        let results = obj.result;
        let newCount = obj.total;
        console.log("limit is " + limit.value);
        if (limit.value < newCount) {
            newCount = limit.value;
        }
        
        bigString = "<p><i>Here are " + newCount + " results for '" + displayTerm + "'</i></p>";

        //loop to create divs
        for (let i = 0; i < newCount; i++) {
            let result = results[i];

            //get image
            let smallURL = result.icon_url;
            if (!smallURL) smallURL = "images/no-image-found.png";

            //set url
            let url = result.url;

            //create the div
            var line = `<div class='result'><img src='${smallURL}' <p>'${result.value}'</p></div>`;

            //add to big string
            bigString += line;
        }
    }
    //if searching in categories
    else {
        //get result
        let result = obj.value;

        bigString = "<p><i>Here is a random result for '" + displayTerm + "'</i></p>";

        //get image
        let smallURL = obj.icon_url;
        if (!smallURL) smallURL = "images/no-image-found.png";

        //get url
        let url = result.url;

        //create div
        var line = `<div class='result'><img src='${smallURL}' <p>'${result}'</p></div>`;

        //add to bigString
        bigString += line;
    }

    //display bigString
    document.querySelector("#content").innerHTML = bigString;

    //fade in effect
    $("#content").fadeIn(500);

}