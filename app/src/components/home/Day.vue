<template>
  <div class="article">
    <div class="article-head">
      <h3>{{ formattedDate }}</h3>
      <div v-if="canEdit">
        <vk-button class="btn btn-icon btn-rounded"><fa icon="ellipsis-vertical"/></vk-button>
        <vk-dropdown>
          <vk-nav-dropdown>
            <vk-nav-item title="Edit" @click="editEntry"></vk-nav-item>
            <vk-nav-item title="Delete" @click="deleteEntry"></vk-nav-item>
          </vk-nav-dropdown>
        </vk-dropdown>
      </div>
    </div>
    <RaceReport v-if="hasRaceReport" :entry="day"></RaceReport>
    <div class="article-body">
      <p v-html="content"></p>
    </div>
  </div>
</template>

<script>
import RaceReport from './RaceReport';

export default {
  name: "Day",
  props: ["day"],
  components: {
    RaceReport,
  },
  computed: {
    formattedDate() {
      return this.day.meta.title;
    },
    content() {
      return this.day.content;
    },
    canEdit() {
      return this.$store.getters.token !== null;
    },
    query() {
      const q = { entry: this.day.id };
      let query = Object.entries(q)
        .map(([key, val]) => `${key}=${val}`)
        .join("&");
      return query;
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
          token: this.$store.getters.token,
        }
        this.$store.dispatch("deleteEntry", data).then((response) => {
          this.$store.dispatch("getEntries");
        });
      }
    },
    editEntry() {
      this.$router.push('/edit?' + this.query);
    },
  },
};
</script>