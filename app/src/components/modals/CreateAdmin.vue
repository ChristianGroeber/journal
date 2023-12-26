<template>
    <el-dialog v-model="isShowing" title="Edit Race Report">
        <el-form>
            <el-form-item label="Admin Username">
                <el-input v-model="adminForm.username"></el-input>
            </el-form-item>
            <el-form-item label="Admin Password">
                <el-input v-model="adminForm.password"></el-input>
            </el-form-item>
            <el-button @click="submit">Submit</el-button>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import {buildRequest, send} from "@/src/helpers/xhr";
import {useRouter} from "vue-router";
import {defineComponent} from "vue";
import {useDialogStore} from "@/src/store/dialog";


const route = "/auth/create-admin"

export default defineComponent({
    data: function () {
        return {
            adminForm: {
                username: '',
                password: '',
            },
            router: useRouter(),
            dialogStore: useDialogStore(),
        }
    },
    methods: {
        submit() {
            const data = this.adminForm
            const request = buildRequest('/api/auth/create-admin', data, 'POST');
            send(request)
                .then(response => {
                    if (response.data.adminCreated) {
                        this.router.push('/auth/login');
                    }
                })
                .catch((reason) => {
                    if (reason.response.status === 400) {
                        alert(reason.response.data.message);
                    }
                });
        },
    },
    computed: {
        isShowing: {
            get() {
                return this.dialogStore.isDialogShowing(route);
            },
            set() {
                this.dialogStore.hideDialog(route);
            }
        },
    },
})
</script>