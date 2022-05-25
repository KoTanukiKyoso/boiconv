
export const callApi = async (url, arr, self, overlay = true, login = true) => {
    let params = new URLSearchParams();
    if ((!self.user || !self.user.token) && login) {
        self.$store.commit('addMessage', {
            text: "この操作にはログインが必要です．"
        });
        return false;
    } else {
        params.append("token", self.user ? self.user.token : null);
    }
    if (overlay) self.$store.commit('addTask');
    params.append("data", JSON.stringify(arr));
    return await self.$axios.post(url, params).then(response => {
        if (overlay) self.$store.commit('completeTask');
        return response.data;
    }).catch(error => {
        self.$store.commit('addMessage', {
            text: error
        });
        if (overlay) self.$store.commit('completeTask');
        return false;
    });
};

export const callSetTimeout = async (_this, func, time = 5000) => {
    _this.$store.commit('addTask');
    setTimeout(() => {
        if (func) {
            func();
        }
        _this.$store.commit('completeTask');
    }, time);
};

export const isURL = url => {
    const newValue = url;
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    const result1 = pattern.test(newValue);
    if (result1) {
        return true;
    }
    return false;
};
export const isMail = address => {
    if (!address) {
        return false;
    }
    let regex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    if (address.match(regex)) {
        return true;
    }
    return false;
};
export const isNumber = (val, positive = false, forgivePoint = false) => {
    let regex;
    if (positive) {
        if (forgivePoint) {
            regex = new RegExp(/^([1-9]\d*|0)(\.\d+)?$/);
        } else {
            regex = new RegExp(/^[0-9]+$/);
        }
    } else {
        if (forgivePoint) {
            regex = new RegExp(/^[+,-]?([1-9]\d*|0)(\.\d+)?$/);
        } else {
            regex = new RegExp(/^[+,-]?[0-9]+$/);
        }
    }
    return regex.test(val);
};
export const isZenkakuKana = s => {
    return !!s.match(/^[ァ-ヶ０-９0-9ー　 ]*$/);
};
export const isHanEisu = s => {
    s = (s == null) ? "" : s;
    return !!(s.match(/^[A-Za-z0-9]*$/));
};
export const hankana2Zenkana = str => {
    let kanaMap = {
        'ｶﾞ': 'ガ', 'ｷﾞ': 'ギ', 'ｸﾞ': 'グ', 'ｹﾞ': 'ゲ', 'ｺﾞ': 'ゴ',
        'ｻﾞ': 'ザ', 'ｼﾞ': 'ジ', 'ｽﾞ': 'ズ', 'ｾﾞ': 'ゼ', 'ｿﾞ': 'ゾ',
        'ﾀﾞ': 'ダ', 'ﾁﾞ': 'ヂ', 'ﾂﾞ': 'ヅ', 'ﾃﾞ': 'デ', 'ﾄﾞ': 'ド',
        'ﾊﾞ': 'バ', 'ﾋﾞ': 'ビ', 'ﾌﾞ': 'ブ', 'ﾍﾞ': 'ベ', 'ﾎﾞ': 'ボ',
        'ﾊﾟ': 'パ', 'ﾋﾟ': 'ピ', 'ﾌﾟ': 'プ', 'ﾍﾟ': 'ペ', 'ﾎﾟ': 'ポ',
        'ｳﾞ': 'ヴ', 'ﾜﾞ': 'ヷ', 'ｦﾞ': 'ヺ',
        'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
        'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
        'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
        'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
        'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
        'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
        'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
        'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
        'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
        'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン',
        'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
        'ｯ': 'ッ', 'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ',
        '｡': '。', '､': '、', 'ｰ': 'ー', '｢': '「', '｣': '」', '･': '・'
    };
    let reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');
    return str
    .replace(reg, function (match) {
        return kanaMap[match];
    }).replace(/ﾞ/g, '゛').replace(/ﾟ/g, '゜');
};

export const hankaku2Zenkaku = str => {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
};

export const getWEBP = (file, size) => {
    if (!file) {
        return;
    }
    // let filename = file.split(".");
    // filename.pop();
    // filename = filename.join(".");
    // return filename + "_" + size + ".webp";
    return file + "_" + size + ".webp";
};

//HTTP GET の値を取得
export const GetQueryString = () => {
    return GetURLGet(location.href);
};
//指定したURLからHTTP GET の値を取得
export const GetURLGet = url => {
    let result = {};
    let query = url.split("?");
    if (query.length < 2) {
        return result;
    }
    query = query[1];
    let parameters = query.split('&');
    for (let i = 0; i < parameters.length; i++) {
        // パラメータ名とパラメータ値に分割する
        let element = parameters[i].split('=');
        let paramName = decodeURIComponent(element[0]);
        let paramValue = decodeURIComponent(element[1]);
        
        // パラメータ名をキーとして連想配列に追加する
        result[paramName] = paramValue;
    }
    return result;
};
//ブラウザを取得
export const getBrowserName = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('msie') > 0) {
        return "msie";
    } else if (userAgent.indexOf('trident') != -1) {
        return "trident";
    } else if (userAgent.indexOf('edge') != -1) {
        return "edge";
    } else if (userAgent.indexOf('chrome') != -1) {
        return "chrome";
    } else if (userAgent.indexOf('safari') != -1) {
        return "safari";
    } else if (userAgent.indexOf('firefox') != -1) {
        return "firefox";
    } else if (userAgent.indexOf('opera') != -1) {
        return "opera";
    } else {
        return "other";
    }
};

export const getLength = (text) => {
    return Array.from(text).length;
};

// 座標の度分秒（Exif等）を十進に変換
export const convertGPS = point => {
    let val = point[0] / 1 + point[1] / 60 + point[2] / 3600;
    return val;
};

export const toBlob = async (canvas, format = false) => {
    if (canvas.toBlob) {
        let f = (format === "jpg") ? "image/jpeg" : (format === "webp") ? "image/webp" : "image/png";
        // console.log(f);
        return await new Promise(resolve => {
            canvas.toBlob(resolve, f);
        });
    } else if (!format && canvas.msToBlob) {
        return canvas.msToBlob();
    }
    return null;
};

//配列入れ替え
export const swapArray = (array, targetId, sourceId) => {
    return array.reduce((resultArray, element, id, originalArray) => [
        ...resultArray,
        id === targetId ? originalArray[sourceId] :
            id === sourceId ? originalArray[targetId] : element
    ], []);
};

//非同期ファイル読み込み
export const readFileAsync = file => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = () => {
            reject(reader.error);
        };
        reader.readAsText(file);
    });
};

export const getRandom = (length = 10, type = "number") => {
    let rand = "";
    let t, p, num = 10;
    if (type === "number") {
        t = "0123456789";
    } else {
        t = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        num = 62;
    }
    for (let i = 0; i < length; i++) {
        let array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        p = array[0] % num;
        rand += t[p];
    }
    return rand;
};

export const checkLength = (text, length, doTrim = false) => {
    if (!text && text !== "0" && text !== "") {
        return false;
    }
    if (doTrim) {
        text = text.trim();
    }
    return Array.from(text).length <= length;
};

export const copyArray = array => {
    if (Array.isArray(array)) {
        // return array.slice();
        // console.log(123);
        return JSON.parse(JSON.stringify(array));
    } else if (typeof array === "object") {
        // console.log(222);
        return JSON.parse(JSON.stringify(array));
    } else {
        return null;
    }
};
