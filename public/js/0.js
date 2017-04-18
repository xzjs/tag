webpackJsonp([0],{

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(123)

/* script */
__vue_exports__ = __webpack_require__(117)

/* template */
var __vue_template__ = __webpack_require__(121)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Applications/MAMP/htdocs/tag/resources/assets/js/components/Main.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-d3061624"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d3061624", __vue_options__)
  } else {
    hotAPI.reload("data-v-d3061624", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] Main.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),

/***/ 115:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;
	var sourceMap = obj.sourceMap;

	if (media) {
		styleElement.setAttribute("media", media);
	}

	if (sourceMap) {
		// https://developer.chrome.com/devtools/docs/javascript-debugging
		// this makes source maps inside style tags work properly in Chrome
		css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}


/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            value: 'leiphone.com',
            articles: [],
            key: null,
            word: null,
            tag: null,
            progress: {
                'leiphone.com': [0, 1],
                'baijia.baidu.com': [0, 1],
                'toutiao.io': [0, 1]
            }
        };
    },

    computed: {
        tags: function tags() {
            if (this.word != null) {
                return this.word.tags;
            }
            return [];
        },
        user: function user() {
            return this.$store.state.user;
        },
        percent: function percent() {
            var arr = [];
            for (var key in this.progress) {
                if (this.progress[key][1] == 0) {
                    arr.push(0);
                } else {
                    arr.push(this.progress[key][0] / this.progress[key][1] * 100);
                }
            }
            return arr;
        }
    },
    methods: {
        getArticles: function getArticles() {
            var vm = this;
            axios.post('article_list', { source: this.value }).then(function (response) {
                vm.articles = response.data;
                if (vm.articles.length == 0) {
                    vm.$message.error('已经没有任务了');
                }
            }).catch(function (error) {
                console.log(error);
                vm.$message.error('拉取任务失败');
            });
        },
        getWord: function getWord() {
            var vm = this;
            axios.get('word/search/' + this.key).then(function (response) {
                vm.word = response.data;
            }).catch(function (error) {
                console.log(error);
            });
        },
        addTag: function addTag() {
            var vm = this;
            axios.post('tag', { tag: this.tag, user_id: this.user.id, word_id: this.word.id }).then(function (response) {
                console.log(response.data);
                if (response.data == true) {
                    vm.word.tags.push({ tag: vm.tag });
                    vm.tag = null;
                } else {
                    vm.$message.error('添加失败');
                }
            }).catch(function (error) {
                console.log(error);
                vm.$message.error('添加失败');
            });
        },
        finish: function finish() {
            Vue.set(this.progress[this.value], 0, this.progress[this.value][0] + this.articles.length);
            this.articles = [];
        },
        getUser: function getUser() {
            if (this.$store.state.user == null) {
                var vm = this;
                axios.get('user/get/' + sessionStorage.userId).then(function (response) {
                    vm.$store.commit('setUser', response.data);
                }).catch(function (error) {
                    console.log(error);
                });
            }
        },
        getProgress: function getProgress() {
            var vm = this;
            axios.get('article_list').then(function (response) {
                for (var key in vm.progress) {
                    vm.progress[key] = response.data[key];
                }
            });
        }
    },
    mounted: function mounted() {
        this.getUser();
        this.getProgress();
    }
});

/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(34)();
// imports


// module
exports.push([module.i, "\n.text[data-v-d3061624] {\n    font-size: 14px;\n}\n.item[data-v-d3061624] {\n    padding: 18px 0;\n}\n.clearfix[data-v-d3061624]:before,\n.clearfix[data-v-d3061624]:after {\n    display: table;\n    content: \"\";\n}\n.clearfix[data-v-d3061624]:after {\n    clear: both\n}\n.box-card[data-v-d3061624] {\n    width: 480px;\n    margin: 0 auto;\n}\n.list-group[data-v-d3061624] {\n    max-height: 500px;\n    overflow-y: auto;\n}\n.form[data-v-d3061624] {\n    max-width: 480px;\n    padding: 15px;\n    margin: 0 auto;\n}\n.input[data-v-d3061624] {\n    max-width: 300px;\n}\n.progress[data-v-d3061624] {\n    margin: 9px auto;\n}\n", ""]);

// exports


/***/ }),

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-row', [_c('el-col', {
    attrs: {
      "span": 12
    }
  }, [_c('el-card', {
    staticClass: "box-card"
  }, [_c('div', {
    staticClass: "clearfix",
    slot: "header"
  }, [_c('el-select', {
    attrs: {
      "placeholder": "请选择"
    },
    model: {
      value: (_vm.value),
      callback: function($$v) {
        _vm.value = $$v
      },
      expression: "value"
    }
  }, [_c('el-option', {
    attrs: {
      "label": "雷锋网",
      "value": "leiphone.com"
    }
  }), _vm._v(" "), _c('el-option', {
    attrs: {
      "label": "百度百家",
      "value": "baijia.baidu.com"
    }
  }), _vm._v(" "), _c('el-option', {
    attrs: {
      "label": "开发者头条",
      "value": "toutiao.io"
    }
  })], 1), _vm._v(" "), _c('el-button', {
    staticStyle: {
      "float": "right"
    },
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.getArticles
    }
  }, [_vm._v("领取任务")])], 1), _vm._v(" "), _c('div', {
    staticClass: "list-group"
  }, _vm._l((_vm.articles), function(item, index) {
    return _c('div', {
      staticClass: "text item"
    }, [_c('span', [_vm._v(_vm._s(index + 1))]), _vm._v(" "), _c('a', {
      attrs: {
        "href": item.href,
        "target": "_blank"
      }
    }, [_vm._v(_vm._s(item.title))])])
  })), _vm._v(" "), _c('div', [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.finish
    }
  }, [_vm._v("完成")])], 1)])], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 12
    }
  }, [_c('el-form', {
    staticClass: "form",
    attrs: {
      "label-width": "100px"
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "雷锋网"
    }
  }, [_c('el-progress', {
    staticClass: "progress",
    attrs: {
      "text-inside": true,
      "stroke-width": 18,
      "percentage": _vm.percent[0]
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "百度百家"
    }
  }, [_c('el-progress', {
    staticClass: "progress",
    attrs: {
      "text-inside": true,
      "stroke-width": 18,
      "percentage": _vm.percent[1]
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "开发者头条"
    }
  }, [_c('el-progress', {
    staticClass: "progress",
    attrs: {
      "text-inside": true,
      "stroke-width": 18,
      "percentage": _vm.percent[2]
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "主题词",
      "required": ""
    }
  }, [_c('el-input', {
    staticClass: "input",
    model: {
      value: (_vm.key),
      callback: function($$v) {
        _vm.key = $$v
      },
      expression: "key"
    }
  }), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.getWord
    }
  }, [_vm._v("提交")])], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "已有标签"
    }
  }, [_c('div', _vm._l((_vm.tags), function(item) {
    return _c('el-tag', {
      attrs: {
        "type": "primary"
      }
    }, [_vm._v(_vm._s(item.tag))])
  }))]), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "标签添加",
      "required": ""
    }
  }, [_c('el-input', {
    staticClass: "input",
    model: {
      value: (_vm.tag),
      callback: function($$v) {
        _vm.tag = $$v
      },
      expression: "tag"
    }
  }), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.addTag
    }
  }, [_vm._v("提交")])], 1), _vm._v(" "), _c('el-form-item', [_c('a', {
    attrs: {
      "target": "_blank",
      "href": 'https://www.baidu.com/s?wd=' + _vm.key
    }
  }, [_vm._v("百度搜索")]), _vm._v(" "), _c('a', {
    attrs: {
      "target": "_blank",
      "href": 'http://baike.baidu.com/item/' + _vm.key
    }
  }, [_vm._v("百科搜索")])])], 1)], 1)], 1)
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d3061624", module.exports)
  }
}

/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(119);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(115)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-d3061624&scoped=true!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Main.vue", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-d3061624&scoped=true!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Main.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })

});