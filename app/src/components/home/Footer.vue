<template>
    <footer>
    <span>
      PixlJournal Version {{ version }}
    </span>
        |
        <span>
      <pj-button-link content="Login" :action="showLoginForm"></pj-button-link>
    </span>
        |
        <span>
      <a href="https://github.com/ChristianGroeber/journal">GitHub</a>
    </span>
    </footer>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useMainStore} from "@/src/store/main";

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
    },
    computed: {
        version() {
            return this.mainStore.getMeta.version;
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