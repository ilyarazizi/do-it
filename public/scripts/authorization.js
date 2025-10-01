export let accessToken = null;

async function refresh() {

    const res = await fetch("https://do-it-e29m.onrender.com/authorization-refresh", {

        method: "POST",
        credentials: "include"

    });

    const result = await res.json();


    if (result.code === 200) {

        accessToken = result.accessToken;


    } else {

        window.location.replace("https://do-it-e29m.onrender.com/login");
    }
}

export async function auth() {


    const res = await fetch("https://do-it-e29m.onrender.com/authorization", {
    
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken || ""}`
        },

        credentials: "include"

    });

    const result = await res.json();

    if (result.code === 403) {

        await refresh();

    }
}
