import * as api from "./api.js";
import { setUserData, objectToArray } from "../utility.js";

const get = api.get;
const post = api.post;
const put = api.put;
const del = api.del;
const host = api.host;
const databaseUrl = api.databaseUrl;
const apiKey = api.apiKey;
const endpoints = api.endpoints;

export async function login(email, password) {
    const url = endpoints.LOGIN + apiKey;
    const response = await post(url, {
        email,
        password,
        returnSecureToken: true
    });

    setUserData(response);
    return response;
}

export async function register(email, password) {
    const url = endpoints.REGISTER + apiKey;
    const response = await post(url, {
        email,
        password,
        returnSecureToken: true
    });

    setUserData(response);
    return response;
}

export async function createMotorcycle(motorcycle) {
    const url = host(endpoints.MOTORCYCLES);
    const response = await post(url, motorcycle);
    return response;
}

export async function getAllMotorcycles() {
    const url = host(endpoints.MOTORCYCLES);
    const response = await get(url);
    const data = objectToArray(response);
    return data;
}

export async function getMotorcycleById(id) {
    const url = host(endpoints.MOTORCYCLE + id);
    const response = await get(url);
    return {...response, _id: id};
}

export async function editMotorcycleById(motorcycle, motorcycleId) {
    const url = host(endpoints.MOTORCYCLE + motorcycleId);
    const response = await put(url, motorcycle);
    return response;
}

export async function deleteItemById(id) {
    const url = host(endpoints.MOTORCYCLE + id);
    await del(url);
    const date = new Date();
    return date
}

export async function searchMotorcycle(searchModel) {
    const motorcycles = await getAllMotorcycles();
    let searchedMotorcycles = motorcycles
    .filter(m => m.model.toLowerCase().startsWith(searchModel.toLowerCase()));
    return searchedMotorcycles;
}