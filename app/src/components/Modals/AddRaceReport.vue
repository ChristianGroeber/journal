<template>
    <vk-modal :show.sync="show">
      <vk-modal-close @click="hidePopup"></vk-modal-close>
      <vk-modal-title>Add a Race Report</vk-modal-title>
      <div>
        <form>
          <div v-for="(field, index) in raceReport" :key="index">
            <label :for="index">{{ field.label }}</label>
            <input class="uk-input" :id="index" :type="field.type" v-model="field.value" :name="index">
          </div>
        </form>
      </div>
      <div slot="footer">
        <div class="uk-text-right">
          <vk-button class="btn btn-primary" @click="addRaceReport">Submit</vk-button>
        </div>
      </div>
    </vk-modal>
</template>

<script>
export default ({
  name: "AddRaceReportPopup",
  props: ["entry"],
  data() {
    return {
      raceReport: {
        distance: {
          label: "Distance",
          type: "text",
          value: "",
        },
        time: {
          label: "Time",
          type: "text",
          value: "",
        },
        pace: {
          label: "Pace",
          type: "text",
          value: "",
        },
        bpm: {
          label: "BPM",
          type: "number",
          value: 0,
        },
        calories: {
          label: "Calories",
          type: "number",
          value: 0,
        },
      },
    }
  },
  computed: {
    show: {
      get() {
        return this.$store.getters.showRaceReportPopup;
      },
      set(newValue) {
        this.$store.commit("EDIT_RACE_REPORT_POPUP", newValue);
      },
    },
  },
  methods: {
    hidePopup() {
      this.$store.commit("EDIT_RACE_REPORT_POPUP", false);
    },
    addRaceReport() {
      const data = {
        token: this.$store.getters.token,
        entry: this.$store.getters.editingEntry.id,
        raceReport: {},
      };
      for (const key in this.raceReport) {
        data.raceReport[key] = this.raceReport[key].value;
      }
      this.$store.dispatch('uploadRaceReport', data).then(response => {
        this.$store.dispatch('buildCache', this.$store.getters.token);
        this.$store.commit('EDIT_RACE_REPORT_POPUP', false);
        this.clearForm();
      });
    },
    clearForm() {
      this.raceReport.distance.value = "";
      this.raceReport.time.value = "";
      this.raceReport.pace.value = "";
      this.raceReport.bpm.value = "";
      this.raceReport.calories.value = "";
    }
  },
});
</script>