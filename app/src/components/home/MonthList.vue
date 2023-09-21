<template>
  <div class="main-content">
    <AdminBar v-if="canEdit" />
    <div class="months">
      <div class="month" v-for="month in months" :key="month.id">
        <Month :month="month" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Month from "./Month.vue";
import AdminBar from "../admin/AdminBar.vue";
import {resizeVideos} from "../../helpers/videosizer";
import {defineComponent} from "vue";
import {useMainStore} from "@/src/store/main";
import {useJournalStore} from "@/src/store/journal";
import {useAuthStore} from "@/src/store/auth";

export default defineComponent({
  name: "MonthList",
  components: {
    Month,
    AdminBar,
  },
  data() {
    return {
      mainStore: useMainStore(),
      journalStore: useJournalStore(),
      authStore: useAuthStore(),
    }
  },
  created() {
    this.mainStore.setTitle(this.mainStore.getMeta.journalYear.toString());
    window.setTimeout(resizeVideos, 100);
  },
  computed: {
    months() {
      return this.journalStore.getEntries;
    },
    canEdit() {
      return this.authStore.getToken !== null;
    },
  },
})
</script>

<style scoped lang="scss">
.months {
  display: flex;
  gap: 5%;
  margin: 0 5px 0 5px;

  .month {
    display: block;
    width: 80%;
  }
}

@media screen and (min-width: 500px) {

}
</style>
