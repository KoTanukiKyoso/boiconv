<style scoped>

</style>
<template>
  <div>
    <slot name="button" v-bind:on="openDialog"/>
    <v-fade-transition>
      <qrcode-stream v-if="open2"
                     style="position: fixed; height: 100%; width: 100%; top: 0; left: 0; z-index: 303;"
                     @decode="onDecode" @init="onInit">
        <v-card style="background: rgba(255,255,255, 0.5)">
          <v-card-title>
            <v-btn icon class="mr-8" @click="close">
              <v-icon large>mdi-arrow-left</v-icon>
            </v-btn>
            <slot name="title"/>
          </v-card-title>
        </v-card>
      </qrcode-stream>
    </v-fade-transition>
  </div>
</template>

<script>

export default {
  name: "MyQrStream",
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
    together: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.open2 = false;
      this.$emit('closed');
    },
    openDialog() {
      this.open2 = true;
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        let errorMessage = "原因不明のエラーです";
        if (error.name === 'NotAllowedError') {
          errorMessage = "エラー: カメラアクセスが許可されておりません";
        } else if (error.name === 'NotFoundError') {
          errorMessage = "エラー: カメラが見つかりません";
        } else if (error.name === 'NotSupportedError') {
          errorMessage = "エラー: HTTPSでのアクセスが必要です";
        } else if (error.name === 'NotReadableError') {
          errorMessage = "エラー: カメラが準備中か他で使用されています";
        } else if (error.name === 'OverconstrainedError') {
          errorMessage = "エラー: カメラが対応しておりません";
        } else if (error.name === 'StreamApiNotSupportedError') {
          errorMessage = "エラー: このブラウザではご利用いただけません";
        }
        this.$store.commit('addMessage', {
          text: errorMessage,
          dismissible: true,
        });
        // console.log(error);
        this.close();
      }
    },
    onDecode(content) {
      // console.log(content);
      if (this.together) {
        this.$emit('onDecode', {
          content: content,
          close: this.close,
        });
      } else {
        this.$emit('onDecode', content, this.close);
      }
    },
  },
  watch: {
    open: function (flg) {
      this.open2 = flg;
    },
  },
  computed: {}
};
</script>
