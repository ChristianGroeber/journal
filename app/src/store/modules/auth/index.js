import axios from 'axios';

const state = {
    token: null,
};

const mutations = {
    UPDATE_TOKEN(state, payload) {
        localStorage.setItem('token', payload);
        state.token = payload;
    },
}

const actions = {
    login({
        commit
    }, payload) {
        const queryString = Object.keys(payload).map(key => key + '=' + payload[key]).join('&');
        return axios({
            method: 'POST',
            url: '/api/login',
            data: queryString,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).then((response) => {
            commit('UPDATE_TOKEN', response.data.token);
        });
    },
    getToken({commit}) {
       const token = localStorage.getItem('token'); 
       if (token) {
           commit('UPDATE_TOKEN', token);
       }
    },
}

const getters = {
    token: state => state.token,
}

const authModule = {
    state,
    mutations,
    actions,
    getters,
}

export default authModule;