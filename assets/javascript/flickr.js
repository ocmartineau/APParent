$(document).ready(function() {


    $('#submit').on("click", function(evt) {
        //stop browsers normal response to an event, using ajax so we dont want to leave page
        evt.preventDefault();

        var $searchField = $('#search'); //store jquery selection in variable, more efficient

        var $submitButton = $('#submit');

        //lets user know search is in progress
        $searchField.prop("disabled", true);
        $submitButton.attr("disabled", true).val("Searching...");

        var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        var kids = $searchField.val(); //captures text user types
        var flickrOptions = {
            tags: kids,
            format: "json"
        };

        function displayPhotos(data) {
            var photoHTML = '<ul>';

            //ajax call here
            $.each(data.items, function(i, photo) {
                photoHTML += '<li>';
                photoHTML += '<a href="' + photo.link + '" class="image">';
                photoHTML += '<img src="' + photo.media.m + '"></a></li>';
            }); // end each
            photoHTML += '</ul>';
            $('#photos').html(photoHTML);

            //re-enable search input
            $searchField.prop("disabled", false);
            $submitButton.attr("disabled", false).val("Search");
        }
        $.getJSON(flickerAPI, flickrOptions, displayPhotos);

    }); // end click

}); // end ready