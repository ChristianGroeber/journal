import axios from "axios";
import {queryFormatter} from "./queryFormatter";
import store from "../store";
import LoadingHelper from "./LoadingHelper";

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
    const startTime = new Date();
    store.dispatch('increaseLoadingCount');
    return axios(request)
        .then((response) => {
            store.dispatch('decreaseLoadingCount');
            const endTime = new Date();
            const diff = endTime - startTime;
            console.log(diff);
            LoadingHelper.updateAverageLoadingTime(request.url, diff);
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