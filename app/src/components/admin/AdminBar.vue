<template>
    <div class="admin-bar">
        <pj-navbar :nav="nav"></pj-navbar>
    </div>
</template>

<script lang="ts">
import {buildRequest, send} from "@/src/helpers/xhr";
import {defineComponent} from "vue";
import {useDialogStore} from "@/src/store/dialog";

export default defineComponent({
    name: "AdminBar",
    data: function () {
        return {
            nav: [
                {
                    label: "Today",
                    func: this.editCurrent,
                },
                {
                    label: "Edit Specific",
                    func: this.toggleEditSpecificPopup,
                },
                {
                    label: "More",
                    func: this.toggleSettingsPopup,
                },
            ],
        };
    },
    methods: {
        handleClick(itemId: number) {
            const item = this.nav[itemId];
            if (item.func !== undefined) {
                item.func();
            } else {
                console.error('I don\'t know what to do with item #' + itemId);
            }
        },
        toggleEditSpecificPopup() {
            useDialogStore().showDialog('/edit/specific');
        },
        editCurrent() {
            const request = buildRequest('/api/admin/entry/edit/current');
            send(request).then(response => {
                useDialogStore().showDialog({route: "/editor", data: response.data.entryId});
            });
        },
        toggleSettingsPopup() {
            useDialogStore().showDialog("/settings");
        },
    },
})
</script>