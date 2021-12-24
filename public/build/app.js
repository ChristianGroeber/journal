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
exports.default = {
  name: "App",
  created: function created() {
    this.$store.dispatch("getEntries");
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._m(0),_vm._v(" "),_c('router-view')],1)}
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

var _vMarkdownEditor = require('v-markdown-editor');

var _vMarkdownEditor2 = _interopRequireDefault(_vMarkdownEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.config.productionTip = false;

_vue2.default.use(_vMarkdownEditor2.default);

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

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "Day",
  props: ["day"],
  computed: {
    formattedDate: function formattedDate() {
      return (0, _moment2.default)(this.day.date).format("D.M.Y");
    },
    content: function content() {
      return atob(this.day.content);
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
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"article"},[_c('h3',{staticClass:"article-head"},[_c('div',[_vm._v(_vm._s(_vm.formattedDate))])]),_vm._v("\n  "+_vm._s(_vm.query)+"\n  "),_c('div',{staticClass:"article-body"},[_c('p',{domProps:{"innerHTML":_vm._s(_vm.content)}})])])}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-cf82b76c"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cf82b76c", __vue__options__)
  } else {
    hotAPI.rerender("data-v-cf82b76c", __vue__options__)
  }
})()}
});

;require.register("src/components/EditEntry.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "EditEntry",
  props: ["entry"],
  created: function created() {
    this.$store.dispatch("getEntry", this.entry);
  },

  computed: {
    markdown: function markdown() {
      console.log(this.$store.getters.editingEntry.raw_content);
      return this.$store.getters.editingEntry.raw_content;
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._v("\n  Edit an entry\n  "),_c('div',{staticClass:"container"},[_c('markdown-editor',{attrs:{"value":_vm.markdown}})],1)])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2fb27a94", __vue__options__)
  } else {
    hotAPI.reload("data-v-2fb27a94", __vue__options__)
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
__vue__options__._scopeId = "data-v-ceeef8a4"
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "MonthList",
  components: {
    Month: _Month2.default
  },
  computed: {
    months: function months() {
      return this.$store.getters.entries;
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',_vm._l((_vm.months),function(month){return _c('div',{key:month.id,staticClass:"month"},[_c('Month',{attrs:{"month":month}})],1)}),0)}
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
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mt-3"},[_c('div',{staticClass:"container h-100"},[_c('div',{staticClass:"row align-items-center h-100"},[_c('div',{staticClass:"col-8 mx-auto"},[_c('div',{staticClass:"jumbotron h-100"},[_c('h3',[_vm._v("Sorry, die Seite wurde nicht gefunden :(")]),_vm._v(" "),_c('hr'),_vm._v(" "),_c('p',{staticClass:"lead"},[_vm._v("\n            Zurück zum "),_c('router-link',{attrs:{"to":"/"}},[_vm._v("Shop")])],1)])])])])])}
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

var _NotFound = require('./components/error/NotFound');

var _NotFound2 = _interopRequireDefault(_NotFound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);
// import EditEntry from "./components/EditEntry";


var routes = [{
    path: '/',
    name: "Home",
    component: _MonthList2.default
},
// {
//     path: '/edit',
//     name: "Edit",
//     props: route => ({ entry: route.query.entry }),
//     component: EditEntry,
// },
{
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

// Module
exports.default = new _vuex2.default.Store({
    modules: {
        months: _months2.default
    }
});
});

;require.register("src/store/modules/months/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var state = {
    entries: [],
    editingEntry: {}
};

var mutations = {
    UPDATE_EDITING_ENTRY: function UPDATE_EDITING_ENTRY(state, payload) {
        state.editingEntry = payload;
    },
    UPDATE_ENTRIES: function UPDATE_ENTRIES(state, payload) {
        state.entries = payload;
    }
};

var actions = {
    getEntries: function getEntries(_ref) {
        var commit = _ref.commit;

        _axios2.default.get('/api/entries').then(function (response) {
            commit('UPDATE_ENTRIES', response.data);
        });
    },
    getEntry: function getEntry(_ref2, payload) {
        _objectDestructuringEmpty(_ref2);

        console.log(payload);
        _axios2.default.get('/api/edit?entry=' + payload).then(function (response) {
            console.log(response.data);
        });
    }
};

var getters = {
    entries: function entries(state) {
        return state.entries;
    },
    editingEntry: function editingEntry(state) {
        return state.editingEntry;
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