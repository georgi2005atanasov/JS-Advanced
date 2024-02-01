export function getUserData() {
    const user = sessionStorage.getItem("auth");

    if (user) {
        return JSON.parse(user);
    } else {
        return undefined;
    }
}

export function setUserData(user) {
    sessionStorage.setItem("auth", JSON.stringify(user));
}

export function createSubmitHandler(ctx, handler) {
    return function(e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        handler(ctx, data, e);
    }
}

export async function clearUserData() {
    sessionStorage.removeItem("auth");
}

export function objectToArray(data) {
    if (data) {
        return Object.entries(data).map(([k, v]) => ({_id: k, ...v}));
    }
    return [];
}