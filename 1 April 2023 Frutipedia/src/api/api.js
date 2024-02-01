import { getUserData, setUserData } from "../utility.js";

export const databaseUrl = `https://testapp-80ad1-default-rtdb.europe-west1.firebasedatabase.app/`;
export const apikey = `AIzaSyA82MRi-DUStsMR7tuHH_TmUeZ01gd9mQ4`;

export const endpoints = {
    LOGIN: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=`,
    REGISTER: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=`,
    FRUITS: `fruits`,
    FRUIT: `fruits/`,
};

export function host(url) {
    let result = databaseUrl + url + '.json';
    const user = getUserData();
    if (user) {
        result += `?auth=${user.idToken}`;
    }
    return result;
}

async function request(url, options) {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error.message);
        }

        //parse if needed
        try {
            const data = await response.json();
            return data;
        } catch (err) {
            return response;
        }
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

function createOptions(method = "get", body) {
    let options = {
        method,
        headers: {}
    };
    if (body) {
        options.body = JSON.stringify({ ...body, returnSecureToken: true });
        options.headers["Content-Type"] = "application/json";
    }
    return options;
}

export async function get(url) {
    return await request(url, createOptions("GET"));
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

export async function login(email, password) {
    const response = await post(endpoints.LOGIN + apikey, {email, password});
    setUserData(response);

    return response;
}

export async function register(email, password) {
    const response = await post(endpoints.REGISTER + apikey, {email, password});
    setUserData(response);

    return response;
}