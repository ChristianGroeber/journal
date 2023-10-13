<template>
    <div class="modals">
        <AddRaceReport></AddRaceReport>
        <SpecificEntryPopup></SpecificEntryPopup>
        <MediaPreview></MediaPreview>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import AddRaceReport from "@/src/components/modals/AddRaceReport.vue";
import SpecificEntryPopup from "@/src/components/modals/SpecificEntryPopup.vue";
import MediaPreview from "@/src/components/modals/MediaPreview.vue";

export default defineComponent({
    name: 'Modals',
    components: {
        AddRaceReport,
        SpecificEntryPopup,
        MediaPreview,
    },
})
</script>
