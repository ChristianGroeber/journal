import xhr from "../../../helpers/xhr";

const state = {
    entries: [],
    editingEntry: {},
    editingGallery: {},
}

const mutations = {
    UPDATE_EDITING_ENTRY(state, payload) {
        state.editingEntry = payload
    },
    UPDATE_ENTRIES(state, payload) {
        state.entries = payload
    },
    UPDATE_EDITING_GALLERY(state, payload) {
        state.editingGallery = payload
    },
}

const actions = {
    getEntries({commit}) {
        const request = xhr.buildRequest('/api/entries');
        return xhr.send(request).then((response) => {
            commit('UPDATE_ENTRIES', response.data);
        });
    },
    updateEntry({commit}, payload) {
        commit('UPDATE_EDITING_ENTRY', payload.entry)
    },
    saveEntry({commit}, token) {
        const data = {
            token: token,
            content: getters.editingEntry(state).raw_content,
            entry: getters.editingEntry(state).id,
        }
        const request = xhr.buildRequest('/api/admin/entry/edit', data, 'POST');

        return xhr.send(request);
    },
    getEntry({commit}, payload) {
        const request = xhr.buildRequest('/api/admin/entry/edit', payload);
        return xhr.send(request).then((response) => {
            commit('UPDATE_EDITING_ENTRY', response.data);
        });
    },
    deleteEntry({commit}, payload) {
        const request = xhr.buildRequest('/api/admin/entry/delete', payload, 'DELETE');
        return xhr.send(request);
    },
    loadMediaForEntry({commit}, payload) {
        const request = xhr.buildRequest('/api/admin/entry/media/load', payload);
        return xhr.send(request).then((response) => {
            commit('UPDATE_EDITING_GALLERY', response.data.media);
        });
    },
    uploadRaceReport({commit}, data) {
        const request = xhr.buildRequest('/api/admin/entry/race-report', data, 'POST');
        return xhr.send(request);
    }
}

const getters = {
    entries: (state) => state.entries,
    editingEntry: (state) => state.editingEntry,
    gallery: (state) => state.editingGallery,
}

const monthsModule = {
    state,
    mutations,
    actions,
    getters,
}

export default monthsModule