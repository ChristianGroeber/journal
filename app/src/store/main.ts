import {AxiosResponse} from 'axios';
import {defineStore} from "pinia";
import {buildRequest, send} from "@/src/helpers/xhr";
import {useAuthStore} from "@/src/store/auth";

interface MediaPreview {
    src: string,
    mediaType: string,
}

interface Meta {
    journalYear: string|number,
    adminCreated: boolean,
    version: string|number,
    journalVersion: string|number,
}

interface MediaType {
    name: string,
    mime: string,
}

interface State {
    mediaPreview: MediaPreview,
    meta: Meta,
    mediaTypes: MediaType[],
    pageTitle: string,
}

export const useMainStore = defineStore('main', {
    state: (): State => ({
        mediaPreview: {
            src: '',
            mediaType: '',
        },
        meta: {
            journalYear: '',
            adminCreated: true,
            version: 0,
            journalVersion: 0,
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
    }),
    getters: {
        getMediaPreview: state => state.mediaPreview,
        getPageTitle: state => state.pageTitle,
        getMediaTypes: state => state.mediaTypes,
        getMeta: state => state.meta,
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
        buildCache() {
            const request = buildRequest('/api/admin/build-cache');
            return send(request);
        },
        setMediaPreview(mediaPreview: MediaPreview) {
            this.mediaPreview = mediaPreview
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