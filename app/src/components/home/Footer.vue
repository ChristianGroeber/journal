<template>
    <footer>
        <span>PixlJournal Version {{ version }}</span><el-divider direction="vertical"/>
        <span>
            <el-link underline v-if="!isLoggedIn" @click="showLoginForm">Login</el-link>
            <el-link underline v-else @click="logout">Logout</el-link>
        </span><el-divider direction="vertical"/>
        <span><el-link underline target="_blank" href="https://github.com/ChristianGroeber/journal">GitHub</el-link></span>
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
        logout() {
            this.authStore.logout();
        },
    },
    computed: {
        version() {
            return this.mainStore.getMeta.feVersion;
        },
        isLoggedIn() {
            return this.authStore.getToken !== null;
        },
    },
})
</script>