<template>
  <el-button @click="clicked">{{ content }}</el-button>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useRouter} from "vue-router";

export default defineComponent({
  name: 'PJButtonLink',
  props: ['href', 'action', 'content'],
  data() {
    return {
      router: useRouter(),
    }
  },
  methods: {
    clicked() {
      if (this.href) {
        this.router.push(this.href);
      } else if (this.action) {
        this.action();
      }
    },
  },
})
</script>
