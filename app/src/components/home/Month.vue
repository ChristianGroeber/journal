<template>
    <div>
        <h2>{{ month.name }}</h2>
        <div class="article-list container">
            <div v-for="(day, index) in month.days" :key="index">
                <Day :day="day"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Day from "./Day.vue";
import {defineComponent} from "vue";

export default defineComponent({
    name: "Month",
    props: ["month"],
    components: {
        Day,
    },
})
</script>

<style lang="scss">
@import '/app/style/variables.scss';

h2 {
    text-align: center;
    padding: 5px 0;
    margin: 5px 0 20px 0 !important;
    background-color: rgba(107, 81, 81, 0.33);
    color: white;
    border: $black-border;
    text-shadow: 0 0 2px black;
}
</style>
