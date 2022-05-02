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

;require.register("src/components/Day.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require("babel-runtime/core-js/object/entries");

var _entries2 = _interopRequireDefault(_entries);

var _marked = require("marked");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "Day",
  props: ["day"],
  computed: {
    formattedDate: function formattedDate() {
      return this.day.meta.title;
    },
    content: function content() {
      return _marked.marked.parse(this.day.raw_content);
    },
    canEdit: function canEdit() {
      return this.$store.getters.token !== null;
    },
    query: function query() {
      var q = { entry: this.day.id };
      var query = (0, _entries2.default)(q).map(function (_ref) {
        var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
            key = _ref2[0],
            val = _ref2[1];

        return key + "=" + val;
      }).join("&");
      return query;
    }
  },
  methods: {
    deleteEntry: function deleteEntry() {
      var _this = this;

      var doDelete = confirm('Are you sure you want to delete this entry');
      if (doDelete) {
        this.$store.dispatch("deleteEntry", this.day.id).then(function (response) {
          _this.$store.dispatch("getEntries");
        });
      }
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"article"},[_c('div',{staticClass:"article-head"},[_c('h3',[_vm._v(_vm._s(_vm.formattedDate))]),_vm._v(" "),_c('div',[(_vm.canEdit)?_c('button',{staticClass:"btn btn-delete",on:{"click":_vm.deleteEntry}},[_vm._v("\n        Delete\n      ")]):_vm._e(),_vm._v(" "),(_vm.canEdit)?_c('router-link',{staticClass:"btn edit-button",attrs:{"to":'/edit?' + _vm.query}},[_vm._v("Edit")]):_vm._e()],1)]),_vm._v(" "),_c('div',{staticClass:"article-body"},[_c('p',{domProps:{"innerHTML":_vm._s(_vm.content)}})])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cf82b76c", __vue__options__)
  } else {
    hotAPI.reload("data-v-cf82b76c", __vue__options__)
  }
})()}
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

;require.register("src/components/Month.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Day = require("./Day");

var _Day2 = _interopRequireDefault(_Day);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "Month",
  props: ["month"],
  components: {
    Day: _Day2.default
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('h2',{staticClass:"month"},[_vm._v(_vm._s(_vm.month.name))]),_vm._v(" "),_c('div',{staticClass:"article-list container"},_vm._l((_vm.month.days),function(day,index){return _c('div',{key:index},[_c('Day',{attrs:{"day":day}})],1)}),0)])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ceeef8a4", __vue__options__)
  } else {
    hotAPI.reload("data-v-ceeef8a4", __vue__options__)
  }
})()}
});

;require.register("src/components/MonthList.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Month = require("./Month");

var _Month2 = _interopRequireDefault(_Month);

var _AdminBar = require("./admin/AdminBar");

var _AdminBar2 = _interopRequireDefault(_AdminBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "MonthList",
  components: {
    Month: _Month2.default,
    AdminBar: _AdminBar2.default
  },
  computed: {
    months: function months() {
      return this.$store.getters.entries;
    },
    canEdit: function canEdit() {
      return this.$store.getters.token !== null;
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"main-content"},[(_vm.canEdit)?_c('AdminBar'):_vm._e(),_vm._v(" "),_vm._l((_vm.months),function(month){return _c('div',{key:month.id,staticClass:"month"},[_c('Month',{attrs:{"month":month}})],1)})],2)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6354c328", __vue__options__)
  } else {
    hotAPI.reload("data-v-6354c328", __vue__options__)
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

var _DownloadBackup = require("./DownloadBackup.vue");

var _DownloadBackup2 = _interopRequireDefault(_DownloadBackup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "AdminBar",
  components: {
    editSpecificEntry: _EditSpecificEntry2.default,
    DownloadBackup: _DownloadBackup2.default
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
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"admin-bar"},[_c('h3',[_vm._v("Welcome Admin")]),_vm._v(" "),_c('div',{staticClass:"actions"},[_c('button',{on:{"click":_vm.editCurrent}},[_vm._v("Edit Current Entry")]),_vm._v(" "),_c('DownloadBackup'),_vm._v(" "),_c('edit-specific-entry'),_vm._v(" "),_c('router-link',{staticClass:"btn",attrs:{"to":"/auth"}},[_vm._v("Auth")])],1)])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-687af3c6", __vue__options__)
  } else {
    hotAPI.reload("data-v-687af3c6", __vue__options__)
  }
})()}
});

;require.register("src/components/admin/DownloadBackup.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  methods: {
    generateBackup: function generateBackup() {
      _axios2.default.get("/api/admin/generate-backup?token=" + this.$store.getters.token).then(function (response) {
        location.href = response.data.file;
      });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('button',{on:{"click":function($event){return _vm.generateBackup()}}},[_vm._v("Backup")])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1dab336c", __vue__options__)
  } else {
    hotAPI.reload("data-v-1dab336c", __vue__options__)
  }
})()}
});

;require.register("src/components/admin/EditEntry.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _from = require("babel-runtime/core-js/array/from");

var _from2 = _interopRequireDefault(_from);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    },
    uploadImages: function uploadImages(e) {
      var _this2 = this;

      console.log(e.target.files);
      var formData = new FormData();
      (0, _from2.default)(e.target.files).forEach(function (img) {
        console.log(img);
        formData.append((0, _from2.default)(e.target.files).indexOf(img), img);
      });
      formData.append("entry", this.entry);
      formData.append("token", this.$store.getters.token);
      console.log(formData);
      _axios2.default.post("/api/entry/gallery/upload", formData).then(function (response) {
        var images = response.data.files;
        images.forEach(function (img) {
          _this2.$refs.editEntry.value += "![uploaded image](" + encodeURI(img) + ")";
        });
      });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"main-content"},[_c('div',{staticStyle:{"margin":"1rem 0"}},[_c('router-link',{staticClass:"btn",attrs:{"to":'/'}},[_vm._v("Return")])],1),_vm._v(" "),_c('div',{staticClass:"container"},[_c('textarea',{ref:"editEntry",staticClass:"edit-entry",domProps:{"value":_vm.markdown}}),_vm._v(" "),_c('div',{staticClass:"actions"},[_c('input',{attrs:{"accept":"image/*","type":"file","label":"Upload Images","multiple":""},on:{"change":_vm.uploadImages}}),_vm._v(" "),_c('button',{on:{"click":_vm.save}},[_vm._v("Save")])])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cd4d9914", __vue__options__)
  } else {
    hotAPI.reload("data-v-cd4d9914", __vue__options__)
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
    hotAPI.reload("data-v-876f1338", __vue__options__)
  }
})()}
});

;require.register("src/components/auth/Auth.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Logout = require("./Logout");

var _Logout2 = _interopRequireDefault(_Logout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {
    Logout: _Logout2.default
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"main-content"},[_c('div',{staticClass:"d-flex gap-1"},[_c('router-link',{staticClass:"btn",attrs:{"to":"/"}},[_vm._v("Home")]),_vm._v(" "),_c('router-link',{staticClass:"btn",attrs:{"to":"/auth/login"}},[_vm._v("Login")]),_vm._v(" "),_c('router-link',{staticClass:"btn",attrs:{"to":"/auth/restore-password"}},[_vm._v("Restore Password")]),_vm._v(" "),_c('router-link',{staticClass:"btn",attrs:{"to":"/auth/change-password"}},[_vm._v("Change Password")]),_vm._v(" "),_c('router-link',{staticClass:"btn",attrs:{"to":"/auth/generate-new-token"}},[_vm._v("Generate New Token")]),_vm._v(" "),_c('router-link',{staticClass:"btn",attrs:{"to":"/auth/request-new-password"}},[_vm._v("Request New Password")]),_vm._v(" "),_c('Logout')],1)])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-aad876c6", __vue__options__)
  } else {
    hotAPI.reload("data-v-aad876c6", __vue__options__)
  }
})()}
});

;require.register("src/components/auth/ChangePassword.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  data: function data() {
    return {
      username: "",
      currentPassword: "",
      newPassword1: "",
      newPassword2: ""
    };
  },
  methods: {
    submit: function submit() {
      var _this = this;

      this.$store.dispatch("changePassword", {
        username: this.username,
        currentPassword: this.currentPassword,
        newPassword1: this.newPassword1,
        newPassword2: this.newPassword2
      }).then(function () {
        _this.$router.push('/');
      });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"main-content"},[_c('div',[_c('router-link',{staticClass:"btn",attrs:{"to":"/auth"}},[_vm._v("Return")])],1),_vm._v(" "),_c('form',{on:{"submit":function($event){$event.preventDefault();return _vm.submit.apply(null, arguments)}}},[_c('div',{staticClass:"form-row"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.username),expression:"username"}],attrs:{"placeholder":"Username","type":"text"},domProps:{"value":(_vm.username)},on:{"input":function($event){if($event.target.composing){ return; }_vm.username=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.currentPassword),expression:"currentPassword"}],attrs:{"placeholder":"Current Password","type":"password"},domProps:{"value":(_vm.currentPassword)},on:{"input":function($event){if($event.target.composing){ return; }_vm.currentPassword=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.newPassword1),expression:"newPassword1"}],attrs:{"placeholder":"Password","type":"password"},domProps:{"value":(_vm.newPassword1)},on:{"input":function($event){if($event.target.composing){ return; }_vm.newPassword1=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.newPassword2),expression:"newPassword2"}],attrs:{"placeholder":"Repeat Password","type":"password"},domProps:{"value":(_vm.newPassword2)},on:{"input":function($event){if($event.target.composing){ return; }_vm.newPassword2=$event.target.value}}})]),_vm._v(" "),_c('button',{staticClass:"mt-1",attrs:{"type":"submit"}},[_vm._v("Submit")])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-628f3fa0", __vue__options__)
  } else {
    hotAPI.reload("data-v-628f3fa0", __vue__options__)
  }
})()}
});

;require.register("src/components/auth/GenerateNewToken.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  data: function data() {
    return {
      username: ""
    };
  },
  methods: {
    submit: function submit() {
      this.$store.dispatch("generateNewToken", {
        username: this.username,
        token: this.$store.getters.getToken
      });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"main-content"},[_c('div',[_c('router-link',{staticClass:"btn",attrs:{"to":"/auth"}},[_vm._v("Return")])],1),_vm._v(" "),_c('form',{on:{"submit":function($event){$event.preventDefault();return _vm.submit.apply(null, arguments)}}},[_c('div',[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.username),expression:"username"}],attrs:{"placeholder":"Username","type":"text"},domProps:{"value":(_vm.username)},on:{"input":function($event){if($event.target.composing){ return; }_vm.username=$event.target.value}}}),_vm._v(" "),_c('br')]),_vm._v(" "),_c('button',{staticClass:"mt-1",attrs:{"type":"submit"}},[_vm._v("Submit")])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5d56cd7a", __vue__options__)
  } else {
    hotAPI.reload("data-v-5d56cd7a", __vue__options__)
  }
})()}
});

;require.register("src/components/auth/Login.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  data: function data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login: function login() {
      var _this = this;

      this.$store.dispatch("login", {
        username: this.username,
        password: this.password
      }).then(function () {
        _this.$router.push("/");
      });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"main-content"},[_c('div',[_c('router-link',{staticClass:"btn",attrs:{"to":"/auth"}},[_vm._v("Return")])],1),_vm._v(" "),_c('h1',[_vm._v("LOGIN")]),_vm._v(" "),_c('form',{on:{"submit":function($event){$event.preventDefault();return _vm.login.apply(null, arguments)}}},[_c('div',{staticClass:"form-row"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.username),expression:"username"}],attrs:{"placeholder":"username"},domProps:{"value":(_vm.username)},on:{"input":function($event){if($event.target.composing){ return; }_vm.username=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.password),expression:"password"}],attrs:{"placeholder":"password","type":"password"},domProps:{"value":(_vm.password)},on:{"input":function($event){if($event.target.composing){ return; }_vm.password=$event.target.value}}})]),_vm._v(" "),_c('button',{attrs:{"type":"submit"}},[_vm._v("Login")])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2610ee78", __vue__options__)
  } else {
    hotAPI.reload("data-v-2610ee78", __vue__options__)
  }
})()}
});

;require.register("src/components/auth/Logout.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  methods: {
    logout: function logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('button',{on:{"click":_vm.logout}},[_vm._v("Logout")])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-01eacf82", __vue__options__)
  } else {
    hotAPI.reload("data-v-01eacf82", __vue__options__)
  }
})()}
});

;require.register("src/components/auth/Register.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  data: function data() {
    return {
      username: "",
      email: "",
      password1: "",
      password2: ""
    };
  },
  methods: {
    submit: function submit() {
      console.log(this.username, this.email, this.password1, this.password2);
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"main-content"},[_c('div',[_c('router-link',{staticClass:"btn",attrs:{"to":"/auth"}},[_vm._v("Return")])],1),_vm._v(" "),_c('form',{on:{"submit":function($event){$event.preventDefault();return _vm.submit.apply(null, arguments)}}},[_c('div',{staticClass:"form-row"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.username),expression:"username"}],attrs:{"placeholder":"Username","type":"text"},domProps:{"value":(_vm.username)},on:{"input":function($event){if($event.target.composing){ return; }_vm.username=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.email),expression:"email"}],attrs:{"placeholder":"Email","type":"email"},domProps:{"value":(_vm.email)},on:{"input":function($event){if($event.target.composing){ return; }_vm.email=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.password1),expression:"password1"}],attrs:{"placeholder":"Password","type":"password"},domProps:{"value":(_vm.password1)},on:{"input":function($event){if($event.target.composing){ return; }_vm.password1=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.password2),expression:"password2"}],attrs:{"placeholder":"Repeat Password","type":"password"},domProps:{"value":(_vm.password2)},on:{"input":function($event){if($event.target.composing){ return; }_vm.password2=$event.target.value}}})]),_vm._v(" "),_c('button',{staticClass:"mt-1",attrs:{"type":"submit"}},[_vm._v("Submit")])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4fb4acd0", __vue__options__)
  } else {
    hotAPI.reload("data-v-4fb4acd0", __vue__options__)
  }
})()}
});

;require.register("src/components/auth/RequestNewPassword.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  data: function data() {
    return {
      username: ""
    };
  },
  methods: {
    submit: function submit() {
      this.$store.dispatch("requestNewPassword", { username: this.username });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"main-content"},[_c('div',[_c('router-link',{staticClass:"btn",attrs:{"to":"/auth"}},[_vm._v("Return")])],1),_vm._v(" "),_c('form',{on:{"submit":function($event){$event.preventDefault();return _vm.submit.apply(null, arguments)}}},[_c('div',[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.username),expression:"username"}],attrs:{"placeholder":"Username","id":"username","type":"text"},domProps:{"value":(_vm.username)},on:{"input":function($event){if($event.target.composing){ return; }_vm.username=$event.target.value}}}),_vm._v(" "),_c('br')]),_vm._v(" "),_c('button',{staticClass:"mt-1",attrs:{"type":"submit"}},[_vm._v("Submit")])])])}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-bb5ce6fe"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bb5ce6fe", __vue__options__)
  } else {
    hotAPI.reload("data-v-bb5ce6fe", __vue__options__)
  }
})()}
});

;require.register("src/components/auth/RestorePassword.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  data: function data() {
    return {
      username: "",
      password1: "",
      password2: ""
    };
  },
  methods: {
    submit: function submit() {
      var _this = this;

      var queryString = window.location.search;
      var urlParams = new URLSearchParams(queryString);
      this.$store.dispatch("restorePassword", {
        username: this.username,
        password1: this.password1,
        password2: this.password2,
        token: urlParams.get('token')
      }).then(function () {
        _this.$router.push('/');
      });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"main-content"},[_c('div',[_c('router-link',{staticClass:"btn",attrs:{"to":"/auth"}},[_vm._v("Return")])],1),_vm._v(" "),_c('form',{on:{"submit":function($event){$event.preventDefault();return _vm.submit.apply(null, arguments)}}},[_c('div',{staticClass:"form-row"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.username),expression:"username"}],attrs:{"placeholder":"Username","type":"text"},domProps:{"value":(_vm.username)},on:{"input":function($event){if($event.target.composing){ return; }_vm.username=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.password1),expression:"password1"}],attrs:{"placeholder":"New Password","type":"password"},domProps:{"value":(_vm.password1)},on:{"input":function($event){if($event.target.composing){ return; }_vm.password1=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.password2),expression:"password2"}],attrs:{"placeholder":"Repeat New Password","type":"password"},domProps:{"value":(_vm.password2)},on:{"input":function($event){if($event.target.composing){ return; }_vm.password2=$event.target.value}}})]),_vm._v(" "),_c('button',{staticClass:"mt-1",attrs:{"type":"submit"}},[_vm._v("Submit")])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2a0b9638", __vue__options__)
  } else {
    hotAPI.reload("data-v-2a0b9638", __vue__options__)
  }
})()}
});

;require.register("src/components/error/NotFound.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "NotFound"
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mt-3"},[_c('div',{staticClass:"container h-100"},[_c('div',{staticClass:"row align-items-center h-100"},[_c('div',{staticClass:"col-8 mx-auto"},[_c('div',{staticClass:"jumbotron h-100"},[_c('h3',[_vm._v("Sorry, this page could not be found :(")]),_vm._v(" "),_c('hr'),_vm._v(" "),_c('p',{staticClass:"lead"},[_vm._v("\n            Return "),_c('router-link',{attrs:{"to":"/"}},[_vm._v("Home")])],1)])])])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-282a4a58", __vue__options__)
  } else {
    hotAPI.reload("data-v-282a4a58", __vue__options__)
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

var _EditEntry = require('./components/admin/EditEntry');

var _EditEntry2 = _interopRequireDefault(_EditEntry);

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
    component: _EditEntry2.default
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
  deleteEntry: function deleteEntry(_ref4, payload) {
    var commit = _ref4.commit;

    return _axios2.default.delete('/api/admin/delete?entryId=' + payload);
  },
  getGallery: function getGallery(_ref5, payload) {
    var commit = _ref5.commit;

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

;require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map