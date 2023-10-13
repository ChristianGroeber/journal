import {defineStore} from "pinia";

interface State {
    showingDialog: string | boolean,
}

export const useDialogStore = defineStore('dialog', {
    state: (): State => ({
        showingDialog: false,
    }),
    getters: {
        getShowingDialog: state => state.showingDialog,
    },
    actions: {
        showDialog(route: string) {
            this.showingDialog = route;
        },
        clearShowingDialog() {
            this.showingDialog = false;
        },
    }
});
