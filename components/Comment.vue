<style scoped>

</style>
<template>
  <div>
    <v-card-actions class="pb-0 px-0">
      <icon :src="user ? user.image : null" :size="46" :showBigIcon="false"/>
      <v-textarea auto-grow label="*コメント" placeholder="250文字以内" class="mt-2 mr-3 free" filled
                  rows="1" dense counter="250" v-model="comment"/>
    </v-card-actions>
    <v-card-actions class="pt-1 px-0">
      <v-spacer/>
      <v-btn @click="cancel" color="error" text>キャンセル</v-btn>
      <v-btn @click="addComment" color="primary" text>投稿</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import * as func from "@/plugins/myPlugins";

export default {
  name: "Comment",
  mounted() {
    this.comment = this.cmt;
  },
  data() {
    return {
      func: func,
      comment: "",
    };
  },
  props: {
    cmt: {
      type: String,
      default: "",
      require: false,
    },
  },
  methods: {
    cancel() {
      this.comment = "";
      this.$emit('canceled');
    },
    addComment() {
      this.$emit('add-comment', this.comment);
    },
    clearComment() {
      this.comment = "";
    },
  },
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
