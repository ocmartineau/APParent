$(document).ready(); {
    $('.sidenav').sidenav();
    $('.parallax').parallax();

    $("#doctorsearchform").hide();
    $('select').formSelect();
    $("#doctorsearchresults").hide();


    $("#doctorbutton").click(function() {
        $("#doctorsearch").hide();
        $("#walmartsearch").hide();
        $("#eventsearch").hide();
        $("#doctorsearchform").show();
    })

    $("#submitBtn").click(function() {
        $("#doctorsearchresults").show();
    })
}