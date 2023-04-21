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
        url: url,
        averageLoadingTime: newLoadingTime,
        loadCount: loadingTimeObject.loadCount + 1,
    };

    console.log(url, newLoadingTimeObject);

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

    if (loadingTimesJSON === undefined || loadingTimesJSON === null) {
        return [];
    }

    return JSON.parse(loadingTimesJSON);
}

function getAverageLoadingTimeForUrl(url, averageLoadingTimes) {
    let result = null;

    for (let i = 0; i < averageLoadingTimes.length; i++) {
        if (averageLoadingTimes[i].url === url) {
            result = averageLoadingTimes[i];
            break;
        }
    }

    if (result) {
        return result;
    }

    return defaultObject;
}

export default {
    updateAverageLoadingTime,
    getAverageLoadingTime,
};