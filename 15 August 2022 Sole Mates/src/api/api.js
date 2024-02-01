async function request(method, url, body = null) {
    try {
        const options = createOptions(method, body);
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error("Status code: " + response.status);
        }

        try {
            const data = await response.json();
            return data;
        } catch (error) {
            return response;
        }

    } catch (err) {
        alert(err.message);
        throw new Error(err.message);
    }
}

function createOptions(method, body) {
    let options = {
        method,
        headers: {}
    };

    if (body) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify({ ...body, returnSecureToken: true });
    }

    return options;
}

export const get = request.bind(null, "GET");
export const post = request.bind(null, "POST");
export const put = request.bind(null, "PUT");
export const del = request.bind(null, "DELETE");