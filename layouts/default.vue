<style lang="scss">
body {
  animation: fadeIn 2s ease 0s 1 normal;
  -webkit-animation: fadeIn 2s ease 0s 1 normal;
}

//===Vueアニメーション===
.v-enter-active, .v-leave-active {
  transition: opacity .5s;
}

.v-enter, .v-leave-to {
  opacity: 0;
}

/*透明度のみ*/
.opacity-leave-active,
.opacity-enter-active {
  transition: opacity 0.5s;
}

.opacity-enter {
  opacity: 0;
}

.opacity-enter-to {
  opacity: 1;
}

.opacity-leave {
  opacity: 1;
}

.opacity-leave-to {
  opacity: 0;
}

/*縦方向*/
.downup-leave-active,
.downup-enter-active {
  /* transition: opacity 1s; */
  transition: all 0.5s;
}

.downup-enter {
  opacity: 0;
  transform: translateY(-50%);
}

.downup-enter-to {
  opacity: 1;
}

.downup-leave {
  opacity: 1;
}

.downup-leave-to {
  opacity: 0;
  transform: translateY(-50%);
}

//===アニメーション===

.image-input__field {
  position: relative;
  display: flex;
  background: #EEE;
  //height: 80px;
  padding: 30px 10px;
  justify-content: center;
  align-items: center;
  color: #999;
  font-weight: bold;
}

.image-input__field:hover {
  background-color: #CCC;
}

.image-input__field.over {
  background-color: #CCC;
}

.image-input__field > input {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
}

@media print {
  .no-print {
    display: none;
  }
}
</style>
<template>
  <v-app dark style="background: #f8f9fc;">
    <v-navigation-drawer v-if="!freePage" mobile-breakpoint="960" v-model="drawer" dark class="no-print"
                         :mini-variant="miniVariant" :clipped="true" fixed app>
      <div class="text-h6 py-4 d-flex"
           style="align-items: center; justify-content: center;">
        <div class="mr-4 pa-1" style="background: #666666;">
          <v-img width="50" height="50" contain src="v.png"/>
        </div>
        <div class="mr-4 white--text">BOICONV</div>
      </div>
      <v-divider/>
      <v-list class="pt-0">
        <template v-for="(item, i) in items">
          <v-list-item v-if="item.condition()" :key="i" :to="item.to" router exact
                       :class="{'v-list-item--active' : item.active()}">
            <v-list-item-action>
              <v-icon large>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="text-subtitle-1" v-text="item.title"/>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar v-if="!freePage" :clipped-left="true" fixed app dark color="primary" class="no-print">
      <v-app-bar-nav-icon v-if="$vuetify.breakpoint.smAndDown" @click.stop="drawer = !drawer"/>
      <div class="mr-3 pa-1" style="background: rgba(255,255,255,0.4); border-radius: 6px;">
        <v-img contain src="v.png"
               :style="{maxWidth: `${$vuetify.breakpoint.xs ? 28 : 34}px`, maxHeight: `${$vuetify.breakpoint.xs ? 28 : 34}px`}"/>
      </div>
      <nuxt-link to="/" style="text-decoration: none; color: white;">
        <v-toolbar-title :style="$vuetify.breakpoint.xs ? { fontSize: '16px'} : {}">
          {{ title }}
        </v-toolbar-title>
      </nuxt-link>
      <v-spacer/>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-apps</v-icon>
          </v-btn>
        </template>
        <div style="display: flex; flex-wrap: wrap; background: white; width: 252px;" class="px-2">
          <template v-for="(app, i) of apps">
            <a target="_blank" :href="app.link" :key="i" style="text-decoration: none; color: #666666;">
              <div style="width: 74px; font-weight: bold;" class="pa-1 text-center">
                <div class="px-1">
                  <v-img width="58" height="58" contain :src="app.icon"/>
                </div>
                <small>{{ app.title }}</small>
              </div>
            </a>
          </template>
        </div>
      </v-menu>
    </v-app-bar>
    <v-main :style="{background: backColor + 'BB'}">
      <MyAlert/>
      <OverLay/>
      <my-dialog :open="showUserQR" @closed="showUserQR=false">
        <template v-slot:title>
          ユーザQR
        </template>
        <template v-slot:default="dialog">
          <v-card class="pa-3">
            <v-card-title>
              <v-icon color="grey" class="mr-3">mdi-qrcode</v-icon>
              ユーザQR
            </v-card-title>
            <template>
              <v-card-subtitle class="pb-0">
                本システムのメンバーの追加等に利用します<br>
                クリックで保存できます
              </v-card-subtitle>
              <div class="text-center">
                <a v-if="qrURL" :download="'qr_' + user.name" :href="qrURL">
                  <img :src="qrURL" alt="QRCode">
                </a>
              </div>
            </template>
          </v-card>
        </template>
      </my-dialog>
      <nuxt/>
    </v-main>
    <v-footer v-if="!freePage" fixed app dark class="no-print">
      <a target="_blank" style="text-decoration: none; color: white;" href="https://top.nexsjp.com">&copy;株式会社NEXS {{ new Date().getFullYear() }}</a>
    </v-footer>
    <div v-if="$vuetify.breakpoint.smAndDown && !freePage" class="no-print">
      <bottom-buttons :pages="items"/>
    </div>
  </v-app>
</template>

<script>
import * as func from "~/plugins/myPlugins";

export default {
  beforeCreate() {

  },
  mounted() {
    this.drawer = this.$vuetify.breakpoint.mdAndUp;
  },
  data() {
    return {
      func: func,
      drawer: false,
      showUserQR: false,
      qrURL: null,
      apps: [
        {title: "わたココ！", icon: "https://service.nexsjp.com/watakoko/favicons/android-chrome-128x128.png", link: "https://service.nexsjp.com/watakoko/",},
        {title: "スタステ", icon: "https://service.nexsjp.com/studyStation/favicons/android-chrome-128x128.png", link: "https://service.nexsjp.com/studyStation/",},
        {title: "フォトフリ", icon: "https://service.nexsjp.com/photofree/favicons/android-chrome-128x128.png", link: "https://service.nexsjp.com/photofree/",},
        {title: "イマココ", icon: "https://service.nexsjp.com/imakoko/favicons/android-chrome-128x128.png", link: "https://service.nexsjp.com/imakoko/",},
        {title: "myQA", icon: "https://service.nexsjp.com/myqa/v.png", link: "https://service.nexsjp.com/myqa/",},
      ],
      items: [
        {
          icon: 'mdi-home',
          title: 'トップ',
          to: '/page',
          condition: () => {
            return true;
          },
          color: () => {
            if (this.$route.path === "/page") {
              return "primary";
            }
            return "grey";
          },
          active: () => {
            return false;
          },
        },
        {
          icon: 'mdi-file-document-edit',
          title: 'シナリオ変換',
          to: '/',
          condition: () => {
            return true;
          },
          color: () => {
            if (this.$route.path === "/") {
              return "primary";
            }
            return "grey";
          },
          active: () => {
            return false;
          },
        },
      ],
      miniVariant: false,
    };
  },
  methods: {
  },
  watch: {
  },
  computed: {
    user: function () {
      return this.$store.getters.user;
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
    backColor: function () {
      return this.$store.getters.get.backColor;
    },
    freePage: function () {
      return this.$store.getters.get.freePage;
    },
    storageGetRoot: function () {
      return this.$store.getters.get.storageGetRoot;
    },
  },
};
</script>
