<template>
  <div class="article">
    <div class="article-head">
      <h3>{{ formattedDate }}</h3>
        <vk-button class="btn btn-icon btn-rounded"><fa icon="ellipsis-vertical"/></vk-button>
        <vk-dropdown>
          <vk-nav-dropdown>
            <vk-nav-item title="Edit" @click="editEntry"></vk-nav-item>
            <vk-nav-item title="Delete" @click="deleteEntry"></vk-nav-item>
          </vk-nav-dropdown>
        </vk-dropdown>
      <div v-if="canEdit">
      </div>
    </div>
    <RaceReport v-if="hasRaceReport" :entry="day"></RaceReport>
    <div class="article-body">
      <p v-html="content"></p>
    </div>
  </div>
</template>

<script lang="ts">
import RaceReport from './RaceReport.vue';
import {defineComponent} from "vue";
import {useRouter} from 'vue-router'
import {useAuthStore} from "@/src/store/auth";
import {useJournalStore} from "@/src/store/journal";

export default defineComponent({
  name: "Day",
  props: ["day"],
  components: {
    RaceReport,
  },
  data() {
    return {
      journalStore: useJournalStore(),
      authStore: useAuthStore(),
      router: useRouter(),
    }
  },
  computed: {
    formattedDate() {
      return this.day.meta.title;
    },
    content() {
      return this.day.content;
    },
    canEdit() {
      return this.authStore.getToken !== null;
    },
    query() {
      const q = { entry: this.day.id };
      return Object.entries(q)
        .map(([key, val]) => `${key}=${val}`)
        .join("&");
    },
    hasRaceReport() {
      return 'raceReport' in this.day.meta;
    },
  },
  methods: {
    deleteEntry() {
      const doDelete = confirm("Are you sure you want to delete this entry");
      if (doDelete) {
        const data = {
          entry: this.day.id,
          token: this.authStore.getToken,
        }
        this.journalStore.deleteEntry(data).then(() => {
          this.journalStore.loadEntries();
        })
      }
    },
    editEntry() {
      this.router.push('/edit?' + this.query);
    },
  },
})
</script>