<template>
    <div class="main-content">
        <pj-navbar :nav="links"></pj-navbar>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useMainStore} from "@/src/store/main";
import {useAuthStore} from "@/src/store/auth";

export default defineComponent({
    data() {
        return {
            links: [
                {
                    label: 'Home',
                    page: '/',
                },
                {
                    label: 'Login',
                    page: '/auth/login',
                },
                {
                    label: 'Restore Password',
                    page: '/auth/restore-password',
                },
                {
                    label: 'Change Password',
                    page: '/auth/change-password',
                },
                {
                    label: 'Generate New Token',
                    page: '/auth/generate-new-token',
                },
                {
                    label: 'Request New Password',
                    page: '/auth/request-new-password',
                },
                {
                    label: 'Logout',
                    func: this.logout,
                }
            ]
        }
    },
    created() {
        useMainStore().setTitle('Auth');
    },
    methods: {
        logout() {
            useAuthStore().logout();
        },
    },
})
</script>