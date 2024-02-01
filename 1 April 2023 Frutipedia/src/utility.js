export function getUserData() {
    const user = sessionStorage.getItem('user');

    if (user) {
        return JSON.parse(user);
    } else {
        return undefined;
    }
}

export function setUserData(data) {
    sessionStorage.setItem("user", JSON.stringify(data));
}

export function clearUserData() {
    sessionStorage.removeItem("user");
}

export function objectToArray(obj) {
    if (obj) {
        return Object.entries(obj).map(([k, v]) => ({...v, fruitId: k}));
    }

    return [];
}