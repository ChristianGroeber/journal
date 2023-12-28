<template>
    <div class="modals">
        <component
            v-for="dialog in showingDialogs"
            :key="dialog.route"
            :is="getComponent(dialog.route)"
            :data="dialog.data"
            @close=""
        ></component>
    </div>
</template>

<script lang="ts">
import {defineComponent, computed, Component} from "vue";
import AddRaceReport, {route as raceReportRoute} from "@/src/components/modals/AddRaceReport.vue";
import SpecificEntryPopup, {route as specificEntryRoute} from "@/src/components/modals/SpecificEntryPopup.vue";
import MediaPreview, {route as mediaPreviewRoute} from "@/src/components/modals/MediaPreview.vue";
import LoginModal, {route as loginRoute} from "@/src/components/modals/LoginModal.vue";
import CreateAdmin, {route as createAdminRoute} from "@/src/components/modals/CreateAdmin.vue";
import EditorModal, {route as editorRoute} from "@/src/components/modals/EditorModal.vue";
import {useDialogStore} from "@/src/store/dialog";

interface DialogComponent {
    route: string,
    component: Component,
}

export default defineComponent({
    name: 'Modals',
    components: {
        AddRaceReport,
        SpecificEntryPopup,
        MediaPreview,
        LoginModal,
        CreateAdmin,
        EditorModal,
    },
    methods: {},
    setup() {
        const dialogStore = useDialogStore();
        const showingDialogs = computed(() => dialogStore.getShowingDialogs.dialogs);

        const dialogComponentMap = [
            {
                route: specificEntryRoute,
                component: SpecificEntryPopup,
            } as DialogComponent,
            {
                route: editorRoute,
                component: EditorModal,
            } as DialogComponent,
            {
                route: mediaPreviewRoute,
                component: MediaPreview,
            } as DialogComponent,
            {
                route: raceReportRoute,
                component: AddRaceReport,
            } as DialogComponent,
            {
                route: loginRoute,
                component: LoginModal,
            } as DialogComponent,
            {
                route: createAdminRoute,
                component: CreateAdmin,
            } as DialogComponent,
        ];

        const getComponent = (route: string) => {
            const mapping = dialogComponentMap.find(d => d.route === route);
            console.log(route, mapping);
            return mapping ? mapping.component : null;
        }

        return {
            showingDialogs,
            dialogComponentMap,
            getComponent,
        };
    },
})
</script>
