import axios from "axios";
import {queryFormatter} from "./queryFormatter";
import store from "../store";
import LoadingHelper from "./LoadingHelper";

const updateSpeed = 10;

let loadingBarInterval = null;

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

function updateLoadingProgress() {
    store.dispatch('increaseTimePassed', updateSpeed);
    const newProgress = 100 / store.getters.loadingTime * store.getters.timePassed;
    console.log({loadingTime: store.getters.loadingTime, timePassed: store.getters.timePassed, newProgress: newProgress})
    store.dispatch('updateEstimatedProgress', newProgress);
}

// TODO: Get the Loading Bar to work with parallel requests
function send(request) {
    const startTime = new Date();
    store.dispatch('increaseLoadingCount');
    store.dispatch('increaseLoadingTime', LoadingHelper.getAverageLoadingTime(request.url));
    if (loadingBarInterval === null) {
        loadingBarInterval = window.setInterval(updateLoadingProgress, updateSpeed);
    }
    return axios(request)
        .then((response) => {
            store.dispatch('decreaseLoadingCount');
            console.log(store.getters.loadingCount);
            const endTime = new Date();
            const diff = endTime - startTime;
            LoadingHelper.updateAverageLoadingTime(request.url, diff);
            if (store.getters.loadingCount === 0) {
                window.clearInterval(loadingBarInterval);
            }
            return response;
        })
        .catch((reason) => {
            store.dispatch('decreaseLoadingCount');
            if (store.getters.loadingCount === 0) {
                window.clearInterval(loadingBarInterval);
            }
            return reason;
        });
}

export default {
    buildRequest, send,
};