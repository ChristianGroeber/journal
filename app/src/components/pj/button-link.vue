<template>
    <el-button @click="clicked">
        <template v-if="icon !== undefined">
            <pj-icon :icon="icon"></pj-icon>
        </template>
        <template v-if="content !== undefined">
            {{ content }}
        </template>
        <span v-if="loading" class="pj-loading-wrapper">
            <div class="el-loading-spinner">
                <svg class="circular" viewBox="0 0 50 50"><circle class="path" cx="25" cy="25" r="20" fill="none"></circle></svg>
            </div>
        </span>
    </el-button>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: 'PJButtonLink',
    props: ['href', 'action', 'content', 'icon', 'loading'],
    data() {
        return {
        }
    },
    methods: {
        clicked() {
            if (this.href) {
            } else if (this.action) {
                this.action();
            }
        },
    },
})
</script>

<style scoped lang="scss">
.pj-loading-wrapper {
    position: relative;
    height: 25px;
    width: 25px;
    margin-left: 10px;
    margin-right: -10px;

    .el-loading-spinner {
        top: 80%;
    }

    svg {
        height: 25px;
        width: 25px;
        color: black;
        fill: black;
    }
}
</style>
