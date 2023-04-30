<template>
  <footer>
    <span>
      PixlJournal Version {{ version }}
    </span>
    |
    <span>
      <a @click="showLoginForm">Login</a>
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
  methods: {
    showLoginForm() {
      useMainStore().setShowLoginPopup(true);
    },
  },
  computed: {
    version() {
      useMainStore().getMeta.version;
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