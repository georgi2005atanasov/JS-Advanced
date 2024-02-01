import { getUserData } from "../utility.js";

export const databaseUrl = "https://testapp-80ad1-default-rtdb.europe-west1.firebasedatabase.app/";
export const apiKey = "AIzaSyA82MRi-DUStsMR7tuHH_TmUeZ01gd9mQ4"
export const endpoints = {
    LOGIN: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=`,
    REGISTER: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=`,
    MOTORCYCLES: `motorcycles`,
    MOTORCYCLE:`motorcycles/`
}

export function host(url) {
    let result = databaseUrl + url + ".json";

    const user = getUserData();
    if (user) {
        result += `?auth=${user.idToken}`;
    }

    return result;
}

export async function request(url, options) {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Status code: ${response.status}`);
        }

        try {
            const data = await response.json();
            return data;
        } catch (err) {
            return response;
        }

    } catch (err) {
        alert(err.message);
        throw new Error();
    }
}

function createOptions(method="get", body) {
    const options = {
        method,
        headers: {}
    };

    if (body) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body)
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