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

<script lang="ts" setup>
import {computed} from "vue";
import {useMainStore} from "@/src/store/main";
import {useDialogStore, useAuthStore} from "pixlcms-wrapper";

const mainStore = useMainStore();
const authStore = useAuthStore();
const dialogStore = useDialogStore();

const showLoginForm = function () {
    dialogStore.showDialog("/auth/login");
}

const logout = function () {
    authStore.logout();
}

const version = computed(() => {
    return mainStore.getMeta.feVersion;
});

const isLoggedIn = computed(() => {
    return authStore.getToken !== null;
});
</script>
