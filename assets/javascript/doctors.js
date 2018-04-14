$(document).ready(function() {

    $('.modal').modal();
    // J A V A S C R I P T
    $(".selections").on("click", "#submitBtn", function() {
        event.preventDefault();
        var insurance = $("#insuranceMenu").val();
        var state = $("#stateMenu").val().toLowerCase();
        var loc = $("#searchLocation").val().toLowerCase().replace(" ", "-");
        var queryURL = "https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=pediatrician&insurance_uid=" + insurance + "&location=" + state + "-" + loc + "&skip=0&limit=50&user_key=986d188fa4063779e75e3bcfd20f0956";
        console.log(insurance, state, loc);
        //ensures all fields must be filled out before proceeding
        if (insurance !== "00" && state !== "00" && loc !== "") {
            //clears existing table info
            $("#doctorList").empty();

            //AJAX call to get doctor info
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(insurance, state, loc);
                console.log(response);
                console.log(queryURL);
                var results = response.data;
                //if search inputs yield no results, display "No results found" message
                if (results.length > 0) {
                    //creates table header if results are found
                    $("#doctorList").html("<tr><th>Doctor/Group</th><th>Doctor Info</th><th>Address</th><th>Phone Number</th>" + tableContent);
                } else {
                    //displays "No results found" message
                    $("#doctorList").text("No results found.");
                }
                //loop for each group
                for (var i = 0; i < results.length; i++) {
                    var groupName = results[i].practices[0].name;
                    var practiceNumber = results[i].practices.length;
                    //loop for each practice
                    for (var j = 0; j < practiceNumber; j++) {
                        //loop for each phone number & address
                        for (var k = 0; k < results[i].practices[j].phones.length; k++) {
                            var phoneNumber;
                            //pulls only the results tied to the searched location
                            if (results[i].practices[j].location_slug === state + "-" + loc) {
                                var doctorName = results[i].profile.first_name + " " + results[i].profile.last_name + ", " + results[i].profile.title;
                                var doctorImage = results[i].profile.image_url;
                                var doctorBio = results[i].profile.bio;
                                var address = results[i].practices[j].visit_address.street + " " + results[i].practices[j].visit_address.city;
                                //displays only the landline number (not fax number)
                                if (results[i].practices[j].phones[k].type === "landline") {
                                    phoneNumber = results[i].practices[j].phones[k].number;
                                    phoneNumber = results[i].practices[j].phones[k].number.substr(0, 3) + "-" + results[i].practices[j].phones[k].number.substr(3, 3) + "-" + results[i].practices[j].phones[k].number.substr(6, 3);
                                }
                            }
                        }
                    }
                    console.log(doctorName, address, phoneNumber);
                    //creates table content and appends to table header
                    var tableContent = "<tr><td>" + groupName + "</td><br><td>" + doctorName + "<br><img src=" + doctorImage + "><br>" + doctorBio + "</td><td>" + address + "</td><td>" + phoneNumber + "</td></tr>";
                    $("#doctorList").append(tableContent);
                }
            });
        } else {
            $("#doctorList").text("Please make sure all fields are completed.");
        }
    });
});