<template>
    <pm-dialog title="Edit Specific">
        <div>
            <el-form>
                <el-form-item label="Date">
                    <el-input v-model="dateEntry" type="date"></el-input>
                </el-form-item>
                <pj-button-link :action="editSpecificEntry" content="Submit"></pj-button-link>
            </el-form>
        </div>
    </pm-dialog>
</template>

<script>
import moment from "moment";
import {defineComponent} from "vue";
import {useMainStore} from "@/src/store/main";
import {useDialogStore, buildRequest, send} from "pixlcms-wrapper";

export const route = "/edit/specific";

export default defineComponent({
    name: 'SpecificEntryPopup',
    data: function () {
        return {
            dateEntry: moment().format("yyyy-MM-DD"),
            mainStore: useMainStore(),
            dialogStore: useDialogStore(),
        };
    },
    methods: {
        editSpecificEntry() {
            const data = {entry: this.dateEntry};
            const request = buildRequest('/api/admin/entry/create', data);
            send(request).then(response => {
                this.dialogStore.hideDialog(route);
                this.dialogStore.showDialog({route: "/editor", data: response.data.entryId});
            })
        },
    },
});
</script>
