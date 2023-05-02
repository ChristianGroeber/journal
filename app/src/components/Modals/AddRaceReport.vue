<template>
    <el-dialog v-model="isShowing" title="Edit Race Report" :before-close="close">
        <div>
            <el-form>
                <div v-for="(field, index) in raceReport" :key="index">
                    <el-form-item :label="field.label">
                        <el-input v-if="field.type === 'text'" v-model="field.value"></el-input>
                        <el-input-number v-if="field.type === 'number'" v-model="field.value"></el-input-number>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <template #footer>
            <pj-button-link :action="addRaceReport" content="Submit"></pj-button-link>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useMainStore} from "@/src/store/main";
import {useAuthStore} from "@/src/store/auth";
import {useJournalStore} from "@/src/store/journal";

export default defineComponent({
    name: "AddRaceReportPopup",
    props: ["entry"],
    data() {
        return {
            authStore: useAuthStore(),
            mainStore: useMainStore(),
            journalStore: useJournalStore(),
            raceReport: {
                distance: {
                    label: "Distance",
                    type: "text",
                    value: "",
                },
                time: {
                    label: "Time",
                    type: "text",
                    value: "",
                },
                pace: {
                    label: "Pace",
                    type: "text",
                    value: "",
                },
                bpm: {
                    label: "BPM",
                    type: "number",
                    value: 0,
                },
                calories: {
                    label: "Calories",
                    type: "number",
                    value: 0,
                },
            },
        }
    },
    computed: {
        isShowing: {
            get() {
                return this.mainStore.getShowRaceReportPopup;
            },
            set(newValue: boolean) {
                this.mainStore.setShowRaceReportPopup(newValue);
            }
        },
    },
    methods: {
        open() {
            this.mainStore.setShowRaceReportPopup(true);
        },
        close() {
            this.mainStore.setShowRaceReportPopup(false);
        },
        addRaceReport() {
            const editingEntry = this.journalStore.editingEntry;
            const token = this.authStore.getToken;
            if (editingEntry === null) {
                throw 'Editing Entry cannot be null';
            }
            if (token === null) {
                throw 'Token cannot be null';
            }
            const data = {
                token: token,
                entry: editingEntry.id,
                raceReport: {},
            };
            for (const key in this.raceReport) {
                data.raceReport[key] = this.raceReport[key].value;
            }
            this.journalStore.uploadRaceReport(data).then(() => {
                this.mainStore.buildCache(token);
                this.mainStore.setShowRaceReportPopup(false);
                this.clearForm();
            });
        },
        clearForm() {
            this.raceReport.distance.value = "";
            this.raceReport.time.value = "";
            this.raceReport.pace.value = "";
            this.raceReport.bpm.value = 0;
            this.raceReport.calories.value = 0;
        }
    },
});
</script>