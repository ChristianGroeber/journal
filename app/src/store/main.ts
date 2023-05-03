import {AxiosResponse} from 'axios';
import {defineStore} from "pinia";
import {buildRequest, send} from "@/src/helpers/xhr";
import {useAuthStore} from "@/src/store/auth";

interface MediaPreview {
    showing: boolean,
    src: string,
    mediaType: string,
}

interface Meta {
    journalYear: string|number,
    adminCreated: boolean,
    version: string|number,
}

interface MediaType {
    name: string,
    mime: string,
}

interface State {
    showEditSpecificPopup: boolean,
    showRaceReportPopup: boolean,
    showLoginPopup: boolean,
    mediaPreview: MediaPreview,
    meta: Meta,
    mediaTypes: MediaType[],
    pageTitle: string,
    theme: string,
}

export const useMainStore = defineStore('main', {
    state: (): State => ({
        showEditSpecificPopup: false,
        showRaceReportPopup: false,
        showLoginPopup: false,
        mediaPreview: {
            showing: false,
            src: '',
            mediaType: '',
        },
        meta: {
            journalYear: '',
            adminCreated: true,
            version: 0,
        },
        pageTitle: 'Loading',
        mediaTypes: [
            {
                'name': 'Video',
                'mime': 'video/*',
            },
            {
                'name': 'Image',
                'mime': 'image/*'
            }
        ],
        theme: 'light',
    }),
    getters: {
        getShowEditSpecificPopup: state => state.showEditSpecificPopup,
        getShowRaceReportPopup: state => state.showRaceReportPopup,
        getShowLoginPopup: state => state.showLoginPopup,
        getMediaPreview: state => state.mediaPreview,
        getPageTitle: state => state.pageTitle,
        getMediaTypes: state => state.mediaTypes,
        getMeta: state => state.meta,
        getTheme: state => state.theme,
    },
    actions: {
        setTitle(title: string) {
            if (title == this.$state.meta.journalYear || this.$state.meta.journalYear === '') {
                document.title = this.$state.meta.journalYear.toString();
            } else {
                document.title = title + ' · ' + this.$state.meta.journalYear.toString();
            }
            this.pageTitle = title;
        },
        buildCache(token: string) {
            const request = buildRequest('/api/admin/build-cache', {token: token});
            return send(request);
        },
        setShowLoginPopup(showLoginPopup: boolean) {
            this.showLoginPopup = showLoginPopup;
        },
        setShowEditSpecificPopup(showSpecificPopup: boolean) {
            this.showEditSpecificPopup = showSpecificPopup;
        },
        setShowRaceReportPopup(showRaceReportPopup: boolean) {
            this.showRaceReportPopup = showRaceReportPopup;
        },
        setShowMediaPreview(showMediaPreview: boolean) {
            this.mediaPreview.showing = showMediaPreview;
        },
        setMediaPreview(mediaPreview: MediaPreview) {
            this.mediaPreview = mediaPreview
        },
        hideMediaPreview() {
            this.mediaPreview.showing = false;
        },
        loadTheme() {
            const deviceTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            const storedTheme = localStorage.getItem('theme');

            if (storedTheme !== null && storedTheme !== undefined ) {
                this.theme = storedTheme;
            } else {
                this.theme = deviceTheme;
            }

            document.documentElement.classList.add(this.theme);
        },
        setTheme(theme: string) {
            if (theme !== 'light' && theme !== 'dark') {
                throw 'The selected theme is not supported';
            }

            document.documentElement.classList.remove(this.getTheme);
            document.documentElement.classList.add(theme);
            this.theme = theme;


            localStorage.setItem('theme', theme);
        },
        init(token: string | null) {
            const request = buildRequest('/api/init', {token: token}, 'POST');
            return send(request).then((response: AxiosResponse) => {
                if (response.data.is_token_valid !== 'token_valid') {
                    useAuthStore().logout();
                }
                this.$state.meta = response.data;

                return response;
            })
        },
    },
})