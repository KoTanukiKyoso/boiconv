<style scoped>

</style>
<template>
  <div>
    <h4 style="color: #999999;" class="mx-2" v-if="showTitle && item">
      - コメント({{ item.numOfComment || 0 }}) -
    </h4>
    <v-card v-if="item" tile elevation="0" max-width="540" class="mx-auto">
      <!--コメント-->
      <comment ref="cmt1" @add-comment="addComment(null, null, $event, 'cmt1')"/>
      <v-divider/>
      <!--コメント表示-->
      <div v-if="comments && comments.length > 0" :style="{maxHeight: maxHeight}" class="pt-3"
           style="overflow-y: auto;">
        <div v-for="(comment, ii) of comments" :key="ii">
          <v-card elevation="0" class="mb-4 px-0">
            <v-card-actions class="pb-2 pt-0 px-0" style="align-items: start;">
              <div class="pt-1 pr-2">
                <icon :src="comment.user && comment.user.image ? comment.user.image : null"
                      :accent="comment[accent]" :title="comment.user.name + ' さん'"/>
              </div>
              <div style="flex-grow: 1;">
                <div class="text-subtitle-1 d-flex">
                  <span v-if="comment.user && comment.user.name">{{ comment.user.name }}</span>
                  <span v-else>名無し</span>
                  <v-spacer/>
                  <small style="color: grey;">{{ comment.datetime.split(" ")[0] }}</small>
                  <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list class="mt-1">
                      <v-list-item v-if="canReply" @click="reply=comment.id">
                        <v-list-item-title>返信</v-list-item-title>
                      </v-list-item>
                      <v-list-item v-if="canDelete(comment)" @click="deleteComment(comment)">
                        <v-list-item-title>削除</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
                <div v-for="(line,i) of comment.content.split(/\r?\n/g)" :key="i">
                  <div v-if="line" style="line-height: 1.1rem;">{{ line }}</div>
                  <div v-else style="height: 12px;"></div>
                </div>
                <!--返信-->
                <template v-if="canReply">
                  <comment v-if="reply===comment.id" :ref="'reply' + ii"
                           @canceled="reply=0" class="pt-2"
                           @add-comment="addComment(comment.id, comment.id, $event, 'reply' + ii)"/>
                </template>
              </div>
            </v-card-actions>

            <!--返信表示-->
            <template v-if="canReply">
              <div v-for="(rep, iii) of comment.reply" :key="iii" class="pt-3">
                <v-card elevation="0" class="ml-6" style="flex-grow: 1;">
                  <v-card-actions class="pb-2 pt-0 px-0" style="align-items: start;">
                    <div class="pt-1 pr-2">
                      <icon :src="rep.user && rep.user.image ? rep.user.image : null" :accent="rep[accent]"
                            :title="rep.user.name + ' さん'"/>
                    </div>
                    <div style="flex-grow: 1;">
                      <div class="text-subtitle-1 d-flex" v-if="user && user.uid">
                        {{ rep.user.name }}
                        <v-spacer/>
                        <small style="color: grey;">{{ rep.datetime.split(" ")[0] }}</small>
                        <v-menu>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on">
                              <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                          </template>
                          <v-list class="mt-1">
                            <v-list-item v-if="canReply" @click="reply=rep.id">
                              <v-list-item-title>返信</v-list-item-title>
                            </v-list-item>
                            <v-list-item v-if="canDelete(comment)" @click="deleteComment(rep)">
                              <v-list-item-title>削除</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </div>
                      <div v-for="(line,i) of rep.content.split(/\r?\n/g)" :key="i">
                        <div v-if="line" style="line-height: 1.1rem;">{{ line }}</div>
                        <div v-else style="height: 12px;"></div>
                      </div>
                      <comment v-if="reply===rep.id" :ref="'rReply' + iii"
                               @canceled="reply = 0" class="pt-2"
                               @add-comment="addComment(comment.id, rep.id, $event, 'rReply' + iii)"/>
                    </div>
                  </v-card-actions>
                </v-card>
              </div>
            </template>
          </v-card>
        </div>
      </div>
      <template v-else>
        <div class="text-center grey--text py-6">コメントがありません</div>
      </template>
    </v-card>
  </div>
</template>

<script>
import * as func from "@/plugins/myPlugins";

export default {
  name: "Comments",
  mounted() {
    this.init();
  },
  data() {
    return {
      item: null,
      comment: "",
      reply: 0,
      func: func,
      comments: [],
    };
  },
  props: {
    _item: {
      type: Object,
      default: {},
      require: true,
    },
    showTitle: {
      type: Boolean,
      default: true,
      require: true,
    },
    canReply: {
      type: Boolean,
      default: true,
      require: true,
    },
    maxHeight: {
      type: String,
      default: "none",
      require: true,
    },
    accent: {
      type: String,
      default: "isAdmin",
      require: true,
    },
  },
  methods: {
    init() {
      this.item = this._item;
      let comments = {};
      this.item.comments.sort((a, b) => {
        return a.id - b.id;
      });
      for (let comment of this.item.comments) {
        if (!comment.originId) {
          comment.reply = [];
          comments[comment.id] = comment;
        } else if (comments[comment.originId]) {
          comments[comment.originId].reply.push(comment);
        }
      }
      comments = Object.keys(comments).map(function (key) {
        return comments[key];
      });
      comments.sort((a, b) => {
        return -a.id + b.id;
      });
      this.comments = comments;
    },
    async addComment(originId, parentId, content, ref) {
      if (!content) {
        this.$store.commit('addMessage', {
          text: "コメントを入力してください"
        });
        return;
      }
      if (content.length > 250) {
        this.$store.commit('addMessage', {
          text: "コメントは250文字以内です"
        });
        return;
      }
      let _this = this;
      this.$emit('add-comment2', {
        id: this.item.id,
        originId: originId,
        parentId: parentId,
        content: content,
        end: () => {
          _this.reply = 0;
          if (_this.$refs[ref][0]) {
            _this.$refs[ref][0].clearComment();
          } else if (_this.$refs[ref]) {
            _this.$refs[ref].clearComment();
          }
        }
      });
    },
    async deleteComment(comment) {
      this.$emit('delete-comment', comment);
    },
    canDelete(comment) {
      if (!this.isSignedIn || !this.user) {
        return false;
      }
      return comment.user && this.user.uid === comment.user.uid;
    },
  },
  watch: {
    _item: function () {
      this.init();
    },
  },
  computed: {
    isSignedIn: function () {
      return this.$store.getters.isSignedIn;
    },
    user: function () {
      return this.$store.getters.user;
    },
    apiRoot: function () {
      return this.$store.getters.get.apiRoot;
    },
    storageGetRoot: function () {
      return this.$store.getters.get.storageGetRoot;
    },
  }
};
</script>
