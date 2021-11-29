import axios from 'axios';

const state = {
    entries: [],
};

const mutations = {
    UPDATE_ENTRIES(state, payload) {
        state.entries = payload;
    }
}

const actions = {
    getEntries({commit}) {
        axios.get('/api/entries')
            .then((response) =>  {
                commit('UPDATE_ENTRIES', response.data);
            });
    }
}

const getters = {
    entries: state => state.entries,
}

const monthsModule = {
    state,
    mutations,
    actions,
    getters,
}

export default monthsModule;