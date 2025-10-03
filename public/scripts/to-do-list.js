const btn = document.querySelectorAll(".check");
const input = document.querySelectorAll(".text-in");
const del = document.querySelectorAll(".delete");
const add = document.querySelector(".add");
const list = document.querySelector(".list");
const item = document.querySelector(".list-item")
const save = document.querySelector(".save");
const alert = document.querySelector(".alert");
import {auth} from "./authorization.js";
let accessToken = null;

function setTasks(count, tasks, isDone) {

    for (let i = 0; i < count; i++) {

        const clone = item.cloneNode(true);

        if (isDone[i] === "true") {
            
            clone.querySelector(".check").innerHTML = "✔️";
            clone.querySelector(".text-in").classList.add("striked");
            clone.querySelector(".text-in").disabled = true;

        } else {
            clone.querySelector(".check").innerHTML = "⚪";
            clone.querySelector(".text-in").classList.remove("striked");
            clone.querySelector(".text-in").disabled = false;
        }

        clone.querySelector(".text-in").value = tasks[i];
        list.insertBefore(clone, item);
    
    }

}

let tasks = [];

async function getTasks() {
    
    await auth()
    const imp = await import("./authorization.js");
    accessToken = imp.accessToken;
    const res = await fetch("http://localhost:3500/get-tasks", {

        method: "GET",
        headers: {Authorization: `Bearer ${accessToken || ""}`}
       
    });

    const result = await res.json();

    if (result.code === 403) {
        window.location.replace("http://localhost:3500/login");

    } else if (result.code === 200) {
        setTasks(result.count, result.tasks, result.isDone);

    }

}

getTasks();


save.addEventListener("click", async () => {

    await auth();

    const imp = await import("./authorization.js");
    accessToken = imp.accessToken;

    tasks = [];

    for (let i = 1; i < list.children.length; i++) {

        const value = list.children[i].children[1].value;

        const isDone = list.children[i].children[1].classList.contains("striked");

        tasks.push({
            "userTask": value,
            "isDone": isDone
        });

    }

    const res = await fetch("http://localhost:3500/save-tasks", {

        method: "POST",

        headers: {
        Authorization: `Bearer ${accessToken || ""}`,
        "Content-Type": "application/json"
        },
        
        body: JSON.stringify({"tasks": tasks})

    });

    const result = await res.json();

    if (result.code === 403) {

        window.location.replace("http://localhost:3500/login");

    } else if (result.code === 500) {
        alert.style.visibility = "visible";
        alert.children[0].innerHTML = "server error!";
        alert.children[0].style.color = "red";
        setTimeout(() => {
            alert.classList.add("show");

        }, 2500);

        setTimeout(() => {

            alert.classList.remove("show");
            alert.style.visibility = "hidden";
        }, 3000)



    } else if (result.code === 200) {
        alert.style.visibility = "visible";
        alert.children[0].innerHTML = "tasks saved";
        alert.children[0].style.color = "green";

        setTimeout(() => {
            alert.classList.add("show");

        }, 2500);

        setTimeout(() => {

            alert.classList.remove("show");
            alert.style.visibility = "hidden";
        }, 3000);

        

    }
});

list.addEventListener("click", (event) => {

    if (event.target.tagName === "BUTTON") {

        if (event.target.id === "check") {

            if (event.target.nextElementSibling.value) {



                if (event.target.innerHTML === "⚪") {

                    event.target.innerHTML = "✔️";
                    const p = event.target.nextElementSibling;
                    p.classList.add("striked");

                    p.disabled = true;
    
                } else {
                    event.target.innerHTML = "⚪";
                    const p = event.target.nextElementSibling;
                    p.classList.remove("striked");

                    p.disabled = false;
                }

            }
                
           

        }

        if (event.target.id === "delete") {

            event.target.parentElement.remove();

        }
    }
});



for (let i of input) {

    i.addEventListener("input", () => {

        i.style.height = "auto";
        i.style.height = i.scrollHeight + "px";
        
    });
}

function addTask() {

    const clone = item.cloneNode(true);
    clone.querySelector(".check").innerHTML = "⚪";
    clone.querySelector(".text-in").classList.remove("striked");
    clone.querySelector(".text-in").disabled = false;
    clone.querySelector(".text-in").value = "";
    clone.querySelector(".text-in").style.height = "40px";
    list.appendChild(clone);

}

add.addEventListener("click", () => {
    const clone = item.cloneNode(true);
    clone.querySelector(".check").innerHTML = "⚪";
    clone.querySelector(".text-in").classList.remove("striked");
    clone.querySelector(".text-in").disabled = false;
    clone.querySelector(".text-in").value = "";
    list.appendChild(clone);

});