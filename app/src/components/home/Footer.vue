<template>
    <footer>
        <span>PixlJournal Version {{ version }}</span>|
        <span><el-link @click="showLoginForm">Login</el-link></span>|
        <span><a href="https://github.com/ChristianGroeber/journal">GitHub</a></span>
    </footer>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useMainStore} from "@/src/store/main";
import {useDialogStore} from "@/src/store/dialog";

export default defineComponent({
    name: "Footer",
    data() {
        return {
            mainStore: useMainStore(),
        }
    },
    methods: {
        showLoginForm() {
            useDialogStore().showDialog("/auth/login")
        },
    },
    computed: {
        version() {
            return this.mainStore.getMeta.journalVersion;
        },
    },
})
</script>