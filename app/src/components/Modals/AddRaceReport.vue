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

<script lang="ts">
import {defineComponent} from "vue";
import {useMainStore} from "@/src/store/main";
import {useAuthStore} from "@/src/store/auth";
import {useJournalStore} from "@/src/store/journal";

export default defineComponent({
  name: "AddRaceReportPopup",
  props: ["entry"],
  data() {
    return {
      authStore: useAuthStore(),
      mainStore: useMainStore(),
      journalStore: useJournalStore(),
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
        return this.mainStore.getShowRaceReportPopup;
      },
      set(newValue) {
        this.mainStore.setShowRaceReportPopup(newValue);
      },
    },
  },
  methods: {
    hidePopup() {
      this.mainStore.setShowRaceReportPopup(false);
    },
    addRaceReport() {
      const editingEntry = this.journalStore.editingEntry;
      const token = this.authStore.getToken;
      if (editingEntry === null) {
        throw 'Editing Entry cannot be null';
      }
      if (token === null) {
        throw 'Token cannot be null';
      }
      const data = {
        token: token,
        entry: editingEntry.id,
        raceReport: {},
      };
      for (const key in this.raceReport) {
        data.raceReport[key] = this.raceReport[key].value;
      }
      this.journalStore.uploadRaceReport(data).then(() => {
        this.mainStore.buildCache(token);
        this.mainStore.setShowRaceReportPopup(false);
        this.clearForm();
      });
    },
    clearForm() {
      this.raceReport.distance.value = "";
      this.raceReport.time.value = "";
      this.raceReport.pace.value = "";
      this.raceReport.bpm.value = 0;
      this.raceReport.calories.value = 0;
    }
  },
});
</script>