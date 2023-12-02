import {defineStore} from "pinia";

interface State {
    showingDialogs: string[],
}

export const useDialogStore = defineStore('dialog', {
    state: (): State => ({
        showingDialogs: [],
    }),
    getters: {
        getShowingDialogs: state => state.showingDialogs,
    },
    actions: {
        showDialog(route: string) {
            this.showingDialogs.push(route);
        },
        isDialogShowing(route: string) {
            return this.showingDialogs.includes(route);
        },
        hideDialog(route: string) {
            if (this.showingDialogs.includes(route)) {
                this.showingDialogs.splice(this.showingDialogs.indexOf(route), 1);
            }
        },
    }
});
