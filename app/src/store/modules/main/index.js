import axios from 'axios';
import {
    queryFormatter
} from '../../../helpers/queryFormatter';

const state = {
    isLoading: false,
    showEditSpecificPopup: false,
    showRaceReportPopup: false,
    pageTitle: 'Loading',
    journalYear: '',
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
    LOADING(state, isLoading) {
        state.isLoading = isLoading;
    },
    EDIT_SPECIFIC_POPUP(state, showEditSpecificPopup) {
        state.showEditSpecificPopup = showEditSpecificPopup;
    },
    EDIT_RACE_REPORT_POPUP(state, showRaceReportPopup) {
        state.showRaceReportPopup = showRaceReportPopup;
    },
    UPDATE_METADATA(state, metaData) {
        state.journalYear = metaData.year;
    }
}

const actions = {
    setTitle({
        commit
    }, title) {
        if (title == state.journalYear || state.journalYear === '') {
            document.title = state.journalYear;
        } else {
            document.title = title + ' · ' + state.journalYear;
        }
        state.pageTitle = title;
    },
    buildCache(asdf, token) {
        return axios.post('/api/admin/build-cache?token=' + token);
    },
    init({commit}, data) {
        axios({
            method: 'POST',
            url: '/api/init',
            data: queryFormatter(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).then((response) => {
            if (response.data.is_token_valid !== 'token_valid') {
                commit('UPDATE_TOKEN', null);
            }
            commit('UPDATE_METADATA', response.data);
        });
    },
}

const getters = {
    loading: state => state.isLoading,
    showEditSpecificPopup: state => state.showEditSpecificPopup,
    showRaceReportPopup: state => state.showRaceReportPopup,
    pageTitle: state => state.pageTitle,
    mediaTypes: state => state.mediaTypes,
}

const mainModule = {
    state,
    mutations,
    actions,
    getters,
}

export default mainModule;