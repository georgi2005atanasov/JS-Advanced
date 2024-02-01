export const databaseUrl = "https://testapp-80ad1-default-rtdb.europe-west1.firebasedatabase.app/";

async function request(url, options) {

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            if (response.status == "403") {
                clearUserData();
                throw new Error("Your session has expired!");
            }
            const statusCode = response.status;
            throw new Error("Status code: " + statusCode);
        }

        if (response.status == "204") {
            return response;
        } else {
            const data = await response.json();
            return data;
        }
    } catch (err) {
        alert(err.message);
        throw new Error(err.message);
    }
}

function createOptions(method="GET", body) {
    const options = {
        method,
        headers: {}
    };

    if (body) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
    }

    return options;
}

export async function get(url) {
    return await request(url, createOptions());
}

export async function post(url, body) {
    return await request(url, createOptions("POST", body));
}

export async function put(url, body) {
    return await request(url, createOptions("PUT", body));
}

export async function del(url) {
    return await request(url, createOptions("DELETE"));
}