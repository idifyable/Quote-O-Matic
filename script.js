var apiURL = "http://quotesondesign.com/wp-json/posts" + "?filter[orderby]=rand" + "&filter[posts_per_page]=" + "&callback=?";

var currentQuote = "";
var currentName = "";
var nextQuote = "";
var nextName = "";

$(document).ready(function () {
    // Caches first quote
    console.log("ready");
    $.ajax({
        url: apiURL,
        fileType: "jsonp",
        success: function (a) {
            nextQuote = a[0].content;
            nextName = a[0].title;
        },
        cache: false
    });


$('#new-quote').on('click', function getNewQuote() {
    console.log("test");
    $.ajax({
        url: apiURL,
        fileType: "jsonp",
        success: function (a) {
            // Prepare quote change
            currentQuote = nextQuote;
            currentName = nextName;
            // Quote change 
            $("#quote").html(currentQuote);
            $("#name").html(currentName);
            // Caches next quote change
            nextQuote = a[0].content;
            nextName = a[0].title;
            console.log("new = " + nextQuote + "; current = " + currentQuote);
        },
        cache: false
    });
});

$("#share-twitter").on('click', function () {
    var quoteBody = $("#quote").text().trim();
    var quoteAuthor = $("#name").text().trim();
    var tweet = quoteBody + " - " + quoteAuthor;
    tweet = tweet.substring(0, 140 - 3) + "...";
    var twitterShareLink = "https://twitter.com/intent/tweet?text=" + tweet;
    window.open(twitterShareLink);
});
});