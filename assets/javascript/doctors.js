$(document).ready(); {


    $(document).ready(function() {
        $('.modal').modal();
    });

    $(".selections").on("click", "#submitBtn", function() {
        $("#doctorList").empty();

        var insurance = $("#insuranceMenu").val();
        var state = $("#stateMenu").val().toLowerCase();
        var loc = $("#searchLocation").val().replace(" ", "-");
        var queryURL = "https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=pediatrician&location=" + state + "-" + loc + "&skip=0&limit=10&user_key=986d188fa4063779e75e3bcfd20f0956";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(insurance, state, loc);
            console.log(response);
            console.log(queryURL);
            var results = response.data;
            var tableContent;
            var allAddresses = [];


            $("#doctorList").html("<tr><th>Doctor/Group</th><th>Doctor Info</th><th>Address</th><th>Phone Number</th>" + tableContent);


            //loop for each group
            for (var i = 0; i < results.length; i++) {
                var groupName = results[i].practices[0].name;
                var practiceNumber = results[i].practices.length;

                //loop for each practice
                for (var j = 0; j < practiceNumber; j++) {

                    //loop for each phone number & address
                    for (var k = 0; k < results[i].practices[j].phones.length; k++) {
                        var phoneNumber;
                        var address;

                        if (results[i].practices[j].location_slug === state + "-" + loc) {
                            var doctorName = results[i].profile.first_name + " " + results[i].profile.last_name + ", " + results[i].profile.title;
                            var doctorImage = results[i].profile.image_url;
                            var doctorBio = results[i].profile.bio;
                            //displays only the landline number (not fax number)
                            if (results[i].practices[j].phones[k].type === "landline") {
                                phoneNumber = results[i].practices[j].phones[k].number;
                                phoneNumber = results[i].practices[j].phones[k].number.substr(0, 3) + "-" + results[i].practices[j].phones[k].number.substr(3, 3) + "-" + results[i].practices[j].phones[k].number.substr(6, 3);
                            }

                            address = results[i].practices[j].visit_address.street + " " + results[i].practices[j].visit_address.city;
                        }
                    }
                }
                console.log(doctorName, address, allAddresses, phoneNumber);
                var tableContent = "<tr><td>" + groupName + "</td><br><td>" + doctorName + "<br><img src=" + doctorImage + "><br>" + doctorBio + "</td><td>" + address + "</td><td>" + phoneNumber + "</td></tr>";
                $("#doctorList").append(tableContent);
                allAddresses = [];
            }
        });



    });
}