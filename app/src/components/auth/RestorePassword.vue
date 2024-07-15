<template>
    <pm-dialog title="Restore Password">
        <el-form @submit.prevent="submit">
            <el-form-item label="Username">
                <el-input v-model="username"/>
            </el-form-item>
            <el-form-item label="New Password">
                <el-input v-model="password1" type="password"/>
            </el-form-item>
            <el-form-item label="Repeat New Password">
                <el-input v-model="password2" type="password"/>
            </el-form-item>
            <el-button @click="submit">Submit</el-button>
        </el-form>
    </pm-dialog>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useMainStore} from "@/src/store/main";
import {useAuthStore} from "pixlcms-wrapper";

export const route = "/auth/restore-password";

export default defineComponent({
    data: () => {
        return {
            username: "",
            password1: "",
            password2: "",
        };
    },
    created() {
        useMainStore().setTitle('Restore Password');
    },
    methods: {
        submit() {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const data = {
                username: this.username,
                password1: this.password1,
                password2: this.password2,
                token: urlParams.get('token'),
            }
            useAuthStore().restorePassword(data).then(() => {
            })
        },
    },
})
</script>
