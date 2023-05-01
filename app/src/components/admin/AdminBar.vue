<template>
  <div class="admin-bar">
    <vk-navbar>
      <vk-navbar-nav>
        <vk-navbar-nav-item
          v-for="(item, index) in nav"
          :key="index"
          @click="handleClick(index)"
          :title="item.label"
        ></vk-navbar-nav-item>
        <vk-navbar-item></vk-navbar-item>
      </vk-navbar-nav>
    </vk-navbar>
  </div>
</template>

<script lang="ts">
import xhr from "../../helpers/xhr";
import {defineComponent} from "vue";
import {useRouter} from "vue-router";
import {useMainStore} from "@/src/store/main";

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
    };
  },
  methods: {
    handleClick(itemId: number) {
      const item = this.nav[itemId];
      if (item.func !== undefined) {
        item.func();
      } else if ("page" in item) {
        useRouter().push(item.page);
      } else {
        console.error('I don\'t know what to do with item #' + itemId);
      }
    },
    toggleEditSpecificPopup() {
      useMainStore().setShowEditSpecificPopup(true);
    },
    editCurrent() {
      const request = xhr.buildRequest('/api/admin/entry/edit/current', {token: this.$store.getters.token});
      xhr.send(request).then(response => {
        useRouter().push("/edit?entry=" + response.data.entryId);
      });
    },
  },
})
</script>
