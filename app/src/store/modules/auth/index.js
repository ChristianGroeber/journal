import xhr from "../../../helpers/xhr";

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
    changePassword({commit}, payload) {
        const request = xhr.buildRequest('/api/auth/change-password', payload, 'POST');
        return xhr.send(request).then((response) => {
            commit('UPDATE_TOKEN', response.data.token);
        });
    },
    requestNewPassword({commit}, payload) {
        const request = xhr.buildRequest('/api/auth/request-new-password', payload, 'POST');
        return xhr.send(request);
    },
    restorePassword({commit}, payload) {
        const request = xhr.buildRequest('/api/auth/restore-password', payload, 'POST');
        return xhr.send(request).then((response) => {
            commit('UPDATE_TOKEN', response.data.token);
        });
    },
    generateNewToken({commit}, payload) {
        const request = xhr.buildRequest('/api/auth/generate-new-token', payload, 'POST');
        return xhr.send(request).then(response => {
            commit('UPDATE_TOKEN', response.data.token);
        });
    },
    register({commit}, payload) {
        const request = xhr.buildRequest('/api/auth/register', payload, 'POST');
        return xhr.send(request).then(response => {
            commit('UPDATE_TOKEN', response.data.token);
        })
    },
    login({commit}, payload) {
        const request = xhr.buildRequest('/api/login', payload, 'POST');
        return xhr.send(request).then(response =>  {
            commit('UPDATE_TOKEN', response.data.token);
        });
    },
    getToken({commit}) {
        const token = localStorage.getItem('token');
        if (token) {
            commit('UPDATE_TOKEN', token);
        }
        return token;
    },
    logout({commit}) {
        commit('UPDATE_TOKEN', null);
        localStorage.removeItem('token');
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