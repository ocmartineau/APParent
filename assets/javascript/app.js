$(function() {
    $('.sidenav').sidenav();
    $('.parallax').parallax();

    $("#doctorsearchform").hide();
    $('select').formSelect();
    $("#doctorsearchresults").hide();
    $("#imagesearchform").hide();
    $("#walmartsearchform").hide();


    $("#doctorbutton").click(function() {
        $("#doctorsearch").hide();
        $("#walmartsearch").hide();
        $("#imagesearch").hide();
        $("#doctorsearchform").show();
    })

    // $("#submitBtn").click(function() {
    //     $("#doctorsearchresults").show();
    // })

    $("#imagebutton").click(function() {
        $("#doctorsearch").hide();
        $("#walmartsearch").hide();
        $("#imagesearch").hide();
        $("#imagesearchform").show();
    })

    $("#walmartbutton").click(function() {
        $("#walmartsearchform").show();
        $("#imagesearch").hide();
        $("#doctorsearch").hide();
        $("#walmartsearch").hide();
    })


    $(document).on("click", ".return", function() {
        event.preventDefault();
        $("#doctorsearchform").hide();
        $("#doctorsearchresults").hide();
        $("#walmartsearchform").hide();
        $("#imagesearchform").hide();
        $("#walmartsearch").show();
        $("#imagesearch").show();
        $("#doctorsearch").show();
    })
});