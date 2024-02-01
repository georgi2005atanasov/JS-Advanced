import * as api from "./api.js";
import { setUserData } from "../utility.js";

const get = api.get;
const post = api.post;
const put = api.put;
const del = api.del;

const apiKey = "AIzaSyA82MRi-DUStsMR7tuHH_TmUeZ01gd9mQ4";
const endpoints = {
    LOGIN: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=",
    REGISTER: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=",
};

export async function login(email, password) {
    const response = await post(endpoints.LOGIN + apiKey, { email, password });
    setUserData(response);
    return response;
}

export async function register(email, password) {
    const response = await post(endpoints.REGISTER + apiKey, { email, password });
    setUserData(response);
    return response;
}