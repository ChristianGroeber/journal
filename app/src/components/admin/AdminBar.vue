<template>
    <div class="admin-bar">
        <pj-navbar :nav="nav"></pj-navbar>
    </div>
</template>

<script lang="ts">
import {buildRequest, send} from "@/src/helpers/xhr";
import {defineComponent} from "vue";
import {useRouter} from "vue-router";
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
                    label: "Auth",
                    page: "/auth",
                },
                {
                    label: "More",
                    page: "/admin/tools",
                },
            ],
            router: useRouter(),
        };
    },
    methods: {
        handleClick(itemId: number) {
            const item = this.nav[itemId];
            if (item.func !== undefined) {
                item.func();
            } else if ("page" in item) {
                this.router.push(item.page);
            } else {
                console.error('I don\'t know what to do with item #' + itemId);
            }
        },
        toggleEditSpecificPopup() {
            useDialogStore().showDialog('/admin/edit-specific');
        },
        editCurrent() {
            const request = buildRequest('/api/admin/entry/edit/current');
            send(request).then(response => {
                this.router.push("/edit?entry=" + response.data.entryId);
            });
        },
    },
})
</script>