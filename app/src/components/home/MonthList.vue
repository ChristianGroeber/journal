<template>
    <div class="main-content">
        <div class="months">
            <div class="month" v-for="month in months" :key="month.id">
                <Month :month="month"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Month from "./Month.vue";
import AdminBar from "../admin/AdminBar.vue";
import {resizeVideos} from "../../helpers/videosizer";
import {defineComponent} from "vue";
import {useMainStore} from "@/src/store/main";
import {useJournalStore} from "@/src/store/journal";
import {useAuthStore} from "@/src/store/auth";

export default defineComponent({
    name: "MonthList",
    components: {
        Month,
        AdminBar,
    },
    data() {
        return {
            mainStore: useMainStore(),
            journalStore: useJournalStore(),
            authStore: useAuthStore(),
        }
    },
    created() {
        this.mainStore.setTitle(this.mainStore.getMeta.journalYear.toString());
        window.setTimeout(resizeVideos, 100);
    },
    computed: {
        months() {
            return this.journalStore.getEntries;
        },
    },
})
</script>

<style scoped lang="scss">
.months {
    display: flex;
    width: 100%;
    gap: var(--content-gap);

    .month {
        display: block;
        width: var(--content-width);
    }
}
</style>
