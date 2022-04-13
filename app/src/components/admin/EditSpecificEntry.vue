<template>
  <div>
    <button @click="toggleShowDatePicker()">Edit Specific Entry</button>
    <div id="date-picker" v-if="showDatePicker">
      <input type="text" v-model="dateEntry" />
      <button @click="editSpecificEntry()">Submit</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function () {
    return {
      dateEntry: moment().format("yyyy-MM-DD"),
      showDatePicker: false,
    };
  },
  methods: {
    toggleShowDatePicker() {
      this.showDatePicker = true;
    },
    editSpecificEntry() {
      //   this.$router.push("/edit?entry=/" + month + "/" + this.dateEntry);
      axios
        .get("/api/create?token=" + this.$store.getters.token + '&entry=' + this.dateEntry)
        .then((response) => {
          this.$router.push("/edit?entry=" + response.data.entryId);
        });
    },
  },
};
</script>
