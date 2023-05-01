<template>
  <el-menu mode="horizontal">
    <el-menu-item v-for="(item, index) in nav" :index="(index + 1).toString()" :key="index" @click="handleClick(index)">
      {{ item.label }}
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "Navbar",
  props: ['nav'],
  data: function () {
    return {
      router: useRouter(),
    };
  },
  methods: {
    handleClick(itemId: number) {
      const item = this.nav[itemId];
      if (item.func !== undefined) {
        item.func();
      } else if ("page" in item) {
        this.router.push(item.page);
      } else {
        console.error('I don\'t know what to do with item #' + itemId);
      }
    },
  },
})
</script>
