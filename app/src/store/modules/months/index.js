import axios from 'axios';

const state = {
    entries: [],
    editingEntry: {},
};

const mutations = {
    UPDATE_EDITING_ENTRY(state, payload) {
        state.editingEntry = payload;
    },
    UPDATE_ENTRIES(state, payload) {
        state.entries = payload;
    }
}

const actions = {
    getEntries({
        commit
    }) {
        axios.get('/api/entries')
            .then((response) => {
                commit('UPDATE_ENTRIES', response.data);
            });
    },
    updateEntry({
        commit
    }, payload) {
        commit('UPDATE_EDITING_ENTRY', payload.entry);
        const data = {
            token: payload.token,
            content: payload.entry.raw_content,
            entry: payload.entry.id,
        };
        const queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
        return axios({
            method: 'post',
            url: '/api/edit',
            data: queryString,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    },
    getEntry({
        commit
    }, payload) {
        axios.get('/api/edit?entry=' + payload.entry + '&token=' + payload.token)
            .then((response) => {
                commit('UPDATE_EDITING_ENTRY', response.data);
            });
    }
}

const getters = {
    entries: state => state.entries,
    editingEntry: state => state.editingEntry,
}

const monthsModule = {
    state,
    mutations,
    actions,
    getters,
}

export default monthsModule;