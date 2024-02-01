export function getUserData() {
    const user = sessionStorage.getItem("auth");
    if (user != "undefined") {
        return JSON.parse(user);
    } else {
        return undefined;
    }
}

export function clearUserData() {
    sessionStorage.removeItem("auth");
}

export function createSubmitHandler(ctx, handler) {
    return function(e) {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));
        handler(ctx, formData, e);
    }
}

export function setUserData(user) {
    sessionStorage.setItem("auth", JSON.stringify(user));
}

export function objectToArray(obj) {
    if (obj) {
        const pets = Object.entries(obj).map(([k,v]) => ({_id: k, ...v}));
        return pets;
    }

    return [];
}