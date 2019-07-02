$(document).ready(function(){
    console.log("explore.js ready");

    $(".premadeWOs").on("click", function() {
        $(this).attr({href: "/premadeWO/" + $(this).attr('id')});
    });
});