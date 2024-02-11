import AddRaceReport, {route as raceReportRoute} from "@/src/components/modals/AddRaceReport.vue";
import SpecificEntryPopup, {route as specificEntryRoute} from "@/src/components/modals/SpecificEntryPopup.vue";
import MediaPreview, {route as mediaPreviewRoute} from "@/src/components/modals/MediaPreview.vue";
import LoginModal, {route as loginRoute} from "@/src/components/modals/LoginModal.vue";
import CreateAdmin, {route as createAdminRoute} from "@/src/components/modals/CreateAdmin.vue";
import EditorModal, {route as editorRoute} from "@/src/components/modals/EditorModal.vue";
import UserSettings, {route as settingsRoute} from "@/src/components/modals/UserSettingsModal.vue";
import ChangePassword, {route as changePasswordRoute} from "@/src/components/auth/ChangePassword.vue";
import RequestNewPassword, {route as requestNewPasswordRoute} from "@/src/components/auth/RequestNewPassword.vue";
import RestorePassword, {route as restorePasswordRoute} from "@/src/components/auth/RestorePassword.vue";
import RestoreBackup, {route as restoreBackupRoute} from "@/src/components/modals/RestoreBackup.vue";
import {defineDialogs} from "pixlcms-wrapper";

export const dialogs = defineDialogs([
    {
        route: specificEntryRoute,
        component: SpecificEntryPopup,
    },
    {
        route: editorRoute,
        component: EditorModal,
    },
    {
        route: mediaPreviewRoute,
        component: MediaPreview,
    },
    {
        route: raceReportRoute,
        component: AddRaceReport,
    },
    {
        route: loginRoute,
        component: LoginModal,
    },
    {
        route: createAdminRoute,
        component: CreateAdmin,
    },
    {
        route: settingsRoute,
        component: UserSettings,
    },
    {
        route: changePasswordRoute,
        component: ChangePassword,
    },
    {
        route: requestNewPasswordRoute,
        component: RequestNewPassword,
    },
    {
        route: restorePasswordRoute,
        component: RestorePassword,
    },
    {
        route: restoreBackupRoute,
        component: RestoreBackup,
    },
]);