const password = document.getElementById("pass-in");

const btn = document.getElementById("pass-btn");

const notif = document.getElementById("notif-p");

btn.addEventListener("click", togglePassword);


function togglePassword() {


    if (password.type === "password") {

        password.type = "text";
        btn.innerText = "🔓";
    
    } else {

        password.type = "password";
        btn.innerText = "🔒";
    }

}

const submit = document.querySelector(".register-container");

submit.addEventListener("submit", async (e) => {
    
    e.preventDefault();

    const res = await fetch("http://localhost:3500/register-new-user", {

        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({

            "fname": document.getElementById("fname-in").value,
            "lname": document.getElementById("lname-in").value,
            "email": document.getElementById("email-in").value,
            "password": document.getElementById("pass-in").value
        })

    });

    const result = await res.json();

    submit.style.minHeight = "450px";

    if (result.code === 200) {

        notif.style.color = "rgb(20, 187, 20)";
        notif.innerHTML = "registered successfully.";
        window.location.replace("http://localhost:3500/home");

    } else if (result.code === 400) {

        notif.style.color = "red";
        notif.innerHTML = "Please fill out all fields";

    } else if (result.code === 409) {

        notif.style.color = "red";
        notif.innerHTML = "user with this email is already existing.";

    } else if (result.code === 500) {
        
        notif.style.color = "red";
        notif.innerHTML = "server error. please try again later";
    }



})