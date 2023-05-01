<template>
  <div class="rr_card">
    <div>
      <h3 class="rr_distance">
        <fa icon="person-running"></fa>
        {{ entry.meta.raceReport.distance }}
        Km
      </h3>
    </div>
    <div class="rr_data_table">
      <div v-for="(stat, index) in stats" :key="index">
        <div class="rr_data_value" :title="stat.label">
          <fa :icon="stat.icon"></fa>
          {{ stat.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "RaceReport",
  props: ["entry"],
  data() {
    return {
      stats: [
        {
          label: 'Time',
          icon: 'clock',
          value: this.entry.meta.raceReport.time,
        },
        {
          label: 'Pace',
          icon: 'gauge',
          value: this.entry.meta.raceReport.pace + '/km',
        },
        {
          icon: 'heart-pulse',
          label: 'BPM',
          value: this.entry.meta.raceReport.bpm,
        },
        {
          label: 'Calories',
          icon: 'fire',
          value: this.entry.meta.raceReport.calories,
        },
      ]
    }
  },
})
</script>

<style scoped lang="scss">
.rr_data_table, .rr_distance {
  text-align: center;
  justify-content: center;
}

.rr_data_label {
  min-width: 50px;
}

.rr_distance {
  font-size: 3rem;
  margin: 0;
}

.rr_distance_subtitle {
  margin: 0;
}

.rr_data_table {
  display: flex;
  gap: 1rem;
}

@media screen and (min-width: 600px) {
  .rr_card {
    // max-width: 40%;
    margin: 1rem;
  }
}
</style>