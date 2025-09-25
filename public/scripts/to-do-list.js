const btn = document.querySelectorAll(".check");
const input = document.querySelectorAll(".text-in");
const del = document.querySelectorAll(".delete");
const add = document.querySelector(".add");
const list = document.querySelector(".list");
const item = document.querySelector(".list-item")

list.addEventListener("click", (event) => {

    if (event.target.tagName === "BUTTON") {

        if (event.target.id === "check") {

            if (event.target.nextElementSibling.value) {



                if (event.target.innerHTML === "⭕") {

                    event.target.innerHTML = "✔️";
                    const p = event.target.nextElementSibling;
                    p.classList.add("striked");

                    p.disabled = true;
    
                } else {
                    event.target.innerHTML = "⭕";
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

        i.style.height = i.scrollHeight + "px";
        
    });
}



add.addEventListener("click", () => {
    const clone = item.cloneNode(true);
    clone.querySelector(".check").innerHTML = "⭕";
    clone.querySelector(".text-in").classList.remove("striked");
    clone.querySelector(".text-in").disabled = false;
    clone.querySelector(".text-in").value = "";
    list.appendChild(clone);

});