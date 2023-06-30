<template>
    <footer>
        <span>PixlJournal Version {{ version }}</span>|
        <span><el-link @click="showLoginForm">Login</el-link></span>|
        <span><a href="https://github.com/ChristianGroeber/journal">GitHub</a></span>|
        <span><el-link @click="switchTheme" :icon="themeIcon"></el-link></span>
    </footer>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useMainStore} from "@/src/store/main";
import {Moon, Sunny} from "@element-plus/icons-vue";

export default defineComponent({
    name: "Footer",
    data() {
        return {
            mainStore: useMainStore(),
        }
    },
    methods: {
        showLoginForm() {
            this.mainStore.setShowLoginPopup(true);
        },
        switchTheme() {
            const selectedTheme = this.mainStore.getTheme;
            const newTheme = selectedTheme === 'dark' ? 'light' : 'dark';

            this.mainStore.setTheme(newTheme);
        }
    },
    computed: {
        version() {
            return this.mainStore.getMeta.journalVersion;
        },
        themeIcon() {
            const selectedTheme = this.mainStore.getTheme;
            if (selectedTheme === 'light') {
                return Sunny;
            } else {
                return Moon;
            }
        },
    },
})
</script>


<style scoped>
footer {
    text-align: center;
    font-size: 0.8rem;
    margin: 1rem auto;
}
</style>