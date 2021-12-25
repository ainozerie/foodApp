'use strict';

class FetchWrapper {
    constructor(baseURL, headers) {
        this.baseURL = baseURL;
        this.headers = headers;
    }
    get(endpoint) {
        return fetch(this.baseURL + endpoint, this.headers)
            .then(response => response.json());
    }
}

export {FetchWrapper};