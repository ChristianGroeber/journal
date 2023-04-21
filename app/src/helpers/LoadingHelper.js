const defaultTime = 200;
const defaultObject = {
    url: '',
    averageLoadingTime: 0,
    loadCount: 0,
}
const localStorageName = 'loadingTimes';

function updateAverageLoadingTime(url, newTime) {
    const loadingTimeObject = getAverageLoadingTimeObject(url);
    const newLoadingTime = calculateNewAverageLoadingTime(loadingTimeObject, newTime);
    const newLoadingTimeObject = {
        url: loadingTimeObject.url,
        averageLoadingTime: newLoadingTime,
        loadCount: loadingTimeObject.loadCount + 1,
    };

    const newArray = replaceTimeObjectsInArray(loadingTimeObject, newLoadingTimeObject);
    storeAverageLoadingTimes(newArray);

    return newLoadingTimeObject;
}

function getAverageLoadingTime(url) {
    const obj = getAverageLoadingTimeObject(url);

    return obj.averageLoadingTime;
}

function calculateNewAverageLoadingTime(loadingTimeObject, newLoadingTime) {
    return (loadingTimeObject.averageLoadingTime * loadingTimeObject.loadCount + newLoadingTime) / (loadingTimeObject.loadCount + 1)
}

function replaceTimeObjectsInArray(oldObject, newObject) {
    const arr = getAverageLoadingTimes();
    const i = arr.indexOf(oldObject);
    if (i === -1) {
        arr.push(newObject);
    } else {
        arr[i] = newObject;
    }

    return arr;
}

function storeAverageLoadingTimes(averageLoadingTimes) {
    const obj = JSON.stringify(averageLoadingTimes);
    localStorage.setItem(localStorageName, obj);
}

function getAverageLoadingTimeObject(url) {
    const loadingTimes = getAverageLoadingTimes();
    return getAverageLoadingTimeForUrl(loadingTimes, url);
}

function getAverageLoadingTimes() {
    const loadingTimesJSON = localStorage.getItem(localStorageName);

    if (loadingTimesJSON === undefined) {
        return [];
    }

    return JSON.parse(loadingTimesJSON);
}

function getAverageLoadingTimeForUrl(url, averageLoadingTimes) {
    const result = averageLoadingTimes.find(item => item.url === url);

    if (result) {
        return result;
    }

    return defaultObject;
}

export default {
    updateAverageLoadingTime,
    getAverageLoadingTime,
};