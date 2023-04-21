const state = {
    loadingCount: 0,
    loadingTime: 0,
    timePassed: 0,
    estimatedProgress: 100,
}

const mutations = {
    LOADING_COUNT(state, loadingCount) {
        state.loadingCount = loadingCount;
    },
    LOADING_TIME(state, loadingTime) {
        state.loadingTime = loadingTime;
    },
    TIME_PASSED(state, timePassed) {
        state.timePassed = timePassed;
    },
    ESTIMATED_PROGRESS(state, estimatedProgress) {
        state.estimatedProgress = estimatedProgress;
    },
}

const actions = {
    increaseLoadingCount({commit}) {
        commit('LOADING_COUNT', state.loadingCount + 1);
    },
    decreaseLoadingCount({commit}) {
        commit('LOADING_COUNT', state.loadingCount - 1);
    },
    updateTimePassed({commit}, newTime) {
        commit('TIME_PASSED', newTime);
    },
    increaseTimePassed({commit}, newTime) {
        commit('TIME_PASSED', state.timePassed + newTime);
    },
    increaseLoadingTime({commit}, additionalLoadingTime) {
        commit('LOADING_TIME', state.loadingTime + additionalLoadingTime);
    },
    updateEstimatedProgress({commit}, newEstimatedProgress) {
        commit('ESTIMATED_PROGRESS', newEstimatedProgress);
    }
}

const getters = {
    loadingCount: state => state.loadingCount,
    loadingTime: state => state.loadingTime,
    timePassed: state => state.timePassed,
    estimatedProgress: state => state.estimatedProgress,
}

const loadingModule = {
    state, mutations, actions, getters
}

export default loadingModule;