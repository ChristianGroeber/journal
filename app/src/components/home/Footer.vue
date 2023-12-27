<template>
    <footer>
        <span>PixlJournal Version {{ version }}</span>|
        <span>
            <el-link v-if="!isLoggedIn" @click="showLoginForm">Login</el-link>
            <el-link v-else @click="logout">Logout</el-link>
        </span>|
        <span><a href="https://github.com/ChristianGroeber/journal">GitHub</a></span>|
    </footer>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useMainStore} from "@/src/store/main";
import {useDialogStore} from "@/src/store/dialog";
import {useAuthStore} from "@/src/store/auth";

export default defineComponent({
    name: "Footer",
    data() {
        return {
            mainStore: useMainStore(),
            authStore: useAuthStore(),
        }
    },
    methods: {
        showLoginForm() {
            useDialogStore().showDialog("/auth/login")
        },
        isLoggedIn() {
            return this.authStore.getToken !== null;
        },
        logout() {
            this.authStore.logout();
        },
    },
    computed: {
        version() {
            return this.mainStore.getMeta.journalVersion;
        },
    },
})
</script>