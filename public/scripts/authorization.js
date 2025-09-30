export let accessToken = null;

async function refresh() {

    const res = await fetch("http://localhost:3500/authorization-refresh", {

        method: "POST",
        credentials: "include"

    });

    const result = await res.json();


    if (result.code === 200) {

        accessToken = result.accessToken;


    } else {

        window.location.replace("http://localhost:3500/login");
    }
}

export async function auth() {


    const res = await fetch("http://localhost:3500/authorization", {
    
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
