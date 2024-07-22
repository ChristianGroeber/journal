<template>
    <div>
        <h2>{{ month.name }}</h2>
        <div class="article-list container">
            <template v-for="(day, index) in month.days" :key="index">
                <Day :day="day"/>
            </template>
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
