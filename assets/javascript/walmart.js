$(function() {
    $("#SearchButton").on("click", function(event) {
        var searchTerm = $("#searchTerm").val().trim();
        var queryURL = "https://api.walmartlabs.com/v1/search?apiKey=tk9cjy8hr64uw5kjt6c2gwew&query=" + searchTerm;
        console.log("hello Walmart buyers")
            // This way we can hit enter on the keyboard and it registers the search
            // (in addition to clicks). Prevents the page from reloading on form submit.
        event.preventDefault();
        if (searchTerm !== "") {
            // empty the region associated with the articles
            console.log(searchTerm);

            // build the query URL for the ajax request to the NYT API


            // make the AJAX request to the API - GETs the JSON data at the queryURL.
            // the data then gets passed as an argument to the updatePage function


            $.ajax({
                url: "https://mighty-river-19291.herokuapp.com/cors",
                data: {
                    url: "http://api.walmartlabs.com/v1/search?apiKey=tk9cjy8hr64uw5kjt6c2gwew&query=" + searchTerm,
                    key: "8b5dcaf7cdfb9c46221d492eec6560c571d6ec218b2485c54075ab7840fa77f9"
                },
                method: "POST"
            }).then(function(response) {
                console.log(response);

                if (response.items.length > 0) {
                    $("#searchResults").empty();
                    for (var i = 0; i < response.items.length; i++) {
                        var img = $("<img>").attr("src", response.items[i].mediumImage)
                        var paragraph = $("<strong></strong>").html(response.items[i].name)
                        var price = $("<h3></h3>").html("$" + response.items[i].salePrice)
                        var itemDescription = $("<p></p>").html(response.items[i].shortDescription)
                        var linkToProduct = $("<span>").html("<a href=" + response.items[i].productUrl + ">Click here to buy</a>");

                        $("#searchResults").append(img).append("<br/>").append(paragraph).append(price).append(itemDescription).append("<br>").append(linkToProduct).append("<br>");
                    }
                }

            });

        } else {
            $("#searchResults").empty();
            $("#searchResults").text("Please write product Name");

        }
    });
})