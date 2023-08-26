window.onload = function() {

    // If the user tries to access the profile but user is not logged in
    if (window.location.pathname == "/profile.html" && !localStorage.getItem("accessToken")) {
        window.location.href = 'index.html';
    }

    // If the user tries to access the profile but user is logged in
    if (window.location.pathname == "/index.html" && localStorage.getItem("accessToken")) {
        window.location.href = 'profile.html';
    }

    // If the user is not logged in is trying to sign up
    if (window.location.pathname == "/index.html") {
        const form = document.getElementById("signupForm");
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            let username = document.getElementById('username');
            let email = document.getElementById('email');
            let password = document.getElementById('password');
            let confirmpassword = document.getElementById('confirmpassword');
            console.log(username.value, email.value, password.value, confirmpassword.value);

            let array = new Uint16Array(16);
            console.log("step 1", array);
            window.crypto.getRandomValues(array);
            console.log("step 2", array);
            let accessToken = Array.from(array, b => b.toString(16).padStart(2, "0")).join("");
            // 0 to 255
            console.log("step 3", accessToken);
            let user = {
                username: username.value,
                email: email.value,
                password: password.value,
                confirmpassword: confirmpassword.value,
                accessToken: accessToken
            }

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("accessToken", JSON.stringify(accessToken));

            setTimeout(function() {
                window.location.href = "profile.html";
            }, 1000);
        })
    } else if (window.location.pathname == "/profile.html") {
        let user = JSON.parse(localStorage.getItem("user"));
        let profiletext = `
        <h1 id="card-username">Full Name: ${user.username}</h1><br><br>
        <h1 id="card-email">Email: ${user.email}</h1><br><br>
        <h1 id="card-password">Password: ${user.password}</h1><br><br>`;
        document.getElementById("profile-info").innerHTML = profiletext;


        let logoutbutton = document.getElementById('logout-btn');
        logoutbutton.addEventListener('click', function() {
            localStorage.clear();
            document.getElementById('message').innerText = "logging out";
            setTimeout(function() {
                window.location.href = "index.html";
            }, 2000);
        })
    }
}