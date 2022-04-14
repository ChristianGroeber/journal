<template>
  <div class="article">
    <div class="article-head">
      <h3>{{ formattedDate }}</h3>
      <router-link v-if="canEdit" :to="'/edit?' + query" class="btn edit-button">Edit</router-link>
    </div>
    <div class="article-body">
      <p v-html="content"></p>
    </div>
  </div>
</template>

<script>
import { marked } from 'marked';

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
};
</script>

<style scoped>
/* .article {
  background-color: white;
  padding: 0 2em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 3rem;
}

.article-head {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.article-head .edit-button {
  display: none;
}

.article-head:hover .edit-button {
  display: block;
}

@media screen and (max-width: 500px) {
  .article {
    margin: 0;
  }
} */
</style>