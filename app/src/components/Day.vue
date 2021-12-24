<template>
  <div class="article">
    <h3 class="article-head">
      <div>{{ formattedDate }}</div>
      <router-link :to="'/edit?' + query" class="edit-button">Edit</router-link>
    </h3>
    {{ query }}
    <div class="article-body">
      <p v-html="content"></p>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Day",
  props: ["day"],
  computed: {
    formattedDate() {
      return moment(this.day.date).format("D.M.Y");
    },
    content() {
      return atob(this.day.content);
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
.article {
  background-color: white;
  padding: 2em;
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
}
</style>