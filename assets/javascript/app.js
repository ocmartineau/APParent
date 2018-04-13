$(function() {
    $('.sidenav').sidenav();
    $('.parallax').parallax();

    $("#doctorsearchform").hide();
    $('select').formSelect();
    $("#doctorsearchresults").hide();
    $("#eventssearchform").hide();
    $("#walmartsearchform").hide();


    $("#doctorbutton").click(function() {
        $("#doctorsearch").hide();
        $("#walmartsearch").hide();
        $("#eventssearch").hide();
        $("#doctorsearchform").show();
    })

    // $("#submitBtn").click(function() {
    //     $("#doctorsearchresults").show();
    // })

    $("#eventsbutton").click(function() {
        $("#doctorsearch").hide();
        $("#walmartsearch").hide();
        $("#eventssearch").hide();
        $("#eventssearchform").show();
    })

    $("#walmartbutton").click(function() {
        $("#walmartsearchform").show();
        $("#eventssearch").hide();
        $("#doctorsearch").hide();
        $("#walmartsearch").hide();
    })


    $(document).on("click", ".return", function() {
        event.preventDefault();
        $("#doctorsearchform").hide();
        $("#doctorsearchresults").hide();
        $("#walmartsearchform").hide();
        $("#eventssearchform").hide();
        $("#walmartsearch").show();
        $("#eventssearch").show();
        $("#doctorsearch").show();
    })
});