<template>
  <div class="article">
    <h3 class="article-head">{{ formattedDate }}</h3>
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

@media screen and (max-width: 500px) {
  .article {
    margin: 0;
  }
}
</style>