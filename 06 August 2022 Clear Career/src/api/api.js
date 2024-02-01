import { getUserData, setUserData } from "../utility.js";

const apiKey = 'AIzaSyA82MRi-DUStsMR7tuHH_TmUeZ01gd9mQ4';
const databaseUrl = 'https://testapp-80ad1-default-rtdb.europe-west1.firebasedatabase.app/';

export const endpoints = {
    LOGIN: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=`,
    REGISTER: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=`,
    LOGOUT: `https://identitytoolkit.googleapis.com/v1/accounts:signOut?key=`,
    OFFERS: `offers`
}

export function host(url) {
    let result = databaseUrl + url + '.json';
    const user = getUserData();
    if (user) {
        result += `?auth${user.idToken}`;
    }
    return result;
}

async function request(url, options) {
    try {
        // Send request with appropriate methods, headers and body (if any)
        const response = await fetch(url, options);

        // Handle errors
        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

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

function createOptions(method = 'get', body) {
    const options = {
        method,
        headers: {}
    }

    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify({ ...body, returnSecureToken: true });
    }

    return options;
}

// Decorator function for all REST methods
export async function get(url) {
    return await request(url, createOptions());
}

export async function post(url, data) {
    return await request(url, createOptions('POST', data));
}

export async function put(url, data) {
    return await request(url, createOptions('PUT', data));
}

export async function del(url) {
    return await request(url, createOptions('DELETE'));
}

export async function login(email, password) {
    const result = await post(endpoints.LOGIN + apiKey, { email, password });
    setUserData(result);

    return result;
}

export async function register(email, password) {
    const result = await post(endpoints.REGISTER + apiKey, { email, password });
    setUserData(result);

    return result;
}