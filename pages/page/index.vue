<template>
  <v-row class="mx-auto" justify="center" align="center">
    <v-col cols="12" sm="10" style="max-width: 800px;">
      <top class="mt-6"/>
      <v-card class="mt-3">
        <v-card-title class="pb-1">更新情報</v-card-title>
        <div style="max-height: 300px; overflow-y: auto;">
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left" style="min-width: 130px;">
                  日時
                </th>
                <th class="px-2" style="min-width: 50px;">
                  Ver.
                </th>
                <th class="">
                  内容
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(log, i) of updateLogs" :key="i">
                <td class="px-2">{{ log.datetime }}</td>
                <td class="px-2">{{ log.v }}</td>
                <td class="pa-2">{{ log.content }}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-card>
      <v-card class="mt-3">
        <v-card-title class="pb-1">更新/修正予定</v-card-title>
        <div style="max-height: 300px; overflow-y: auto;">
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left" style="min-width: 130px;">追記日時</th>
                <th class="px-2" style="min-width: 50px;">タイプ</th>
                <th>内容</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(log, i) of issues" :key="i">
                <td class="px-2">{{ log.datetime }}</td>
                <td class="px-2">{{ log.v }}</td>
                <td class="pa-2">{{ log.content }}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-card>
      <v-card class="mt-3">
        <v-card-title class="pb-1">処理概要</v-card-title>
        <v-card-text>
          セリフ（100文字制限）は以下の法則で分割されます<br>
          ・100文字を超えない場合はそのままセリフになります<br>
          ・100文字を超える場合，「。」で分割します<br>
          ・それでも100文字を超える場合，「、」で分割します<br>
          ・それでも100文字を超える場合，スペース（全角，半角）で分割します<br>
          ・それでも100文字を超える場合，文章の途中でも強制的に分割します<br>
          ・結合可能な個所を結合します<br>
        </v-card-text>
      </v-card>
      <div style="height: 40px; width: 100%;"/>
    </v-col>
  </v-row>
</template>

<script>
export default {
  created: function () {
    this.$store.commit('set', {
      key: "title",
      val: "トップ"
    });
  },
  mounted: function () {
    this.init();
  },
  data() {
    return {
      query: "",
      updateLogs: [
        {datetime: "2022-05-25", v: "0.9.2", content: "「…」を削除から「．．」に変換するように変更"},
        {datetime: "2022-05-25", v: "0.9.1", content: "ファイル読み込み機能追加"},
        {datetime: "2022-05-25", v: "0.9.1", content: "各話文字数上限設定機能追加"},
        {datetime: "2022-05-25", v: "0.9.1", content: "各話文字数上限表示（2000）"},
        {datetime: "2022-05-25", v: "0.9.1", content: "更新ページの追加"},
        {datetime: "2022-05-25", v: "0.9.0", content: "公開"},
      ],
      issues: [
        // {datetime: "2022-05-25", v: "更新", content: ""},
      ],
    };
  },
  methods: {
    init: function () {
    },
  },
  computed: {
    user: function () {
      return this.$store.getters.user;
    },
    isSignedIn: function () {
      return this.$store.getters.isSignedIn;
    },
    endFirstAuth: function () {
      return this.$store.getters.endFirstAuth;
    },
    endGettingUser: function () {
      return this.$store.getters.endGettingUser;
    },
    title: function () {
      return this.$store.getters.get.title;
    },
    apiRoot: function () {
      return this.$store.getters.get.apiRoot;
    },
  },
};
</script>
