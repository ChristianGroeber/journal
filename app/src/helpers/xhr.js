import axios from "axios";
import {queryFormatter} from "./queryFormatter";
import store from "../store";
import LoadingHelper from "./LoadingHelper";
import app from "../../main";

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

function clearProgressBar() {
    const estimated = store.getters.estimatedProgress;
    if (estimated >= 100) {
        store.dispatch('resetLoadingBar');
        window.clearInterval(loadingBarInterval);
        loadingBarInterval = null;
    } else {
        store.dispatch('updateEstimatedProgress', estimated + 5);
    }
}

function updateLoadingProgress() {
    store.dispatch('increaseTimePassed', updateSpeed);
    const newProgress = 100 / store.getters.loadingTime * store.getters.timePassed;
    store.dispatch('updateEstimatedProgress', newProgress);

    if (store.getters.loadingCount <= 0) {
        window.clearInterval(loadingBarInterval);
        loadingBarInterval = window.setInterval(clearProgressBar, updateSpeed);
    }
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
            const endTime = new Date();
            const diff = endTime - startTime;
            LoadingHelper.updateAverageLoadingTime(request.url, diff);
            return response;
        })
        .catch((reason) => {
            let message = 'Error Sending Request to ' + request.url;
            if ('message' in reason.response.data) {
                 message = reason.response.data.message;
            }
            app.$toast.error(message);
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