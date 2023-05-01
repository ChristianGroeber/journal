import {defineStore} from "pinia"
import {buildRequest, send} from "../helpers/xhr";

interface State {
    token: string | null,
}

interface ChangePasswordForm {
    username: string,
    currentPassword: string,
    newPassword1: string,
    newPassword2: string,
}

export const useAuthStore = defineStore('authStore', {
    state: (): State => ({
        token: null,
    }),
    getters: {
        getToken: (state) => state.token,
    },
    actions: {
        changePassword(data: object) {
            const request = buildRequest('/api/auth/change-password', data, 'POST');
            return send(request).then((response) => {
                this.token = response.data.token;
            });
        },
        requestNewPassword(data: object) {
            const request = buildRequest('/api/auth/request-new-password', data, 'POST');
            return send(request);
        },
        restorePassword(data: object) {
            const request = buildRequest('/api/auth/restore-password', data, 'POST');
            return send(request).then((response) => {
                this.token = response.data.token;
            });
        },
        generateNewToken(data: object) {
            const request = buildRequest('/api/auth/generate-new-token', data, 'POST');
            return send(request).then(response => {
                this.token = response.data.token;
            });
        },
        login(data: object) {
            const request = buildRequest('/api/login', data, 'POST');
            return send(request).then(response => {
                this.token = response.data.token;
            });
        },
        loadToken() {
            const token = localStorage.getItem('token');
            if (token) {
                this.token = token;
            }
            return token;
        },
        logout() {
            this.token = null;
            localStorage.removeItem('token');
        },
    },
})