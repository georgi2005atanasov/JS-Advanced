import { getUserData } from "../utility.js";
import * as api from "./api.js";
import { objectToArray } from "../utility.js";

const get = api.get;
const post = api.post;
const put = api.put;
const del = api.del;
const databaseUrl = api.databaseUrl;

const endpoints = {
    PETS: "pets",
    PET: "pets/"
}

function host(url) {
    let result = databaseUrl + url + ".json";

    const user = getUserData();
    if (user) {
        result += `?auth=${user.localId}`;
    }
    return result;
}

export async function createPet(pet) {
    const url = host(endpoints.PETS);
    const response = await post(url, pet);
    return response;
}

export async function getAllPets() {
    const url = host(endpoints.PETS);
    const response = await get(url);
    const pets = objectToArray(response);
    return pets;
}

export async function getPetById(id) {
    const url = host(endpoints.PET + id);
    const pet = await get(url);
    return {...pet, _id: id};
}

export async function deletePetById(id) {
    const url = host(endpoints.PET + id);
    await del(url);
    let date = new Date();
    return date;
}

export async function addDonation(pet, petId, userId) {
    const url = host(endpoints.PET + petId);
    let newPet = pet;
    newPet.donation.push(userId);
    const response = await put(url, newPet);
    return response;
}

export async function editPetById(newPet) {
    const url = host(endpoints.PET + newPet._id);
    const response = put(url, newPet);
    return response;
}