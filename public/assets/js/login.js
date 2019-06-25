

// new user signup
console.log("login.js working")

$(function() {
    $("#registerNewUser").on("click", function(event) {
        event.preventDefault();
        var newUser = {
            fullName: $("#newname").val().trim(),
            email: $("#newemail").val().trim(),
            username: $("#newusername").val().trim(),
            password: $("#newpassword").val().trim()
        };
        console.log(newUser);
        // Send the POST request
        $.ajax("/api/users", {
            type: "POST",
            data: newUser
        }).then(
            function() {
                console.log("created new user");
                location.reload();
            }
        );
    }),

    $("#returningUser").on("click", function(event) {
        event.preventDefault();
        var returningUser =  {
            username: $("#username").val().trim(),
            password: $("#password").val().trim()
        };
        // console.log(returningUser);
        $.ajax("/api/users_verify", {
            type: "POST",
            data: returningUser
        }).then(
            function(response){
                console.log("verifying");
                window.location = response.redirect
            }
        )
    })
});





