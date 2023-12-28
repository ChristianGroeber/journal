<template>
    <pj-dialog title="Admin">
        <div>
            <h3>Auth</h3>
            <el-button v-for="(item, index) in authActions" :index="(index + 1).toString()" :key="index"
                          @click="handleClick(index)">
                {{ item.label }}
            </el-button>
        </div>
    </pj-dialog>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {route as changePasswordRoute} from "@/src/components/auth/ChangePassword.vue";
import {useDialogStore} from "@/src/store/dialog";
import {useAuthStore} from "@/src/store/auth";

export const route = "/settings";

export default defineComponent({
    name: "UserSettings",
    data() {
        return {
            dialogStore: useDialogStore(),
            authStore: useAuthStore(),
            authActions: [
                {
                    label: 'Restore Password',
                    modal: changePasswordRoute,
                },
                {
                    label: 'Destroy Token',
                    func: this.destroyToken,
                },
                {
                    label: 'Logout',
                    func: this.logout,
                }
            ],
        }
    },
    methods: {
        handleClick(itemId: number) {
            const item = this.authActions[itemId];
            if (item.func !== undefined) {
                item.func();
            } else if (item.modal !== undefined) {
                this.dialogStore.showDialog(item.modal);
            } else {
                console.error('I don\'t know what to do with item #' + itemId);
            }
        },
        logout() {
            this.authStore.logout();
            this.close();
        },
        destroyToken() {
            this.authStore.generateNewToken().then(() => {
                this.close();
            });
        },
        close() {
            this.dialogStore.hideDialog(route);
        },
    },
});
</script>