$(function() {
    $("#SearchButton").on("click", function(event) {
        event.preventDefault();
        var searchTerm = $("#searchTerm").val().trim();

        //if searchTerm is not empty, continue
        if (searchTerm !== "") {

            $.ajax({
                url: "https://mighty-river-19291.herokuapp.com/cors",
                data: {
                    url: "http://api.walmartlabs.com/v1/search?apiKey=tk9cjy8hr64uw5kjt6c2gwew&query=" + searchTerm,
                    key: "8b5dcaf7cdfb9c46221d492eec6560c571d6ec218b2485c54075ab7840fa77f9"
                },
                method: "POST"
            }).then(function(response) {

                console.log(response);
                console.log(URL);

                //if search produces results, then display results
                if (response.numItems > 0) {
                    $("#searchResults").empty();
                    for (var i = 0; i < response.items.length; i++) {
                        var img = $("<img>").attr("src", response.items[i].mediumImage)
                        var paragraph = $("<strong></strong>").html(response.items[i].name)
                        var price = $("<h3></h3>").html("$" + response.items[i].salePrice)
                        var itemDescription = $("<p></p>").html(response.items[i].shortDescription)
                        var linkToProduct = $("<span>").html("<a href=" + response.items[i].productUrl + ">Click here to buy</a>");

                        $("#searchResults").append(img).append("<br/>").append(paragraph).append(price).append(itemDescription).append("<br>").append(linkToProduct).append("<br>");
                    }
                    //else if search produces no results, display "no results found" msg
                } else {
                    $("#searchResults").empty();
                    $("#searchResults").text("No results found");
                }

            });
            //else if search term is left empty, inform user to enter product name in search box
        } else {
            $("#searchResults").empty();
            $("#searchResults").text("Please enter product name");

        }
    });
})