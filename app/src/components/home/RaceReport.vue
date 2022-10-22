<template>
  <div class="rr_card">
    <div class="rr_card_header d-flex jc_space-between">
      <span>Running</span>
      <fa icon="signal"></fa>
    </div>
    <div class="d-flex jc_space-between">
      <div>
        <h3 class="rr_distance">12.70</h3>
        <p class="rr_distance_subtitle">Kilometer</p>
      </div>
      <div>
        <table>
          <tr>
            <td class="rr_data_label">
              Time
            </td>
            <td class="rr_data_value">
              1:05:31
            </td>
          </tr>
          <tr>
            <td class="rr_data_label">
              Time
            </td>
            <td class="rr_data_value">
              1:05:31
            </td>
          </tr>
          <tr>
            <td class="rr_data_label">
              Time
            </td>
            <td class="rr_data_value">
              1:05:31
            </td>
          </tr>
          <tr>
            <td class="rr_data_label">
              Time
            </td>
            <td class="rr_data_value">
              1:05:31
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
})
</script>

<style scoped lang="scss">
.rr_card {
  max-width: 80%;
  background: rgba(244,127,54,1);
  background: linear-gradient(90deg, rgba(244,127,54,1) 0%, rgba(255,171,0,1) 100%);
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
  }
}
</style>