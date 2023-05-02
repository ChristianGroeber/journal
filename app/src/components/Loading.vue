<template>
  <div :style="'width: ' + loadingWidth + '%'" class="loader"></div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useLoadingStore} from "@/src/store/loading";

export default defineComponent({
  name: "Loading",
  computed: {
    loadingWidth() {
      return useLoadingStore().getEstimatedProgress;
    },
  }
});
</script>
