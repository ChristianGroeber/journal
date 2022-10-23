<template>
  <div class="rr_card">
    <div class="rr_card_header d-flex jc_space-between">
      <span>Running</span>
      <fa icon="signal"></fa>
    </div>
    <div class="d-flex jc_space-between">
      <div>
        <h3 class="rr_distance">{{ entry.meta.raceReport.distance }}</h3>
        <p class="rr_distance_subtitle">Kilometer</p>
      </div>
      <div>
        <table>
          <tr v-for="(stat, index) in stats" :key="index">
            <td class="rr_data_label">
              {{ stat.label }}
            </td>
            <td class="rr_data_value">
              {{ stat.value }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default ({
  name: "RaceReport",
  props: ["entry"],
  data() {
    return {
      stats: [
        {
          label: 'Time',
          value: this.entry.meta.raceReport.time,
        },
        {
          label: 'Pace',
          value: '5:10/km',
        },
        {
          label: 'BPM',
          value: '173',
        },
        {
          label: 'Calories',
          value: 1079,
        },
      ]
    }
  },
})
</script>

<style scoped lang="scss">
.rr_card {
  max-width: 80%;
  background: rgba(244, 127, 54, 1);
  background: linear-gradient(90deg, rgba(244, 127, 54, 1) 0%, rgba(255, 171, 0, 1) 100%);
  border-radius: 1.25rem;
  margin: 1rem;
  padding: 1rem;
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

@media screen and (min-width: 600px) {
  .rr_card {
    max-width: 40%;
    margin: 1rem;
  }
}
</style>