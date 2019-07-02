$(document).ready(function () {

    console.log("favorites.js working");

    var savedWorkouts = [

    ];

    var savedWODiv = $('<th scope="col"> ❤' + savedWorkouts + '</th>');


    $("#sunday_btn").on("click", function () {
        $("#sunday_data").append(savedWODiv)
    })


    $("#monday_btn").on("click", function () {
        $("#monday_data").append(savedWODiv)
    })


    $("#tuesday_btn").on("click", function () {
        $("#tuesday_data").append(savedWODiv)
    })

    $("#wednesday_btn").on("click", function () {
        $("#wednesday_data").append(savedWODiv)
    })

    $("#thursday_btn").on("click", function () {
        $("#thursday_data").append(savedWODiv)
    })

    $("#friday_btn").on("click", function () {
        $("#friday_data").append(savedWODiv)
    })

    $("#saturday_btn").on("click", function () {
        $("#saturday_data").append(savedWODiv)
    })

});
