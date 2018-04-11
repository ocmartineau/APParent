$(document).ready(); {





    $('.sidenav').sidenav();
    $('.parallax').parallax();

    $("#doctorsearchform").hide();
    $('select').formSelect();
    $("#doctorsearchresults").hide();
    $("#eventsearchform").hide();


    $("#doctorbutton").click(function() {
        $("#doctorsearch").hide();
        $("#walmartsearch").hide();
        $("#eventsearch").hide();
        $("#doctorsearchform").show();
    })

    // $("#submitBtn").click(function() {
    //     $("#doctorsearchresults").show();
    // })

    $("#eventbutton").click(function() {
        $("#doctorsearch").hide();
        $("#walmartsearch").hide();
        $("#eventsearch").hide();
        $("#eventsearchform").show();
    })

    $("#return").click(function() {
        $("#doctorsearchform").hide();
        $("#doctorsearchresults").hide();
        $("#walmartsearch").show();
        $("#eventsearch").show();
        $("#doctorsearch").show();
    })
}