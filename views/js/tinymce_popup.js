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
/******/ 	return __webpack_require__(__webpack_require__.s = "./_dev/js/tinymce_popup.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./_dev/js/tinymce_popup.js":
/*!**********************************!*\
  !*** ./_dev/js/tinymce_popup.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(document).ready(function () {
  /**
   * Récuprère la liste des page cms
   * @private
   */
  function _getFileLink() {
    return $.ajax({
      url: ajax_page + "&id_shop=" + window.parent.id_shop + "&id_language=" + id_language_popup,
      method: 'POST',
      data: {
        ajax: true,
        action: 'GetFileLinkList'
      },
      dataType: 'json',
      error: function error(_error, msg, throwmsg) {
        console.log(msg, throwmsg);
      },
      success: function success(response) {
        if (typeof response.html !== "undefined") {
          $("#files_product_content").html("").html(response.html);
        }
      }
    });
  }
  /**
   * Récuprère la liste des page cms
   * @private
   */


  function _getOtherLink() {
    return $.ajax({
      url: ajax_page + "&id_shop=" + window.parent.id_shop + "&id_language=" + id_language_popup,
      method: 'POST',
      data: {
        ajax: true,
        action: 'GetOtherLinkList'
      },
      dataType: 'json',
      error: function error(_error2, msg, throwmsg) {
        console.log(msg, throwmsg);
      },
      success: function success(response) {
        if (typeof response.html !== "undefined") {
          $("#autres_content").html("").html(response.html);
        }
      }
    });
  }
  /**
   * Récuprère la liste des page cms
   * @private
   */


  function _getCmsList() {
    return $.ajax({
      url: ajax_page + "&id_shop=" + window.parent.id_shop + "&id_language=" + id_language_popup,
      method: 'POST',
      data: {
        ajax: true,
        action: 'GetPageCmsList'
      },
      dataType: 'json',
      error: function error(_error3, msg, throwmsg) {
        console.log(msg, throwmsg);
      },
      success: function success(response) {
        if (typeof response.html !== "undefined") {
          $("#cms_content").html("").html(response.html);
        }
      }
    });
  }
  /**
   * Récuprère la liste des cms catégories
   * @private
   */


  function _getCategoriesCmsList() {
    return $.ajax({
      url: ajax_page + "&id_shop=" + window.parent.id_shop + "&id_language=" + id_language_popup,
      method: 'POST',
      data: {
        ajax: true,
        action: 'GetCategoriesCmsList'
      },
      dataType: 'json',
      error: function error(_error4, msg, throwmsg) {
        console.log(msg, throwmsg);
      },
      success: function success(response) {
        if (typeof response.html !== "undefined") {
          $("#category_cms_content").html("").html(response.html);
        }
      }
    });
  }
  /**
   * Récuprère la liste des catégories
   * @private
   */


  function _getMarqueProductsList() {
    return $.ajax({
      url: ajax_page + "&id_shop=" + window.parent.id_shop + "&id_language=" + id_language_popup,
      method: 'POST',
      data: {
        ajax: true,
        action: 'GetMarqueList'
      },
      dataType: 'json',
      error: function error(_error5, msg, throwmsg) {
        console.log(msg, throwmsg);
      },
      success: function success(response) {
        if (typeof response.html !== "undefined") {
          $("#marque_product_content").html("").html(response.html);
        }
      }
    });
  }
  /**
   * Récuprère la liste des catégories
   * @private
   */


  function _getFournisseurProductsList() {
    return $.ajax({
      url: ajax_page + "&id_shop=" + window.parent.id_shop + "&id_language=" + id_language_popup,
      method: 'POST',
      data: {
        ajax: true,
        action: 'GetFournisseurList'
      },
      dataType: 'json',
      error: function error(_error6, msg, throwmsg) {
        console.log(msg, throwmsg);
      },
      success: function success(response) {
        if (typeof response.html !== "undefined") {
          $("#fournisseur_product_content").html("").html(response.html);
        }
      }
    });
  }
  /**
   * Récuprère la liste des catégories
   * @private
   */


  function _getCategoriesProductsList() {
    return $.ajax({
      url: ajax_page + "&id_shop=" + window.parent.id_shop + "&id_language=" + id_language_popup,
      method: 'POST',
      data: {
        ajax: true,
        action: 'GetCategoriesList'
      },
      dataType: 'json',
      error: function error(_error7, msg, throwmsg) {// console.log(msg, throwmsg);
      },
      success: function success(response) {
        if (typeof response.html !== "undefined") {
          $("#category_product_content").html("").html(response.html);
        }
      }
    });
  }
  /**
   * Fonction de récupération de la liste des produits
   */


  function _getProductsList() {
    return $.ajax({
      url: ajax_page + "&id_shop=" + window.parent.id_shop + "&id_language=" + id_language_popup,
      method: 'POST',
      dataType: 'json',
      data: {
        ajax: true,
        action: 'GetProductsList'
      },
      success: function success(response) {
        if (typeof response.html !== "undefined") {
          $("#product_content").html("").html(response.html);
        }
      },
      complete: function complete(jqXHR, status) {//  console.log(jqXHR, status);
      },
      error: function error(req, status, _error8) {//  console.log(req, status, error);
      }
    });
  }
  /**
   * Chargement ajax
   * @param anchor_rel
   * @private
   */


  var _loadContent = function _loadContent(anchor_rel) {
    if (anchor_rel == "product_content") {
      // Récupération ajax des produits
      _getProductsList();
    } else if (anchor_rel == "category_product_content") {
      // Récupération ajax des catégories de produits
      _getCategoriesProductsList();
    } else if (anchor_rel == "cms_content") {
      // Récupération ajax des pages CMS
      _getCmsList();
    } else if (anchor_rel == "category_cms_content") {
      // Récupération ajax des catégories CMS
      _getCategoriesCmsList();
    } else if (anchor_rel == "marque_product_content") {
      // Récupération ajax des marques de produits
      _getMarqueProductsList();
    } else if (anchor_rel == "fournisseur_product_content") {
      // Récupération ajax des fournisseurs de produits
      _getFournisseurProductsList();
    } else if (anchor_rel == "autres_content") {
      // Récupération ajax des autres types de pages
      _getOtherLink();
    } else if (anchor_rel == "files_product_content") {
      // Récupération ajax des autres types de pages
      _getFileLink();
    }
  };
  /**
   * Affichage des onglets
   */


  var _tabLinkClick = function _tabLinkClick() {
    $('.show-block-link').parent().removeClass("selected");
    $(this).parent().addClass("selected");
    $('.link-block').each(function () {
      $(this).css('display', 'none');
    });
    var elem_to_show = $(this).attr('rel');
    $('#' + elem_to_show).css('display', 'block');

    _loadContent($(this).attr('rel'));
  };
  /**
   * Insertion d'un lien de marque
   */


  var _allOtherPageChange = function _allOtherPageChange() {
    if ($(this).val() !== "-1") {
      addNormalLink($(this).val());
    }
  };
  /**
   * Insertion d'un lien de marque
   */


  var _allManufacturersChange = function _allManufacturersChange() {
    if ($(this).val() !== "-1") {
      addLink('{{manufacturers url=' + $(this).val() + ' data-idshop=' + window.parent.id_shop + ' data-idlang=' + id_language_popup + '}}');
    }
  };
  /**
   * Insertion d'un lien fournisseur
   */


  var _allSuppliersChange = function _allSuppliersChange() {
    if ($(this).val() !== "-1") {
      addLink('{{suppliers url=' + $(this).val() + ' data-idshop=' + window.parent.id_shop + ' data-idlang=' + id_language_popup + '}}');
    }
  };
  /**
   * Insertion d'un lien de catégorie cms
   */


  var _categoryLabelClick = function _categoryLabelClick() {
    addLink('{{category url=' + $(this).prev('input').val() + '}}');
  };
  /**
   * Insertion d'un lien de catégorie produit
   */


  var _categoryProductClick = function _categoryProductClick() {
    addLink('{{categoryproduct url=' + $(this).val() + ' data-idshop=' + window.parent.id_shop + ' data-idlang=' + id_language_popup + '}}');
  };
  /**
   * Insertion d'un lien de catégorie cms
   */


  var _categoryCmsTreeClick = function _categoryCmsTreeClick() {
    addLink('{{category url=' + $(this).val() + '}}');
  };
  /**
   * Recherche des produits
   * @param e
   * @private
   */


  var _searchInputKeyUp = function _searchInputKeyUp(e) {
    e.preventDefault(); // Declare variables

    var input, filter, ul, li, a, i;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("listProductName");
    li = ul.getElementsByTagName('li'); // Loop through all list items, and hide those who don't match the search query

    var cpt = 0;

    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("span")[0];

      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
        cpt++;
      }
    }

    document.getElementById('listProductNameMsg').style.display = cpt === li.length ? "" : "none";
  };
  /**
   * Initialisation des événements
   * @private
   */


  var _initEvent = function _initEvent() {
    $('body').on('click', '.show-block-link', _tabLinkClick);
    $('body').on('click', '.category_label', _categoryLabelClick);
    $('body').on('keyup', '#searchInput', _searchInputKeyUp);
    $('body').on('click', '#categories-treeview li span input[type=radio]', _categoryProductClick);
    $('body').on('click', '#categories-tree input', _categoryCmsTreeClick);
    $('body').on('change', '[name=allOtherPage]', _allOtherPageChange);
    $('body').on('change', '[name=allManufacturers]', _allManufacturersChange);
    $('body').on('change', '[name=allSuppliers]', _allSuppliersChange);
    $('a[rel=product_content]').trigger('click');
  }; // initialisation


  _initEvent();
});

/***/ })

/******/ });
//# sourceMappingURL=tinymce_popup.js.map