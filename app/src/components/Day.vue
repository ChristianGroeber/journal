<template>
  <div class="article">
    <div class="article-head">
      <h3>{{ formattedDate }}</h3>
      <div>
        <button class="btn btn-delete" v-if="canEdit" @click="deleteEntry">
          Delete
        </button>
        <router-link
          v-if="canEdit"
          :to="'/edit?' + query"
          class="btn edit-button"
          >Edit</router-link
        >
      </div>
    </div>
    <div class="article-body">
      <p v-html="content"></p>
    </div>
  </div>
</template>

<script>
import { marked } from "marked";

export default {
  name: "Day",
  props: ["day"],
  computed: {
    formattedDate() {
      return this.day.meta.title;
    },
    content() {
      return marked.parse(this.day.raw_content);
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
  },
  methods: {
    deleteEntry() {
      const doDelete = confirm('Are you sure you want to delete this entry');
      if (doDelete) {
        this.$store.dispatch("deleteEntry", this.day.id).then((response) => {
          this.$store.dispatch("getEntries");
        });
      }
    },
  },
};
</script>