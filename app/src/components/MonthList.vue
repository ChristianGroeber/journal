<template>
  <div>
    <AdminBar v-if="canEdit" />
    <div class="month" v-for="month in months" :key="month.id">
      <Month :month="month" />
    </div>
  </div>
</template>

<script>
import Month from "./Month";
import AdminBar from "./AdminBar";

export default {
  name: "MonthList",
  components: {
    Month,
    AdminBar,
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
