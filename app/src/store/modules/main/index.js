const state = {
    isLoading: false,
    showEditSpecificPopup: false,
};

const mutations = {
    LOADING(state, isLoading) {
        state.isLoading = isLoading;
    },
    EDIT_SPECIFIC_POPUP(state, showEditSpecificPopup) {
        state.showEditSpecificPopup = showEditSpecificPopup;
    },
}

const actions = {}

const getters = {
    loading: state => state.isLoading,
    showEditSpecificPopup: state => state.showEditSpecificPopup,
}

const mainModule = {
    state,
    mutations,
    actions,
    getters,
}

export default mainModule;