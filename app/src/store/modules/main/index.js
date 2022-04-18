const state = {
    isLoading: false,
};

const mutations = {
    LOADING(state, isLoading) {
        state.isLoading = isLoading;
    },
}

const actions = {}

const getters = {
    loading: state => state.isLoading,
}

const mainModule = {
    state,
    mutations,
    actions,
    getters,
}

export default mainModule;