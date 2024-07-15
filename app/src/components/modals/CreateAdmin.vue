<template>
    <pm-dialog title="Edit Race Report">
        <el-form>
            <el-form-item label="Admin Username">
                <el-input v-model="adminForm.username"></el-input>
            </el-form-item>
            <el-form-item label="Admin Password">
                <el-input v-model="adminForm.password"></el-input>
            </el-form-item>
            <el-button @click="submit">Submit</el-button>
        </el-form>
    </pm-dialog>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useDialogStore, buildRequest, send} from "pixlcms-wrapper";


export const route = "/auth/create-admin"

export default defineComponent({
    data: function () {
        return {
            adminForm: {
                username: '',
                password: '',
            },
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
                    }
                })
                .catch((reason) => {
                    if (reason.response.status === 400) {
                        alert(reason.response.data.message);
                    }
                });
        },
    },
})
</script>
