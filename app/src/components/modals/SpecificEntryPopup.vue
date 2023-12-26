<template>
    <el-dialog v-model="isShowing" title="Edit Specific">
        <div>
            <el-form>
                <el-form-item label="Date">
                    <el-input v-model="dateEntry" type="date"></el-input>
                </el-form-item>
                <pj-button-link :action="editSpecificEntry" content="Submit"></pj-button-link>
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
import moment from "moment";
import {buildRequest, send} from "@/src/helpers/xhr";
import {useMainStore} from "@/src/store/main";
import {useAuthStore} from "@/src/store/auth";
import {useRouter} from "vue-router";
import {useDialogStore} from "@/src/store/dialog";

const route = "/edit/specific";

export default {
    name: 'SpecificEntryPopup',
    data: function () {
        return {
            dateEntry: moment().format("yyyy-MM-DD"),
            mainStore: useMainStore(),
            dialogStore: useDialogStore(),
            router: useRouter(),
        };
    },
    computed: {
        isShowing: {
            get() {
                return this.dialogStore.isDialogShowing(route);
            },
            set() {
                this.dialogStore.hideDialog(route);
            }
        },
    },
    methods: {
        hidePopup() {
            this.isShowing(false);
        },
        editSpecificEntry() {
            const token = useAuthStore().getToken;
            const data = {entry: this.dateEntry};
            const request = buildRequest('/api/admin/entry/create', data);
            send(request).then(response => {
                this.dialogStore.hideDialog(route);
                this.router.push("/edit?entry=" + response.data.entryId);
            })
        },
    },
};
</script>