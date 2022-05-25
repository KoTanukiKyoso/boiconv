<template>
  <div style="max-width: 800px;" class="pt-6 px-3 mx-auto">
    <v-card>
      <v-card-title>BOICONV</v-card-title>
      <v-card-subtitle>NTTソルマーレの提供する「ボイコネ」の"シナリオ"を"小説"へ変換する「非公式」サービスです</v-card-subtitle>
      <v-card-text>
        ・半角記号を全角記号に変換します<br>
        ・全角コロン「：」は使用できないので半角コロン「:」は「｜」に変換されます<br>
        ・絵文字を削除します<br>
        ・2000文字（変更可能）ごとに各話として区切ります<br>
        ・100文字ごとにセリフに区切ります<br>
        ・全てト書きに設定することも可能です<br>
        <br>
        ・Windows，Google Chrome推奨です<br>
        ・完全に自己責任でご利用ください<br>
        ・シナリオの基準に則っていること前提です<br>
        ・句読点は「。」「、」をご利用ください<br>
        ・空白，全角コロン「：」のない行は取り除かれます<br>
        ・不具合やご要望はTwitter「@daldalshi_voice」まで<br>
        ・「ボイコネ」はエヌ・ティ・ティ・ソルマーレ株式会社の商標です<br>
      </v-card-text>
    </v-card>
    <v-card class="pa-4 mt-4">
      <v-card-title class="pb-0">以下にシナリオを貼り付けるか，ファイルを選択してください</v-card-title>
      <v-card-text style="text-align: start;" class="ma-0 pb-2 pt-0">
        <small>*アップロード可能なファイル形式は「txt」です．</small>
      </v-card-text>
      <div class="image-input__field" style="max-width: 600px;" :class="{'over': isDragOver}"
           @dragover.prevent="onDrag('over')"
           @dragleave="onDrag('leave')"
           @drop.stop="onDrop">
        <input type="file" title @change="onChangeTextFile">
        ここをクリックしてファイルを選択<br>またはD＆Dでファイルを追加できます
      </div>
      <v-card-actions>
        <v-textarea auto-grow label="*シナリオ" placeholder="20000文字以内" class="ma-2" filled
                    rows="2" dense counter="20000" v-model="text" style="max-height: 400px; overflow-y: auto;"/>
      </v-card-actions>
      <v-card-actions class="py-0">
        <v-spacer/>
        <v-text-field v-model.number="partMaxLength" style="max-width: 200px;"
                      label="一話文字数上限" required filled hide-details type="number"/>
      </v-card-actions>
      <v-card-actions>
        <v-btn color="primary" outlined @click="text=''">クリア</v-btn>
        <v-spacer/>
        <v-checkbox class="mx-3" v-model="toTogaki" label="すべて”ト書き”にする"/>
        <v-btn color="primary" @click="conv">変換</v-btn>
      </v-card-actions>

      <template v-if="endConv">
        <v-divider/>
        <v-card-title class="pb-0">変換結果
          <v-spacer/>
          <v-btn color="primary" @click="download">
            <v-icon class="mr-2">mdi-download</v-icon>
            一括ダウンロード
          </v-btn>
        </v-card-title>
        <div>
          <div class="px-4 my-4">
            全体の登場人物
            <div v-for="(name, i) of names" :key="i">
              <span v-if="name==='0'">・ト書き</span>
              <span v-else>・{{ name }}</span>
            </div>
          </div>
          <div v-for="(part, i) of parts" :key="i" class="mt-4">
            <div class="px-3">
              {{ i + 1 }}話の登場人物
              <div v-for="(name, i) of part.names" :key="i">
                <span v-if="name==='0'">・ト書き</span>
                <span v-else>・{{ name }}</span>
              </div>
            </div>
            <v-card-actions class="pt-0">
              <div style="max-height: 400px; overflow-y: auto;" class="flex-grow-1">
                <v-textarea auto-grow :label="i + 1 + '話'" class="mt-2 mr-3" filled
                            rows="2" v-model="part.text" counter="2000"/>
              </div>
              <v-btn color="primary" icon @click="onCopy(part.text)">
                <v-icon>mdi-content-copy</v-icon>
              </v-btn>
            </v-card-actions>
          </div>
        </div>
      </template>
    </v-card>
  </div>
</template>

<script>
import * as func from "~/plugins/myPlugins";
import JSZip from "jszip";
import saveAs from 'file-saver';

export default {
  created: function () {
    this.$store.commit('set', {
      key: "title",
      val: "BOICONV"
    });
  },
  mounted: function () {
  },
  data() {
    return {
      text: "",
      toTogaki: false,
      endConv: false,
      res: [],
      isDragOver: false,

      partMaxLength: 2000,
      parts: [],
      names: {},
    };
  },
  methods: {
    onDrag(type) {
      this.isDragOver = type === "over";
    },
    onDrop() {
      this.isDragOver = false;
    },

    async onChangeTextFile(event) {
      const files = event.target.files;
      let file = files[0];
      console.log(file.type);
      if (file.type !== "text/plain") {
        this.$store.commit('addMessage', {
          text: "「txt」ファイル以外は読み込みできません",
        });
        return;
      }
      let text = await file.text();
      // console.log(text);
      this.text = text;
    },
    async onCopy(text) {
      let res = await this.$copyText(text);
      // console.log(res);
      this.$store.commit('addMessage', {
        text: "コピーしました",
        risk: 0,
      });
    },
    async download() {
      let zip = new JSZip();
      let i = 1;
      for (let part of this.parts) {
        zip.file(`${i}話.txt`, part.text);
        i++;
      }
      zip.generateAsync({type: 'blob'}).then(function (blob) {
        saveAs(blob, "novel.zip");
      });
    },
    conv() {
      if (!this.text) {
        this.$store.commit('addMessage', {
          text: "変換するシナリオを入力してください"
        });
        return;
      }

      //:は除外
      let text = this.text;
      text = text.replace(/:/g, "｜");
      //半角記号を全角記号に変換
      text = this.halfWidth2FullWidthSymbol(text);
      //絵文字を削除
      text = text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');

      //改行で区切る
      //空白行,：のない行を取り除く
      let arr = [];
      for (let t of text.split(/\r\n|\n/)) {
        // console.log(t);
        if (t && t.indexOf("：") >= 0) {
          arr.push(t);
        }
      }

      this.res = [];
      let res = [];
      let names = {};
      //100文字ごとにセリフに区切
      //100文字判定
      for (let t of arr) {
        let ts = t.split("：");
        if (ts.length !== 2) {
          this.$store.commit('addMessage', {
            text: `次の箇所で規定外の記述があります\n${t}`
          });
          return;
        }
        let name = ts[0];
        names[name] = name;
        let txt = ts[1];
        //分割
        let _res = this.shorting([{
          text: txt,
          sep: "",
          name: name,
        }]);
        let __res = [];
        //まずセパレートを全て足す
        for (let r of _res) {
          r.text += r.sep;
        }
        let rr = null;
        for (let r of _res) {
          if (!rr) {
            rr = r;
          } else {
            if (r.name === rr.name && (r.text + rr.text).length <= this.maxLength(r.name.length)) {
              rr.text += r.text;
            } else {
              __res.push(rr);
              rr = r;
            }
          }
        }
        if (rr) {
          __res.push(rr);
        }
        //結合
        res = res.concat(__res);
      }
      this.names = names;

      //名前付加
      let _res = [];
      for (let r of res) {
        if (this.toTogaki && r.name !== "0") {
          _res.push({
            text: "0：" + r.name + "｜" + r.text,
            name: r.name
          });
        } else {
          _res.push({
            text: r.name + "：" + r.text,
            name: r.name
          });
        }
      }
      res = _res;

      this.parts = [];
      let t = "";
      let _names = {};
      //2000文字ごとに各話として区切
      for (let _r of res) {
        let r = _r.text;
        if ((t + r).length <= this.partMaxLength) {
          if (this.toTogaki && _r.name !== "0") {
            let name = (r.split("｜")[0]).split("：")[1];
            _names[name] = name;
          } else {
            let name = r.split("：")[0];
            _names[name] = name;
          }
          t += r + "\n";
        } else {
          this.parts.push({
            text: t,
            names: {..._names},
          });
          _names = {};
          t = r + "\n";
        }
      }
      if (t) {
        this.parts.push({
          text: t,
          names: {..._names},
        });
      }

      // console.log(this.parts);
      this.endConv = true;
    },
    shorting(arr) {
      let res = [];
      let flg = false;
      console.log(1);
      for (let item of arr) {
        console.log(2);
        if ((item.text + item.sep).length <= this.maxLength(item.name)) {
          res.push(item);
        } else if (item.text.indexOf("。") >= 0) {
          flg = true;
          res = res.concat(this.separate("。", item));
        } else if (item.text.indexOf("、") >= 0) {
          flg = true;
          res = res.concat(this.separate("、", item));
        } else if (item.text.indexOf("　") >= 0) {
          flg = true;
          res = res.concat(this.separate("　", item));
        } else if (item.text.indexOf(" ") >= 0) {
          flg = true;
          res = res.concat(this.separate(" ", item));
        } else {
          flg = true;
          while ((item.text + item.sep).length > this.maxLength(item.name)) {
            let t = item.text.substring(0, this.maxLength(item.name));
            item.text = item.text.substring(this.maxLength(item.name));
            res.push({
              text: t,
              name: item.name,
              sep: ""
            });
          }
          res.push({
            text: item.text,
            name: item.name,
            sep: item.sep,
          });
        }
      }
      if (flg) {
        return this.shorting(res);
      }
      return res;
    },
    separate(sep, item) {
      let res = [];
      let ts = item.text.split(sep);
      console.log(3);
      for (let i = 0; i < ts.length; i++) {
        let t = ts[i];
        res.push({
          text: t,
          name: item.name,
          sep: (i === ts.length - 1) ? item.sep : sep,
        });
      }
      return res;
    },
    maxLength(name) {
      if (!this.toTogaki || name === "0") {
        return 100;
      }
      return 100 - (name.length + 1);
    },
    // shorting(txt, name, sep = "") {
    //   console.log(11);
    //   if ((txt + sep).length < 100) {
    //     this.res.push(name + "：" + txt + sep);
    //     return;
    //   }
    //   //まず「。」で区切る
    //   if (txt.indexOf("。") >= 0) {
    //     this.separate(txt, "。", name);
    //     return;
    //   }
    //   //次に「，」で区切る
    //   if (txt.indexOf("，") >= 0) {
    //     this.separate(txt, "，", name);
    //     return;
    //   }
    //   //次にスペースで区切る
    //   if (txt.indexOf(" ") >= 0) {
    //     this.separate(txt, " ", name);
    //     return;
    //   }
    //   if (txt.indexOf(" ") >= 0) {
    //     this.separate(txt, " ", name);
    //     return;
    //   }
    //   //最終的に無理矢理区切る
    //   while ((txt + sep).length > 100) {
    //     let t = txt.substring(0, 100);
    //     this.res.push(name + "：" + t);
    //     txt = txt.substring(100);
    //   }
    //   this.res.push(name + "：" + txt + sep);
    // },
    // separate(txt, sep, name) {
    //   console.log(22);
    //   let ts = txt.split(sep);
    //   let tt = "";
    //   let i = 0;
    //   for (let _ts of ts) {
    //     if (_ts.length > 99) {//そもそも単体で超える場合
    //       //取ってある分を確定
    //       if (tt) {
    //         this.res.push(name + "：" + tt);
    //         tt = "";
    //       }
    //       //次に回す
    //       this.shorting(_ts, name, (i === ts.length - 1) ? "" : sep);
    //     } else if ((tt + _ts + sep).length <= 100) {//足しても100超えない場合足しておく
    //       tt += _ts + sep;
    //     } else {//足すと100超える場合
    //       this.res.push(name + "：" + tt);//過去を確定
    //       tt = _ts;//次に残す
    //     }
    //     i++;
    //   }
    // },
    halfWidth2FullWidthSymbol(src) {
      return src.replace(/[!-\/:-@\[-\{-~]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
      });
    },
  },
  watch: {},
  computed: {},
};
</script>
