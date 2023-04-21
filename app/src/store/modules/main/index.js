import xhr from '../../../helpers/xhr';

const state = {
    showEditSpecificPopup: false,
    showRaceReportPopup: false,
    meta: {
        journalYear: '',
        adminCreated: true,
        version: 0,
    },
    pageTitle: 'Loading',
    mediaTypes: [
        {
            'name': 'Video',
            'mime': 'video/*',
        },
        {
            'name': 'Image',
            'mime': 'image/*'
        }
    ],
};

const mutations = {
    EDIT_SPECIFIC_POPUP(state, showEditSpecificPopup) {
        state.showEditSpecificPopup = showEditSpecificPopup;
    },
    EDIT_RACE_REPORT_POPUP(state, showRaceReportPopup) {
        state.showRaceReportPopup = showRaceReportPopup;
    },
    UPDATE_METADATA(state, metaData) {
        state.meta = metaData;
    }
}

const actions = {
    setTitle({
                 commit
             }, title) {
        if (title == state.meta.journalYear || state.meta.journalYear === '') {
            document.title = state.meta.journalYear;
        } else {
            document.title = title + ' · ' + state.meta.journalYear;
        }
        state.pageTitle = title;
    },
    buildCache(asdf, token) {
        const request = xhr.buildRequest('/api/admin/build-cache', {token: token});
        return xhr.send(request);
    },
    init({commit}, data) {
        const request = xhr.buildRequest('/api/init', data, 'POST');
        return xhr.send(request).then((response) => {
            if (response.data.is_token_valid !== 'token_valid') {
                commit('UPDATE_TOKEN', null);
            }
            commit('UPDATE_METADATA', response.data);
        })
    },
}

const getters = {
    showEditSpecificPopup: state => state.showEditSpecificPopup,
    showRaceReportPopup: state => state.showRaceReportPopup,
    pageTitle: state => state.pageTitle,
    mediaTypes: state => state.mediaTypes,
    meta: state => state.meta,
}

const mainModule = {
    state,
    mutations,
    actions,
    getters,
}

export default mainModule;