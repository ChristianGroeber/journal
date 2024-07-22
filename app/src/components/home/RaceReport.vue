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
            if (Math.round(this.stats[0].value) % 2 === 0) {
                img = '/public/assets/dots-asthetic-flip-v.png';
            } else if (Math.round(this.stats[0].value) % 3 === 0) {
                img = '/public/assets/dots-asthetic-flip-h.png';
            } else if (Math.round(this.stats[0].value) % 5 === 0) {
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
    padding: 3rem 3em 1.5em 3em;
    box-sizing: border-box;
    background-color: #ffffff;
    border: 4px solid #000000;
    padding: 20px;
    margin: 20px;
    box-shadow: 10px 10px 0 #333333;
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
    // color: #d90429;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;

    svg {
        fill: #2b2d42;
        width: 50px;
        height: 50px;
    }
}

.rr_data_table {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

/* Data value */
.rr_data_value {
    background-color: #edf2f4;
    border: 3px solid #000000;
    padding: 10px;
    box-shadow: 5px 5px 0 #333333;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.2rem;
    color: #000000;

    svg {
        fill: #d90429;
        // color: #d90429;
        width: 25px;
        height: 25px;
    }

    &:nth-child(even) {
        background-color: #bde0fe;
        border-color: #669bbc;
        box-shadow: 5px 5px 0 #3b6275;
    }

    &:nth-child(odd) {
        background-color: #ffafcc;
        border-color: #ff7096;
        box-shadow: 5px 5px 0 #cc4f73;
    }
}
</style>
