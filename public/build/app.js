(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    var val = aliases[name];
    return (val && name !== val) ? expandAlias(val) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("App.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _Loading = require("./src/components/Loading");

var _Loading2 = _interopRequireDefault(_Loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "App",
  components: {
    Loading: _Loading2.default
  },
  computed: {
    isLoading: function isLoading() {
      return this.$store.getters.loading;
    }
  },
  created: function created() {
    var _this = this;

    this.$store.dispatch("getToken");
    this.$store.dispatch("getEntries");
    this.axios.interceptors.request.use(function (config) {
      _this.$store.commit("LOADING", true);
      return config;
    }, function (error) {
      _this.$store.commit("LOADING", false);
      return _promise2.default.reject(error);
    });
    this.axios.interceptors.response.use(function (response) {
      _this.$store.commit("LOADING", false);
      return response;
    }, function (error) {
      _this.$store.commit("LOADING", false);
      return _promise2.default.reject(error);
    });
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.isLoading)?_c('Loading'):_vm._e(),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('router-view')],1)}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"header"},[_c('h1',[_vm._v("2022")])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2e015f16", __vue__options__)
  } else {
    hotAPI.reload("data-v-2e015f16", __vue__options__)
  }
})()}
});

;require.register("main.js", function(exports, require, module) {
'use strict';

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _App = require('./App.vue');

var _App2 = _interopRequireDefault(_App);

var _store = require('./src/store');

var _store2 = _interopRequireDefault(_store);

var _routes = require('./src/routes');

var _vueAxios = require('vue-axios');

var _vueAxios2 = _interopRequireDefault(_vueAxios);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Editor from "v-markdown-editor";

_vue2.default.config.productionTip = false;
_vue2.default.use(_vueAxios2.default, _axios2.default);

// Vue.use(Editor);

new _vue2.default({
  store: _store2.default,
  router: _routes.router,
  render: function render(h) {
    return h(_App2.default);
  }
}).$mount('#app');
});

;require.register("src/components/Loading.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "Loading"
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"loader"},[_c('div',{staticClass:"loading-wrapper"},[_c('div',{staticClass:"lds-ellipsis"},[_c('div'),_vm._v(" "),_c('div'),_vm._v(" "),_c('div'),_vm._v(" "),_c('div')])])])}]
__vue__options__._scopeId = "data-v-c1a3922c"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c1a3922c", __vue__options__)
  } else {
    hotAPI.reload("data-v-c1a3922c", __vue__options__)
  }
})()}
});

;require.register("src/components/admin/AdminBar.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _EditSpecificEntry = require("./EditSpecificEntry.vue");

var _EditSpecificEntry2 = _interopRequireDefault(_EditSpecificEntry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "AdminBar",
  components: {
    editSpecificEntry: _EditSpecificEntry2.default
  },
  methods: {
    editCurrent: function editCurrent() {
      var _this = this;

      _axios2.default.get("/api/edit/current?token=" + this.$store.getters.token).then(function (response) {
        _this.$router.push("/edit?entry=" + response.data.entryId);
      });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"admin-bar"},[_c('h3',[_vm._v("Welcome Admin")]),_vm._v(" "),_c('div',{staticClass:"actions"},[_c('button',{on:{"click":_vm.editCurrent}},[_vm._v("Edit Current Entry")]),_vm._v(" "),_c('edit-specific-entry'),_vm._v(" "),_c('router-link',{staticClass:"btn",attrs:{"to":"/auth"}},[_vm._v("Auth")])],1)])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-687af3c6", __vue__options__)
  } else {
    hotAPI.rerender("data-v-687af3c6", __vue__options__)
  }
})()}
});

;require.register("src/components/admin/EditSpecificEntry.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      dateEntry: (0, _moment2.default)().format("yyyy-MM-DD"),
      showDatePicker: false
    };
  },
  methods: {
    toggleShowDatePicker: function toggleShowDatePicker() {
      this.showDatePicker = !this.showDatePicker;
    },
    editSpecificEntry: function editSpecificEntry() {
      var _this = this;

      _axios2.default.get("/api/create?token=" + this.$store.getters.token + '&entry=' + this.dateEntry).then(function (response) {
        _this.$router.push("/edit?entry=" + response.data.entryId);
      });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(!_vm.showDatePicker)?_c('button',{on:{"click":function($event){return _vm.toggleShowDatePicker()}}},[_vm._v("Edit Specific Entry")]):_vm._e(),_vm._v(" "),(_vm.showDatePicker)?_c('div',{attrs:{"id":"date-picker"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.dateEntry),expression:"dateEntry"}],attrs:{"type":"text"},domProps:{"value":(_vm.dateEntry)},on:{"input":function($event){if($event.target.composing){ return; }_vm.dateEntry=$event.target.value}}}),_vm._v(" "),_c('button',{on:{"click":function($event){return _vm.toggleShowDatePicker()}}},[_vm._v("X")]),_vm._v(" "),_c('button',{on:{"click":function($event){return _vm.editSpecificEntry()}}},[_vm._v("Submit")])]):_vm._e()])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-876f1338", __vue__options__)
  } else {
    hotAPI.rerender("data-v-876f1338", __vue__options__)
  }
})()}
});

;require.register("src/components/admin/Editor/EditEntry.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: ["entry"],
  created: function created() {
    this.$store.dispatch("getEntry", {
      entry: this.entry,
      token: this.$store.getters.token
    });
  },

  computed: {
    markdown: function markdown() {
      return this.$store.getters.editingEntry.raw_content;
    }
  },
  methods: {
    save: function save() {
      var _this = this;

      var newContent = this.$refs.editEntry.value;
      var entry = this.$store.getters.editingEntry;
      entry.raw_content = newContent;
      this.$store.dispatch("updateEntry", {
        entry: entry,
        token: this.$store.getters.token
      }).then(function () {
        _this.$store.dispatch("getEntries");
      });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"main-content"},[_c('div',{staticStyle:{"margin":"1rem 0"}},[_c('router-link',{staticClass:"btn",attrs:{"to":'/'}},[_vm._v("Return")])],1),_vm._v(" "),_c('div',{staticClass:"container"},[_c('textarea',{ref:"editEntry",staticClass:"edit-entry",domProps:{"value":_vm.markdown}}),_vm._v(" "),_c('div',{staticClass:"actions"},[_c('button',{on:{"click":_vm.save}},[_vm._v("Save")])])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c7e15e70", __vue__options__)
  } else {
    hotAPI.reload("data-v-c7e15e70", __vue__options__)
  }
})()}
});

;require.register("src/components/admin/Editor/Editor.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _EditEntry = require('./EditEntry.vue');

var _EditEntry2 = _interopRequireDefault(_EditEntry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    components: {
        EditEntry: _EditEntry2.default
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"main-content"},[_c('Editor')],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c8689646", __vue__options__)
  } else {
    hotAPI.rerender("data-v-c8689646", __vue__options__)
  }
})()}
});

;require.register("src/components/admin/Editor/Images/Image.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div')}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-365b64d4", __vue__options__)
  } else {
    hotAPI.reload("data-v-365b64d4", __vue__options__)
  }
})()}
});

;require.register("src/components/admin/Editor/Images/ImageEditor.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _from = require("babel-runtime/core-js/array/from");

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  methods: {
    uploadImages: function uploadImages(e) {
      var _this = this;

      console.log(e.target.files);
      var formData = new FormData();
      (0, _from2.default)(e.target.files).forEach(function (img) {
        console.log(img);
        formData.append((0, _from2.default)(e.target.files).indexOf(img), img);
      });
      formData.append("entry", this.entry);
      formData.append("token", this.$store.getters.token);
      console.log(formData);
      axios.post("/api/entry/gallery/upload", formData).then(function (response) {
        var images = response.data.files;
        images.forEach(function (img) {
          _this.$refs.editEntry.value += "![uploaded image](" + encodeURI(img) + ")";
        });
      });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('input',{attrs:{"accept":"image/*","type":"file","label":"Upload Images","multiple":""},on:{"change":_vm.uploadImages}})])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-086946e1", __vue__options__)
  } else {
    hotAPI.reload("data-v-086946e1", __vue__options__)
  }
})()}
});

;require.register("src/components/admin/Editor/Images/ImageList.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div')}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d03106dc", __vue__options__)
  } else {
    hotAPI.reload("data-v-d03106dc", __vue__options__)
  }
})()}
});

;require.register("src/routes.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.router = undefined;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _MonthList = require('./components/MonthList');

var _MonthList2 = _interopRequireDefault(_MonthList);

var _Login = require('./components/auth/Login');

var _Login2 = _interopRequireDefault(_Login);

var _RestorePassword = require('./components/auth/RestorePassword');

var _RestorePassword2 = _interopRequireDefault(_RestorePassword);

var _RequestNewPassword = require('./components/auth/RequestNewPassword');

var _RequestNewPassword2 = _interopRequireDefault(_RequestNewPassword);

var _ChangePassword = require('./components/auth/ChangePassword');

var _ChangePassword2 = _interopRequireDefault(_ChangePassword);

var _Register = require('./components/auth/Register');

var _Register2 = _interopRequireDefault(_Register);

var _GenerateNewToken = require('./components/auth/GenerateNewToken');

var _GenerateNewToken2 = _interopRequireDefault(_GenerateNewToken);

var _Auth = require('./components/auth/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

var _Editor = require('./components/admin/Editor/Editor');

var _Editor2 = _interopRequireDefault(_Editor);

var _NotFound = require('./components/error/NotFound');

var _NotFound2 = _interopRequireDefault(_NotFound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);

var routes = [{
    path: '/',
    name: "Home",
    component: _MonthList2.default
}, {
    path: '/edit',
    name: "Edit",
    props: function props(route) {
        return { entry: route.query.entry };
    },
    component: _Editor2.default
}, {
    path: '/auth',
    name: "Auth",
    component: _Auth2.default
}, {
    path: '/auth/login',
    name: "Login",
    component: _Login2.default
}, {
    path: '/auth/register',
    name: "Register",
    component: _Register2.default
}, {
    path: '/auth/restore-password',
    name: "Restore Password",
    component: _RestorePassword2.default
}, {
    path: '/auth/request-new-password',
    name: "Request New Password",
    component: _RequestNewPassword2.default
}, {
    path: '/auth/change-password',
    name: "Change Password",
    component: _ChangePassword2.default
}, {
    path: '/auth/generate-new-token',
    name: "Generate New Token",
    component: _GenerateNewToken2.default
}, {
    path: "*",
    name: "notFound",
    component: _NotFound2.default
}];

var router = exports.router = new _vueRouter2.default({
    mode: 'history',
    routes: routes
});
});

;require.register("src/store/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vuex = require('vuex');

var _vuex2 = _interopRequireDefault(_vuex);

var _months = require('./modules/months/');

var _months2 = _interopRequireDefault(_months);

var _auth = require('./modules/auth/');

var _auth2 = _interopRequireDefault(_auth);

var _main = require('./modules/main/');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

// Module
exports.default = new _vuex2.default.Store({
    modules: {
        main: _main2.default,
        months: _months2.default,
        auth: _auth2.default
    }
});
});

;require.register("src/store/modules/auth/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actions;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var state = {
    token: null
};

var mutations = {
    UPDATE_TOKEN: function UPDATE_TOKEN(state, payload) {
        localStorage.setItem('token', payload);
        state.token = payload;
    }
};

var actions = (_actions = {
    register: function register(payload) {
        var queryString = Object.keys(payload).map(function (key) {
            return key + '=' + payload[key];
        }).join('&');
        return (0, _axios2.default)({
            method: 'POST',
            url: '/api/auth/register',
            data: queryString,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    changePassword: function changePassword(_ref, payload) {
        var commit = _ref.commit;

        var queryString = Object.keys(payload).map(function (key) {
            return key + '=' + payload[key];
        }).join('&');
        return (0, _axios2.default)({
            method: 'POST',
            url: '/api/auth/change-password',
            data: queryString,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            commit('UPDATE_TOKEN', response.data.token);
        });
    },
    requestNewPassword: function requestNewPassword(_ref2, payload) {
        var commit = _ref2.commit;

        var queryString = Object.keys(payload).map(function (key) {
            return key + '=' + payload[key];
        }).join('&');
        return (0, _axios2.default)({
            method: 'POST',
            url: '/api/auth/request-new-password',
            data: queryString,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    restorePassword: function restorePassword(_ref3, payload) {
        var commit = _ref3.commit;

        var queryString = Object.keys(payload).map(function (key) {
            return key + '=' + payload[key];
        }).join('&');
        return (0, _axios2.default)({
            method: 'POST',
            url: '/api/auth/restore-password',
            data: queryString,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            commit('UPDATE_TOKEN', response.data.token);
        });
    },
    generateNewToken: function generateNewToken(_ref4, payload) {
        var commit = _ref4.commit;

        var queryString = Object.keys(payload).map(function (key) {
            return key + '=' + payload[key];
        }).join('&');
        return (0, _axios2.default)({
            method: 'POST',
            url: '/api/auth/generate-new-token',
            data: queryString,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            commit('UPDATE_TOKEN', response.data.token);
        });
    }
}, _defineProperty(_actions, 'register', function register(_ref5, payload) {
    var commit = _ref5.commit;

    var queryString = Object.keys(payload).map(function (key) {
        return key + '=' + payload[key];
    }).join('&');
    return (0, _axios2.default)({
        method: 'POST',
        url: '/api/auth/register',
        data: queryString,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (response) {
        commit('UPDATE_TOKEN', response.data.token);
    });
}), _defineProperty(_actions, 'login', function login(_ref6, payload) {
    var commit = _ref6.commit;

    var queryString = Object.keys(payload).map(function (key) {
        return key + '=' + payload[key];
    }).join('&');
    return (0, _axios2.default)({
        method: 'POST',
        url: '/api/login',
        data: queryString,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (response) {
        commit('UPDATE_TOKEN', response.data.token);
    });
}), _defineProperty(_actions, 'getToken', function getToken(_ref7) {
    var commit = _ref7.commit;

    var token = localStorage.getItem('token');
    if (token) {
        commit('UPDATE_TOKEN', token);
    }
}), _defineProperty(_actions, 'logout', function logout(_ref8) {
    var commit = _ref8.commit;

    commit('UPDATE_TOKEN', null);
    localStorage.removeItem('token');
}), _actions);

var getters = {
    token: function token(state) {
        return state.token;
    }
};

var authModule = {
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
};

exports.default = authModule;
});

require.register("src/store/modules/main/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var state = {
    isLoading: false
};

var mutations = {
    LOADING: function LOADING(state, isLoading) {
        state.isLoading = isLoading;
    }
};

var actions = {};

var getters = {
    loading: function loading(state) {
        return state.isLoading;
    }
};

var mainModule = {
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
};

exports.default = mainModule;
});

require.register("src/store/modules/months/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
    entries: [],
    editingEntry: {},
    editingGallery: {}
};

var mutations = {
    UPDATE_EDITING_ENTRY: function UPDATE_EDITING_ENTRY(state, payload) {
        state.editingEntry = payload;
    },
    UPDATE_ENTRIES: function UPDATE_ENTRIES(state, payload) {
        state.entries = payload;
    },
    UPDATE_EDITING_GALLERY: function UPDATE_EDITING_GALLERY(state, payload) {
        state.editingGallery = payload;
    }
};

var actions = {
    getEntries: function getEntries(_ref) {
        var commit = _ref.commit;

        _axios2.default.get('/api/entries').then(function (response) {
            commit('UPDATE_ENTRIES', response.data);
        });
    },
    updateEntry: function updateEntry(_ref2, payload) {
        var commit = _ref2.commit;

        commit('UPDATE_EDITING_ENTRY', payload.entry);
        var data = {
            token: payload.token,
            content: btoa(payload.entry.raw_content),
            entry: payload.entry.id
        };
        var queryString = Object.keys(data).map(function (key) {
            return key + '=' + data[key];
        }).join('&');
        return (0, _axios2.default)({
            method: 'post',
            url: '/api/edit',
            data: queryString,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    getEntry: function getEntry(_ref3, payload) {
        var commit = _ref3.commit;

        _axios2.default.get('/api/edit?entry=' + payload.entry + '&token=' + payload.token).then(function (response) {
            commit('UPDATE_EDITING_ENTRY', response.data);
        });
    },
    getGallery: function getGallery(_ref4, payload) {
        var commit = _ref4.commit;

        _axios2.default.get('/api/entry/gallery?page=' + payload.entry).then(function (response) {
            commit('UPDATE_EDITING_GALLERY', response.data);
        });
    }
};

var getters = {
    entries: function entries(state) {
        return state.entries;
    },
    editingEntry: function editingEntry(state) {
        return state.editingEntry;
    },
    gallery: function gallery(state) {
        return state.editingGallery;
    }
};

var monthsModule = {
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
};

exports.default = monthsModule;
});

require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map