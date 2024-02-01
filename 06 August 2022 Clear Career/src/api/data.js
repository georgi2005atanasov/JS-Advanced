import * as api from './api.js'
import { getUserData, objectToArray } from '../utility.js';

export async function createOffer(body) {
    let ownerId = getUserData().localId;
    const offerId = await api.post(api.host(api.endpoints.OFFERS), { ...body, ownerId });
    return Object.assign(body, { offerId });
}

export async function getOffers() {
    let offers = await api.get(api.host(api.endpoints.OFFERS));
    if (offers) {
        let result = objectToArray(offers);
        return result;
    } else {
        return [];
    }
}

export async function getOffer(id) {
    let offer = await api.get(api.host(api.endpoints.OFFERS + '/' + id))
    return offer;
}

export async function editOffer(id, offer) {
    let result = await api.put(api.host(api.endpoints.OFFERS + '/' + id), offer);
    return result;
}

export async function deleteOffer(id) {
    await api.del(api.host(api.endpoints.OFFERS + '/' + id + '/'));
    const date = new Date();
    return date;
}

export async function addApplicant(userId, offerId) {
    const offer = await api.get(api.host(api.endpoints.OFFERS + '/' + offerId + '/'));
    const newOffer = { ...offer };
    newOffer.applications.push(userId);
    const changedOffer = await api.put(api.host(api.endpoints.OFFERS + '/' + offerId + '/'), newOffer);

    return changedOffer;
}