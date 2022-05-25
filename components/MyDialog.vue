<style scoped>
.over {
  height: 100%;
  width: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  z-index: 302;
}
</style>
<template>
  <div style="display: inline;">
    <slot name="button" v-bind:on="openDialog"/>
    <v-fade-transition>
      <div v-if="open2" @mousedown="close" class="over"
           style="display: flex; align-items: center; justify-content: center;">
        <div @click.stop @mousedown.stop style="max-height: calc(90% - 60px); overflow-y: auto; width: calc(100% - 20px);"
             :style="{maxWidth: maxWidth + 'px'}">
          <v-card light>
            <v-card-title class="accent pa-3" style="color: white;">
              <v-btn icon v-if="showBack" class="ml-2 mr-4" @click="close">
                <v-icon color="white" large>mdi-arrow-left</v-icon>
              </v-btn>
                <slot name="title"/>
            </v-card-title>
            <slot :close="close" style="position: relative;"/>
          </v-card>
        </div>
      </div>
    </v-fade-transition>
  </div>
</template>

<script>

export default {
  name: "MyDialog",
  mounted() {
  },
  data() {
    return {
      open2: false,
    };
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    maxWidth: {
      type: Number,
      default: 600,
    },
    showBack: {
      type: Boolean,
      default: true,
    }
  },
  methods: {
    close() {
      this.open2 = false;
      this.$emit('closed');
      // console.log("closed");
    },
    openDialog() {
      this.open2 = true;
    },
    // addComment() {
    //   this.$emit('add-comment', this.comment);
    // },
  },
  watch: {
    open: function (flg) {
      this.open2 = flg;
    },
  },
  computed: {}
};
</script>
