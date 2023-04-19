import axios from "axios";
import {queryFormatter} from "./queryFormatter";
import store from "../store";

async function get(url, data = {}) {
    const request = {
        url: url + queryFormatter(data),
        method: 'GET',
    }

    return await send(request);
}

async function del(url, data) {
    const request = buildPostRequest(url, data, 'DELETE');

    return send(request);
}

async function post(url, data) {
    const request = buildPostRequest(url, data);

    return send(request);
}

function buildRequest(url, data = {}, method = 'GET') {
    method = method.toUpperCase();
    const request = {
        url: url,
        method: method,
    }
    if (method === 'GET') {
        request.url = url + '?' + queryFormatter(data);
    } else {
        if (data instanceof FormData) {
            request.data = data;
        } else {
            request.data = queryFormatter(data);
            request.headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            };
        }
    }

    return request;
}

function send(request) {
    store.dispatch('increaseLoadingCount');
    return axios(request)
        .then((response) => {
            store.dispatch('decreaseLoadingCount');
            return response;
        })
        .catch((reason) => {
            store.dispatch('decreaseLoadingCount');
            return reason;
        });
}

export default {
    buildRequest, send,
};