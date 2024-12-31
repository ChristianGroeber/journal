<template>
    <ul>
        <li v-for="(item, index) in nav" :index="(index + 1).toString()" :key="index"
                @click="handleClick(index)">
            {{ item.label }}
        </li>
    </ul>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "Navbar",
    props: ['nav'],
    data: function () {
        return {
        };
    },
    methods: {
        handleClick(itemId: number) {
            const item = this.nav[itemId];
            if (item.func !== undefined) {
                item.func();
            } else if ("page" in item) {
                // this.router.push(item.page);
            } else {
                console.error('I don\'t know what to do with item #' + itemId);
            }
        },
    },
})
</script>

<style scoped lang="scss">
ul {
    li {
        cursor: pointer;
        color: blue;
    }
}
</style>
