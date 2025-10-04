const password = document.getElementById("pass-in");
let accessToken = null;
const btn = document.getElementById("pass-btn");
const notif = document.getElementById("notif-p");
btn.addEventListener("click", togglePassword);
const loginContainer = document.getElementById("login-container");


function togglePassword() {


    if (password.type === "password") {

        password.type = "text";
        btn.innerText = "🔓";
    
    } else {

        password.type = "password";
        btn.innerText = "🔒";
    }

}

const submit = document.getElementById("form");

submit.addEventListener("submit", async (e) => {

    e.preventDefault();

    const res = await fetch("https://do-it-e29m.onrender.com/login-handle", {

        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "email": document.getElementById("email-in").value,
            "password": password.value
        }),
        
        credentials: "include"

    });

    const result = await res.json();
    loginContainer.style.minHeight = "350px";

    if (result.code === 200) {

        accessToken = result.accessToken;
        notif.style.color = "rgb(20, 187, 20)";

        notif.innerHTML = "loged in succsessfully";
        window.location.replace("https://do-it-e29m.onrender.com/to-do-list");


    } else if (result.code === 400) {
        notif.style.color = "red";

        notif.innerHTML = "email and password are required";
        
    } else if (result.code === 401) {

        notif.style.color = "red";

        notif.innerHTML = "no user with this email or password";
    }



});