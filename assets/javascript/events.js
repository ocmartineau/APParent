$("#event-submit").on("click", function() {
    event.preventDefault();
    $("#content").empty();
    var eventLocation = $("#event-location").val().toLowerCase().replace(" ", "+");
    var keyword = $("#event-keyword").val().toLowerCase();
    var key = "7xvLDCCDGL5MnWLF";
    console.log(eventLocation, keyword);
    //AJAX call
    $.ajax({
        url: "https://mighty-river-19291.herokuapp.com/cors",
        data: {
            url: "http://api.eventful.com/json/events/search?&app_key=" + key + "&keywords=" + keyword + "&location=" + eventLocation + "&date=Future",
            key: "8b5dcaf7cdfb9c46221d492eec6560c571d6ec218b2485c54075ab7840fa77f9"
        },
        method: "POST"
    }).then(function(response) {

        console.log(response);

        if (response.events) {
            for (var i = 0; i < response.events.event.length; i++) {
                var eventName = $("<h3>").html(response.events.event[i].title);
                var eventTime = $("<p>").html("<b>Event Date & Time: </b>" + response.events.event[i].start_time);
                var cityName = response.events.event[i].city_name;
                var regionName = response.events.event[i].region_name;
                var eventAddress = $("<p>").html("<b>Venue: </b>" + response.events.event[i].venue_address + ", " + cityName + ", " + regionName);
                var eventDescription = $("<p>").html(response.events.event[i].description);
                var eventLink = $("<a>").attr("href", response.events.event[i].venue_url).text("Click here for more info");
                var eventDiv = $("<div>").attr("class", "eventDiv");

                if (response.events.event[i].image) {
                    var eventImage = $("<img>").attr("src", response.events.event[i].image.medium.url);
                    $(".eventDiv").append(eventName, eventTime, eventImage, eventAddress, eventDescription, eventLink);
                    $("#content").append(eventDiv);

                } else {
                    $(".eventDiv").append(eventName, eventTime, eventAddress, eventDescription, eventLink);
                    $("#content").append(eventDiv);
                }

            }
        } else {
            $("#content").text("No results found");
        }

    });
});