<template>
  <div>
    <div class="month" v-for="month in months" :key="month.id">
      <Month :month="month" />
    </div>
  </div>
</template>

<script>
import Month from "./Month";

export default {
  name: "MonthList",
  components: {
    Month,
  },
  computed: {
    months() {
      return this.$store.getters.entries;
    },
  },
};
</script>
