<template>
    <table>
        <thead>
            <tr>
                <th v-for="item, index in stats" :key="index">{{ item.label }}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td v-for="item, index in stats" :key="index">{{ item.value }}</td>
            </tr>
        </tbody>
    </table>
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
                    value: this.entry.meta.raceReport.time,
                },
                {
                    label: 'Pace',
                    value: this.entry.meta.raceReport.pace + ' min/km',
                },
                {
                    label: 'BPM',
                    value: this.entry.meta.raceReport.bpm,
                },
                {
                    label: 'Calories',
                    value: this.entry.meta.raceReport.calories,
                },
            ]
        }
    },
})
</script>

<style scoped lang="scss">
table {
    margin-bottom: 1rem;
    width: 100%;
    border-spacing: 0;
    border-top: 1px solid black;
    border-left: 1px solid black;

    tr {
        border: 1px solid black;
    }

    td, th {
        border-right: 1px solid black;
        border-bottom: 1px solid black;
        padding: 2px 5px;
    }
}
</style>
