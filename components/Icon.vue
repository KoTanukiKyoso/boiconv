<style scoped>

</style>
<template>
  <div>
    <my-dialog :max-width="300">
      <template v-slot:button="{ on }">
        <div @click="showBigIcon ? on() : null" :class="{'pointer': showBigIcon}">
          <v-avatar :size="size" class="mr-2" style="background: grey; border-style: solid; border-width: 2px; border-color: white;"
                    :style="accent ? {borderColor: `#66FFFF`} : {}">
            <picture v-if="src">
              <source type="image/webp" :srcset="func.getWEBP(storageGetRoot + src, '200x200')">
              <img :src="src" style="width: 100%; height: 100%;"/>
            </picture>
            <div v-else style="background: grey; height: 100%; width: 100%;">
              <v-icon style="color: #DDDDDD;">{{ icon }}</v-icon>
            </div>
          </v-avatar>
        </div>
      </template>
      <template v-slot:title>
        {{ title }}
      </template>
      <template v-slot:default="dialog">
        <v-card class="pa-3">
          <v-img v-if="src" :src="storageGetRoot + func.getWEBP(src, '200x200')"
                 max-width="200" class="mx-auto"/>
        </v-card>
      </template>
    </my-dialog>
  </div>
</template>

<script>
import * as func from "@/plugins/myPlugins";

export default {
  name: "Icon",
  mounted() {
  },
  data() {
    return {
      func: func,
    };
  },
  props: {
    size: {
      type: Number,
      default: 40,
      require: true,
    },
    src: {
      type: String,
      default: null,
      require: true,
    },
    showBigIcon: {
      type: Boolean,
      default: true,
      require: true,
    },
    title: {
      type: String,
      default: "画像",
      require: true,
    },
    icon: {
      type: String,
      default: "mdi-account",
      require: true,
    },
    accent: {
      type: Boolean,
      default: false,
      require: true,
    },
  },
  methods: {},
  computed: {
    storageGetRoot: function () {
      return this.$store.getters.get.storageGetRoot;
    },
  }
};
</script>
