<template>
  <div class="main-content">
    <AdminBar v-if="canEdit" />
    <div class="month" v-for="month in months" :key="month.id">
      <Month :month="month" />
    </div>
  </div>
</template>

<script>
import Month from "./Month";
import AdminBar from "../admin/AdminBar";
import {resizeVideos} from "../../helpers/videosizer";

export default {
  name: "MonthList",
  components: {
    Month,
    AdminBar,
  },
  created() {
    this.$store.dispatch('setTitle', this.$store.getters.meta.journalYear);
    window.setTimeout(resizeVideos, 100);
  },
  computed: {
    months() {
      return this.$store.getters.entries;
    },
    canEdit() {
      return this.$store.getters.token !== null;
    },
  },
};
</script>
