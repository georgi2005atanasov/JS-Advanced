import * as api from "./api.js";
import { objectToArray } from "../utility.js";

export const login = api.login;
export const register = api.register;

export async function addFruit(fruit) {
    let result = await api.post(api.host(api.endpoints.FRUITS), fruit);
    return result;
}

export async function getAllFruits() {
    let response = await api.get(api.host(api.endpoints.FRUITS));
    const result = objectToArray(response);
    return result;
}

export async function getFruitById(id) {
    const url = api.endpoints.FRUIT + id;
    let response = await api.get(api.host(url));
    return response;
}

export async function editFruitById(fruitId, fruit) {
    const url = api.endpoints.FRUIT + fruitId;
    const response = await api.put(api.host(url), fruit);
    return response;
}

export async function deleteFruitById(fruitId) {
    const url = api.endpoints.FRUIT + fruitId;
    await api.del(api.host(url));
    let date = new Date();
    return date;
}