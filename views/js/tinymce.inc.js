/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./_dev/js/tinymce.inc.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./_dev/js/tinymce.inc.js":
/*!********************************!*\
  !*** ./_dev/js/tinymce.inc.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Les données / function sont accessibles via window.
 */
// données id_shop accessible via d'autres fichiers
window.id_shop = id_shop; // on enregistre l'id des tinyMCE editor déjà chargé

window.editorLoaded = []; // le nombre de fois où l'on a vérifié le chargement

window.editorLoadedCheckCpt = 0; // le nombre de fois où l'on doit vérifié le chargement

window.editorLoadedToCheckCpt = -1; // -1 pour infini
// Si le merge de config TinyMce est fonctionnel dans le fichier \js\admin\tinymce.inc.js

window.needLoadCustomEditor = typeof window.defaultTinyMceConfig === 'undefined'; // notre configuration TinyMce

window.defaultTinyMceConfig = {
  selector: ".rte",
  plugins: "align colorpicker link image filemanager table media placeholder advlist code table autoresize eicmslinks",
  browser_spellcheck: true,
  toolbar1: "code,colorpicker,bold,italic,underline,strikethrough,blockquote,link,align,bullist,numlist,table,image,media,formatselect",
  toolbar2: "eicmslinks",
  external_filemanager_path: baseAdminDir + "filemanager/",
  filemanager_title: "File manager",
  external_plugins: {
    "filemanager": baseAdminDir + "filemanager/plugin.min.js"
  },
  language: iso_user,
  content_style: typeof lang_is_rtl !== "undefined" && lang_is_rtl === '1' ? "body {direction:rtl;}" : "",
  skin: "prestashop",
  menubar: false,
  statusbar: false,
  relative_urls: false,
  convert_urls: false,
  entity_encoding: "raw",
  extended_valid_elements: "em[class|name|id],@[role|data-*|aria-*]",
  valid_children: "+*[*]",
  valid_elements: "*[*]",
  init_instance_callback: "window.changeToMaterial",
  rel_list: [{
    title: 'nofollow',
    value: 'nofollow'
  }],
  setup: function setup(ed) {
    ed.on('loadContent', function (ed, e) {
      window.handleCounterTiny(tinymce.activeEditor.id);
    });
    ed.on('change', function (ed, e) {
      tinyMCE.triggerSave();
      window.handleCounterTiny(tinymce.activeEditor.id);
    });
    ed.on('blur', function (ed) {
      tinyMCE.triggerSave();
    });
  }
};

window.changeToMaterial = function () {
  var materialIconAssoc = {
    'mce-i-code': '<i class="material-icons">code</i>',
    'mce-i-none': '<i class="material-icons">format_color_text</i>',
    'mce-i-bold': '<i class="material-icons">format_bold</i>',
    'mce-i-italic': '<i class="material-icons">format_italic</i>',
    'mce-i-underline': '<i class="material-icons">format_underlined</i>',
    'mce-i-strikethrough': '<i class="material-icons">format_strikethrough</i>',
    'mce-i-blockquote': '<i class="material-icons">format_quote</i>',
    'mce-i-link': '<i class="material-icons">link</i>',
    'mce-i-alignleft': '<i class="material-icons">format_align_left</i>',
    'mce-i-aligncenter': '<i class="material-icons">format_align_center</i>',
    'mce-i-alignright': '<i class="material-icons">format_align_right</i>',
    'mce-i-alignjustify': '<i class="material-icons">format_align_justify</i>',
    'mce-i-bullist': '<i class="material-icons">format_list_bulleted</i>',
    'mce-i-numlist': '<i class="material-icons">format_list_numbered</i>',
    'mce-i-image': '<i class="material-icons">image</i>',
    'mce-i-table': '<i class="material-icons">grid_on</i>',
    'mce-i-media': '<i class="material-icons">video_library</i>',
    'mce-i-browse': '<i class="material-icons">attachment</i>',
    'mce-i-checkbox': '<i class="mce-ico mce-i-checkbox"></i>'
  };
  $.each(materialIconAssoc, function (index, value) {
    $('.' + index).replaceWith(value);
  });
};

window.handleCounterTiny = function (id) {
  var textarea = $('#' + id);
  var counter = textarea.attr('counter');
  var counter_type = textarea.attr('counter_type');
  var max = tinyMCE.activeEditor.getBody().textContent.length;
  textarea.parent().find('span.currentLength').text(max);

  if ('recommended' !== counter_type && max > counter) {
    textarea.parent().find('span.maxLength').addClass('text-danger');
  } else {
    textarea.parent().find('span.maxLength').removeClass('text-danger');
  }
};

window.updateTinyMce = function () {
  window.editorLoadedCheckCpt++; //https://stackoverflow.com/questions/4651676/how-do-i-remove-tinymce-and-then-re-add-it/4655467#4655467

  tinyMCE.editors.forEach(function (editor) {
    if (window.editorLoaded.indexOf(editor.id) === -1) {
      // si notre plugin n'est pas chargé de base
      if (typeof editor.plugins.eicmslinks === "undefined") {
        tinyMCE.settings = window.defaultTinyMceConfig;
        tinyMCE.EditorManager.execCommand('mceRemoveEditor', false, editor.id);
        tinyMCE.EditorManager.execCommand('mceAddEditor', false, editor.id);
        tinyMCE.settings = window.defaultTinyMceConfig;
      }

      window.editorLoaded.push(editor.id);
    }
  });
};

window.processTinyMce = function () {
  // les tinyMCE editors mettent parfois plus de temps à charger
  var interval_time = setInterval(window.updateTinyMce, 1000);

  if (window.editorLoadedCheckCpt === window.editorLoadedToCheckCpt) {
    clearInterval(interval_time);
  }
};

window.waitTinyMce = function () {
  if (typeof tinyMCE === "undefined" || tinyMCE.editors.length === 0) {
    setTimeout(window.waitTinyMce, 50); //wait 250 milliseconds then recheck

    return false;
  }

  window.processTinyMce();
};

try {
  window.waitTinyMce();
} catch (error) {
  console.log("catch error :");
  console.log(error);
}

/***/ })

/******/ });
//# sourceMappingURL=tinymce.inc.js.map