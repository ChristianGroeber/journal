import axios from 'axios';

const state = {
    isLoading: false,
    showEditSpecificPopup: false,
    showRaceReportPopup: false,
    pageTitle: '2022',
};

const mutations = {
    LOADING(state, isLoading) {
        state.isLoading = isLoading;
    },
    EDIT_SPECIFIC_POPUP(state, showEditSpecificPopup) {
        state.showEditSpecificPopup = showEditSpecificPopup;
    },
    EDIT_RACE_REPORT_POPUP(state, showRaceReportPopup) {
        state.showRaceReportPopup = showRaceReportPopup;
    },
}

const actions = {
    setTitle({
        commit
    }, title) {
        if (title === '2022') {
            document.title = '2022';
        } else {
            document.title = title + ' · 2022';
        }
        state.pageTitle = title;
    },
    buildCache(asdf, token) {
        return axios.post('/api/admin/build-cache?token=' + token);
    },
}

const getters = {
    loading: state => state.isLoading,
    showEditSpecificPopup: state => state.showEditSpecificPopup,
    showRaceReportPopup: state => state.showRaceReportPopup,
    pageTitle: state => state.pageTitle,
}

const mainModule = {
    state,
    mutations,
    actions,
    getters,
}

export default mainModule;