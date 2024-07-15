<template>
    <pm-dialog title="Admin">
        <div>
            <h3>Auth</h3>
            <el-button v-for="(item, index) in authActions" :index="(index + 1).toString()" :key="index"
                       @click="handleAuthAction(index)">
                {{ item.label }}
            </el-button>
            <el-divider></el-divider>
            <h3>Admin</h3>
            <el-button v-for="(item, index) in adminActions" :index="(index + 1).toString()" :key="index"
                       @click="handleAdminAction(index)">
                {{ item.label }}
            </el-button>
        </div>
    </pm-dialog>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {route as changePasswordRoute} from "@/src/components/auth/ChangePassword.vue";
import {route as requestNewPasswordRoute} from "@/src/components/auth/RequestNewPassword.vue";
import {route as restoreBackupRoute} from "@/src/components/modals/RestoreBackup.vue";
import {useDialogStore, useAuthStore, buildRequest, send} from "pixlcms-wrapper";
import {useMainStore} from "@/src/store/main";
import {useJournalStore} from "@/src/store/journal";

export const route = "/settings";

export default defineComponent({
    name: "UserSettings",
    data() {
        return {
            dialogStore: useDialogStore(),
            authStore: useAuthStore(),
            journalStore: useJournalStore(),
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
                    label: 'Request New Password',
                    modal: requestNewPasswordRoute,
                },
                {
                    label: 'Logout',
                    func: this.logout,
                }
            ],
            adminActions: [
                {
                    label: "Rebuild Cache",
                    func: this.rebuildCache,
                },
                {
                    label: "Generate Backup",
                    func: this.generateBackup,
                },
                {
                    label: "Restore Backup",
                    modal: restoreBackupRoute,
                },
            ],
        }
    },
    methods: {
        handleAuthAction(itemId: number) {
            const item = this.authActions[itemId];
            if (item.func !== undefined) {
                item.func();
            } else if (item.modal !== undefined) {
                this.dialogStore.showDialog(item.modal);
            } else {
                console.error('I don\'t know what to do with item #' + itemId);
            }
        },
        handleAdminAction(itemId: number) {
            const item = this.adminActions[itemId];
            if (item.func !== undefined) {
                item.func();
            } else if (item.modal !== undefined) {
                this.dialogStore.showDialog(item.modal);
            } else {
                console.error('I don\'t know what to do with item #' + itemId);
            }
        },
        rebuildCache() {
            useMainStore().buildCache().then(() => {
                this.journalStore.loadEntries();
            });
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
        generateBackup() {
            const request = buildRequest('/api/admin/generate-backup')
            send(request).then(response => {
                location.href = response.data.file;
            });
        },
        close() {
            this.dialogStore.hideDialog(route);
        },
    },
});
</script>
