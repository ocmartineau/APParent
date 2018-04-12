$(function() {
    $('.sidenav').sidenav();
    $('.parallax').parallax();

    $("#doctorsearchform").hide();
    $('select').formSelect();
    $("#doctorsearchresults").hide();
    $("#eventsearchform").hide();
    $("#walmartsearchform").hide();


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

    $("#walmartbutton").click(function() {
        $("#walmartsearchform").show();
        $("#eventsearch").hide();
        $("#doctorsearch").hide();
        $("#walmartsearch").hide();
    })


    $("#return").click(function() {
        $("#doctorsearchform").hide();
        $("#doctorsearchresults").hide();
        $("#walmartsearchform").hide();
        $("#walmartsearch").show();
        $("#eventsearch").show();
        $("#doctorsearch").show();
    })
});