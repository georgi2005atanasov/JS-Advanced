import { getUserData, objectToArray } from "../utility.js";
import * as api from "./api.js";

const get = api.get;
const post = api.post;
const put = api.put;
const del = api.del;

const databaseUrl = "https://testapp-80ad1-default-rtdb.europe-west1.firebasedatabase.app/";
const endpoints = {
    SHOES: "shoes",
    SHOE: "shoes/",
};

function host(url) {
    let res = databaseUrl + url + '.json';
    const user = getUserData();
    if (user) {
        res += `?auth=${user.idToken}`;
    }
    return res;
}

export async function createShoe(shoe) {
    const url = host(endpoints.SHOES);
    const response = await post(url, shoe);
    return response;
}

export async function getAllShoes() {
    const url = host(endpoints.SHOES);
    const response = await get(url);
    const res = objectToArray(response);
    return res;
}

export async function getShoeById(id) {
    const url = host(endpoints.SHOE + id);
    const response = await get(url);
    return { ...response, _id: id };
}

export async function deleteShoeById(id) {
    const url = host(endpoints.SHOE + id);
    const response = await del(url);
    const date = new Date();
    return date;
}

export async function editShoeById(shoe, shoeId) {
    const url = host(endpoints.SHOE + shoeId);
    const response = await put(url, shoe);
    return response;
}