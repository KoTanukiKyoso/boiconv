// メンバー権限
// 1：オーナー
// 4：マネージャー
// 7：メンバー
// 10：閲覧者
//
// オーナー
// ・グループの削除権限他全権限
//
// マネージャー
// ・グループの編集（削除を除く）権限
// ・マネージャー以下権限のユーザ追加
// ・マネージャー以下権限の編集
// ・グループデバイスの追加，削除
//
// メンバー
// ・デバイスグループの作成，デバイス追加
// ・解錠ルールの作成
// ・ゲストの追加
//
// 閲覧者
// ・閲覧のみ
import {checkLength, isNumber} from "@/plugins/myPlugins";

export const MEMBER_PERMISSION = [
    {
        text: "オーナー",
        description: "全ての操作が許可されます",
        value: 5
    },
    {
        text: "マネージャー",
        description: "メンバー/デバイスの追加等殆どの操作が許可されます",
        value: 3
    },
    {
        text: "閲覧者",
        description: "データの閲覧のみ許可されます",
        value: 1
    },
];
let MEMBER_PERMISSION_OBJECT = {};
for (let g of MEMBER_PERMISSION) {
    MEMBER_PERMISSION_OBJECT[g.value] = g;
}
export {MEMBER_PERMISSION_OBJECT};


export const SEX = [
    {
        text: "未定義",
        description: "性別を指定しません",
        value: 0
    },
    {
        text: "男性",
        description: "",
        value: 1
    },
    {
        text: "女性",
        description: "",
        value: 2
    },
    {
        text: "その他",
        description: "",
        value: 3
    },
];
let SEX_OBJECT = {};
for (let g of SEX) {
    SEX_OBJECT[g.value] = g;
}
export {SEX_OBJECT};

export const STUDENT_ARRANGE = [
    {
        text: "登録順",
        description: "",
        value: 1,
    },
    {
        text: "氏名(五十音)順",
        description: "",
        value: 2,
    },
    {
        text: "学年順",
        description: "",
        value: 3,
    },
    {
        text: "クラス順",
        description: "",
        value: 4,
    },
    {
        text: "区分順",
        description: "",
        value: 8,
    },
    {
        text: "番号順",
        description: "",
        value: 7,
    },
    {
        text: "生年月日順",
        description: "",
        value: 5,
    },
    {
        text: "性別順",
        description: "",
        value: 6,
    },
];
let STUDENT_ARRANGE_OBJECT = {};
for (let g of STUDENT_ARRANGE) {
    STUDENT_ARRANGE_OBJECT[g.value] = g;
}
export {STUDENT_ARRANGE_OBJECT};

export const ROOM_READER = [
    {
        text: "管理者のみ",
        description: "管理者（施設側）のユーザのみ閲覧可能です",
        value: 1
    },
    {
        text: "保護者のみ",
        description: "保護者のみ閲覧可能です",
        value: 2
    },
    {
        text: "管理者と保護者",
        description: "管理者（施設側）と保護者の両者が閲覧可能です",
        value: 3
    },
    {
        text: "全体公開",
        description: "非ログインユーザを含め全てのユーザが閲覧可能です",
        value: 4
    },
];
let ROOM_READER_OBJECT = {};
for (let g of ROOM_READER) {
    ROOM_READER_OBJECT[g.value] = g;
}
export {ROOM_READER_OBJECT};


export const ROOM_WRITER = [
    {
        text: "管理者のみ",
        description: "管理者（施設側）のユーザのみ書き込み可能です",
        value: 1
    },
    {
        text: "保護者のみ",
        description: "保護者のみ書き込み可能です",
        value: 2
    },
    {
        text: "管理者と保護者",
        description: "管理者（施設側）と保護者の両者が書き込み可能です",
        value: 3
    },
];
let ROOM_WRITER_OBJECT = {};
for (let g of ROOM_WRITER) {
    ROOM_WRITER_OBJECT[g.value] = g;
}
export {ROOM_WRITER_OBJECT};

// 1:父，2：母，3:祖父，4祖母， 5：兄弟，6：姉妹，10：その他
export const RELATIONSHIP = [
    {
        text: "未定義",
        value: 0
    },
    {
        text: "父",
        value: 1
    },
    {
        text: "母",
        value: 2
    },
    {
        text: "祖父",
        value: 3
    },
    {
        text: "祖母",
        value: 4
    },
    {
        text: "兄弟",
        value: 5
    },
    {
        text: "姉妹",
        value: 6
    },
    {
        text: "その他",
        value: 10
    },
];
let RELATIONSHIP_OBJECT = {};
for (let g of RELATIONSHIP) {
    RELATIONSHIP_OBJECT[g.value] = g;
}
export {RELATIONSHIP_OBJECT};


export const STUDENT_DEFINE = {
    format: (type, text) => {
        if (type === "number") {
            text = text.replace(/ /, "");
            text = text.replace(/　/, "");
            text = text.replace("'", "").replace('"', "");
            text = text - 0;
            return text;
        } else if (type === "string") {
            text = text + "";
            text = text.trim();
            return text;
        } else if (type === "date") {
            // console.log(text);
            text = text + "";
            text = text.trim();
            let ts = text.split("-");
            if (ts[1].length === 1) {
                ts[1] = "0" + ts[1];
            }
            if (ts[2].length === 1) {
                ts[2] = "0" + ts[2];
            }
            return ts.join("-");
        } else if (type === "array") {
            return text;
        }
    },
    check: (obj, _this) => {
        for (let key in STUDENT_DEFINE.KEYS) {
            let element = STUDENT_DEFINE.KEYS[key];
            if (obj[key] || obj[key] === 0 || obj[key] === "0" || obj[key] === "") {//キーが存在している
                let tmp = obj[key];
                obj[key] = element.format(obj[key]);
                if (!element.check(obj[key], obj)) {
                    _this.$store.commit('addMessage', {
                        text: `「${key}」の「${tmp}」は不正な値です`,
                        dismissible: true,
                    });
                    return false;
                }
            } else {//キーが存在していない場合
                if (element.targets(obj)) {//要素が必要
                    if (element.replaceable) {//要素は置き換え可
                        if (Array.isArray(element.ini)) {
                            obj[key] = [...element.ini];
                        } else {
                            obj[key] = element.ini;//初期化
                        }
                    } else {
                        _this.$store.commit('addMessage', {
                            text: `要素「${key}」は必須です`,
                            dismissible: true,
                        });
                        return false;
                    }
                } else {//必要ないのでnull
                    obj[key] = null;
                }
            }
        }
        return true;
    },
    min: (item) => {
        let obj = {};
        for (let key in STUDENT_DEFINE.KEYS) {
            obj[key] = item[key];
        }
        return obj;
    },
    KEYS: {
        //読み取り要素，，
        //検査時なければtargets，falseならnull，trueならreplaceable: trueなら初期値，falseならエラー
        //検査時あればcheck，falseならエラー
        insert: {
            ini: 1, //初期値
            replaceable: false,
            targets: () => {//この要素が必要ならtrueを返す関数
                return true;
            },
            type: "number",
            length: 0,
            format(text) {
                text = text.trim();
                if (text === "" || text - 0 === 1) {
                    return 1;
                }
                return 0;
            },
            check(text) {//値の異常チェック関数，falseならエラー
                return isNumber(text, true) && (text === 0 || text === 1);
            }
        },
        nameFirst: {
            ini: "", //初期値
            replaceable: false,
            targets() {//この要素が必要ならtrueを返す関数
                return true;
            },
            type: "string",
            length: 20,
            format(text) {
                return STUDENT_DEFINE.format(this.type, text);
            },
            check(text) {//値の異常チェック関数，falseならエラー
                return text && checkLength(text, this.length);
                
            }
        },
        nameLast: {
            ini: "", //初期値
            replaceable: false,
            targets() {//この要素が必要ならtrueを返す関数
                return true;
            },
            type: "string",
            length: 20,
            format(text) {
                return STUDENT_DEFINE.format(this.type, text);
            },
            check(text) {//値の異常チェック関数，falseならエラー
                return text && checkLength(text, this.length);
                
            }
        },
        kanaFirst: {
            ini: "", //初期値
            replaceable: false,
            targets() {//この要素が必要ならtrueを返す関数
                return true;
            },
            type: "string",
            length: 20,
            format(text) {
                return STUDENT_DEFINE.format(this.type, text);
            },
            check(text) {//値の異常チェック関数，falseならエラー
                return text && checkLength(text, this.length);
                
            }
        },
        kanaLast: {
            ini: "", //初期値
            replaceable: false,
            targets() {//この要素が必要ならtrueを返す関数
                return true;
            },
            type: "string",
            length: 20,
            format(text) {
                return STUDENT_DEFINE.format(this.type, text);
            },
            check(text) {//値の異常チェック関数，falseならエラー
                return text && checkLength(text, this.length);
                
            }
        },
        number: {
            ini: "", //初期値
            replaceable: true,
            targets() {//この要素が必要ならtrueを返す関数
                return false;
            },
            type: "string",
            length: 20,
            format(text) {
                return STUDENT_DEFINE.format(this.type, text);
            },
            check(text) {//値の異常チェック関数，falseならエラー
                return checkLength(text, this.length);
            }
        },
        grade: {
            ini: "", //初期値
            replaceable: true,
            targets() {//この要素が必要ならtrueを返す関数
                return false;
            },
            type: "string",
            length: 20,
            format(text) {
                return STUDENT_DEFINE.format(this.type, text);
            },
            check(text) {//値の異常チェック関数，falseならエラー
                return checkLength(text, this.length);
            }
        },
        className: {
            ini: "", //初期値
            replaceable: true,
            targets() {//この要素が必要ならtrueを返す関数
                return false;
            },
            type: "string",
            length: 20,
            format(text) {
                return STUDENT_DEFINE.format(this.type, text);
            },
            check(text) {//値の異常チェック関数，falseならエラー
                return checkLength(text, this.length);
            }
        },
        chargeName: {
            ini: "", //初期値
            replaceable: true,
            targets() {//この要素が必要ならtrueを返す関数
                return false;
            },
            type: "string",
            length: 20,
            format(text) {
                return STUDENT_DEFINE.format(this.type, text);
            },
            check(text) {//値の異常チェック関数，falseならエラー
                return checkLength(text, this.length);
            }
        },
        description: {
            ini: "", //初期値
            replaceable: true,
            targets() {//この要素が必要ならtrueを返す関数
                return false;
            },
            type: "string",
            length: 1000,
            format(text) {
                return STUDENT_DEFINE.format(this.type, text);
            },
            check(text) {//値の異常チェック関数，falseならエラー
                return checkLength(text, this.length);
            }
        },
        sex: {
            ini: 0, //初期値
            replaceable: false,
            targets: () => {//この要素が必要ならtrueを返す関数
                return true;
            },
            type: "number",
            length: 0,
            format(text) {
                return STUDENT_DEFINE.format(this.type, text);
            },
            check(text) {//値の異常チェック関数，falseならエラー
                return isNumber(text, true) && text >= 0 && text <= 3;
            }
        },
        birthday: {
            ini: null, //初期値
            replaceable: true,
            targets: () => {//この要素が必要ならtrueを返す関数
                return true;
            },
            type: "date",
            length: 0,
            format(text) {
                return STUDENT_DEFINE.format(this.type, text);
            },
            check(text) {//値の異常チェック関数，falseならエラー
                let ts = text.split("-");
                if (ts.length !== 3) {
                    return false;
                }
                return text === null || text.length === 10;
            }
        },
    },
};


