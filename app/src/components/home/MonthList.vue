<template>
  <div class="main-content">
    <AdminBar v-if="canEdit" />

    <div>
      <div class="month" v-for="month in months" :key="month.id">
        <Month v-if="isMonthLoaded(month)" :month="month" />
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
      lastLoadedMonth: -1,
      monthsList: [],
    }
  },
  created() {
    this.mainStore.setTitle(this.mainStore.getMeta.journalYear.toString());
    window.setTimeout(resizeVideos, 100);
    this.getScrollHeight();
  },
  computed: {
    months() {
      return this.journalStore.getEntries;
    },
    canEdit() {
      return this.authStore.getToken !== null;
    },
  },
  methods: {
    isMonthLoaded(month: string) {
      console.log(month);
    },
    loadMonth() {
      const monthToLoad = this.months[this.lastLoadedMonth + 1];
      this.journalStore.loadMonth(monthToLoad).then(response => {
        this.lastLoadedMonth += 1;
      });
    },
    getDocumentHeight() {
      const body = document.body,
          html = document.documentElement;

      const height = Math.max( body.scrollHeight, body.offsetHeight,
          html.clientHeight, html.scrollHeight, html.offsetHeight );

      console.log(height);
    },
    getScrollHeight() {
      const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      console.log(scrollTop);
    }
  },
})
</script>
