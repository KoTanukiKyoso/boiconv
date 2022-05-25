<style scoped>
.btn {
  flex-grow: 1;
  text-align: center;
  padding: 8px;
}
</style>
<template>
  <div style="display: flex; background: white; position: fixed; left: 0; bottom: 0;
width: 100%; border-top: solid 1px #999999; flex-direction: row; justify-content: stretch;
align-items: stretch; color: grey; z-index: 10;">
    <template v-for="(page, i) of pages">
      <div v-if="page.condition()" class="btn">
        <v-btn :to="page.to" icon :key="i">
          <v-icon :color="page.color()" size="30">{{ page.icon }}</v-icon>
        </v-btn>
      </div>
    </template>
  </div>
</template>

<script>

import * as func from "@/plugins/myPlugins";

export default {
  name: "BottomButtons",
  mounted() {
  },
  data() {
    return {};
  },
  props: {
    pages: {
      type: Array,
      require: true,
    },
  },
  methods: {},
  computed: {
    isSignedIn: function () {
      return this.$store.getters.isSignedIn;
    },
    user: function () {
      return this.$store.getters.user;
    },
  }
};
</script>
