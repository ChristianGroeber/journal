<template>
    <pj-dialog title="Edit Specific">
        <div>
            <el-form>
                <el-form-item label="Date">
                    <el-input v-model="dateEntry" type="date"></el-input>
                </el-form-item>
                <pj-button-link :action="editSpecificEntry" content="Submit"></pj-button-link>
            </el-form>
        </div>
    </pj-dialog>
</template>

<script>
import moment from "moment";
import {buildRequest, send} from "@/src/helpers/xhr";
import {useMainStore} from "@/src/store/main";
import {useDialogStore} from "@/src/store/dialog";

export const route = "/edit/specific";

export default {
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
};
</script>