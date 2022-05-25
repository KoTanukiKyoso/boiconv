export const state = () => ({
  user: null,
  status: false,
  endFirstAuth: false,
  endGettingUser: false,
  values: {
    title: "BOICONV",
    apiRoot: process.env.NODE_ENV === 'production' ?
        'https://service.nexsjp.com/boiconv/api/' : 'http://localhost/project/boiconv/api/',
    storageRoot: "public/images/min/",
    storageGetRoot: "https://storage.googleapis.com//",
    backColor: "#f8f9fc",
    freePage: false,
    printing: false,
  },
  messages: [],
  tasks: 0,
});

export const mutations = {
  resetAuth(state) {
    state.user = null;
    state.status = false;
    state.endFirstAuth = false;
    state.endGettingUser = false;
  },
  endGettingUser(state) {
    state.endGettingUser = true;
  },
  onAuthStateChanged(state, user) {
    if (!user) {
      state.user = null;
      state.status = false;
      state.endFirstAuth = true;
      return;
    }
    state.status = true;
    if (!state.user) {
      state.user = {};
    }
    let _user = {...state.user};
    for (let k in user) {
      _user[k] = user[k]; //firebaseが返したユーザー情報
    }
    state.user = _user;
    state.endFirstAuth = true;
  },
  onUserStatusChanged(state, status) {
    state.status = status; //ログインしてるかどうか true or false
    //TODO:ログイン処理　accountまで欲しい場合以下を消す
    // state.endFirstAuth = true;
  },
  updateUserName(state, name) {
    state.user.displayName = name;
  },
  set(state, status) {
    state.values[status.key] = status.val;
  },
  addMessage: (state, message) => {
    if (!message.dismissible) {
      message.dismissible = false;
    }
    if (!message.time) {
      message.time = 2.5;
    }
    if (message.risk !== 0 && !message.risk) {
      message.risk = 3;
    }
    state.messages.push(message);
  },
  removeMessage: (state) => {
    state.messages.shift();
  },
  addTask: (state) => {
    state.tasks++;
  },
  completeTask: (state) => {
    state.tasks--;
  },
};

export const getters = {
  user: state => {
    return state.user;
  },
  isSignedIn: state => {
    return state.status;
  },
  get: state => {
    return state.values;
  },
  endFirstAuth: state => {
    return state.endFirstAuth;
  },
  endGettingUser: state => {
    return state.endGettingUser;
  },
  getMessages: state => {
    return state.messages;
  },
  tasks: state => {
    return state.tasks;
  },
};
