<template>
    <div class="rr_card" :style="style">
        <div>
            <div class="rr_distance">
                <pj-icon icon="person-running"></pj-icon>
                {{ entry.meta.raceReport.distance }}
                Km
            </div>
        </div>
        <div class="rr_data_table">
            <div v-for="(stat, index) in stats" :key="index">
                <div class="rr_data_value" :title="stat.label">
                    <pj-icon :icon="stat.icon"></pj-icon>
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
    computed: {
        style: function () {
            let img = '/public/assets/dots-asthetic.png';
            if (this.stats[0].value % 2 === 0) {
                img = '/public/assets/dots-asthetic-flip-v.png';
            } else if (this.stats[0].value % 3 === 0) {
                img = '/public/assets/dots-asthetic-flip-h.png';
            } else if (this.stats[0].value % 5 === 0) {
                img = '/public/assets/dots-asthetic-flip-v-h.png';
            } else {
                img = '';
            }
            if (img !== '') {
                return 'background-image: url("' + img + '")';
            } else {
                return '';
            }
        },
    },
})
</script>

<style scoped lang="scss">
.rr_card {
    background-repeat: no-repeat;
    background-size: cover;
    padding: 3rem;
    box-sizing: border-box;
}
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
</style>
