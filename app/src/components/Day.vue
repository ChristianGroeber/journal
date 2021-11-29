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
    }
  },
};
</script>
