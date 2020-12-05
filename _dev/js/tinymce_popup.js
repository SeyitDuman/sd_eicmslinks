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
      error: function (error, msg, throwmsg) {
        console.log(msg, throwmsg);
      },
      success: function (response) {
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
      error: function (error, msg, throwmsg) {
        console.log(msg, throwmsg);
      },
      success: function (response) {
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
      error: function (error, msg, throwmsg) {
        console.log(msg, throwmsg);
      },
      success: function (response) {
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
      error: function (error, msg, throwmsg) {
        console.log(msg, throwmsg);
      },
      success: function (response) {
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
      error: function (error, msg, throwmsg) {
        console.log(msg, throwmsg);
      },
      success: function (response) {
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
      error: function (error, msg, throwmsg) {
        console.log(msg, throwmsg);
      },
      success: function (response) {
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
      error: function (error, msg, throwmsg) {
        // console.log(msg, throwmsg);
      },
      success: function (response) {
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
      success: function (response) {
        if (typeof response.html !== "undefined") {
          $("#product_content").html("").html(response.html);
        }
      },
      complete: function (jqXHR, status) {
        //  console.log(jqXHR, status);
      },
      error: function (req, status, error) {
        //  console.log(req, status, error);
      }
    });
  }

  /**
   * Chargement ajax
   * @param anchor_rel
   * @private
   */
  var _loadContent = function (anchor_rel) {
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
  var _tabLinkClick = function () {

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
  var _allOtherPageChange = function () {
    if ($(this).val() !== "-1") {
      addNormalLink($(this).val());
    }
  };
  /**
   * Insertion d'un lien de marque
   */
  var _allManufacturersChange = function () {
    if ($(this).val() !== "-1") {
      addLink('{{manufacturers url=' + $(this).val() + ' data-idshop=' + window.parent.id_shop + ' data-idlang=' + id_language_popup + '}}');
    }
  };

  /**
   * Insertion d'un lien fournisseur
   */
  var _allSuppliersChange = function () {
    if ($(this).val() !== "-1") {
      addLink('{{suppliers url=' + $(this).val() + ' data-idshop=' + window.parent.id_shop + ' data-idlang=' + id_language_popup + '}}');
    }
  };

  /**
   * Insertion d'un lien de catégorie produit
   */
  var _categoryProductClick = function (e) {
    addLink('{{categoryproduct url=' + $(this).val() + ' data-idshop=' + window.parent.id_shop + ' data-idlang=' + id_language_popup + '}}');
  };

  /**
   * Permet d'associer la recherche à l'ajout de lien
   * @param e
   * @private
   */
  var _categoryProductSearchInputClick = function (e) {
    console.log(e);
    console.log($.trim(e.target.textContent));

    $('#category_product_content .tree-toggler').each(function (index, elt) {
      console.log($.trim($(elt).text()));


      if ($.trim($(elt).text()) === $.trim(e.target.textContent)) {
        console.log($(elt));
        console.log($(elt).closest('.tree-item-name'));
        console.log($(elt).closest('.tree-item-name').find('input'));
        $(elt).closest('.tree-item-name').find('input').trigger('click');
        return false;
      }
    });
  };

  /**
   * Insertion d'un lien de catégorie cms
   */
  var _categoryLabelClick = function () {
    addLink('{{category url=' + $(this).prev('input').val() + '}}');
  };

  /**
   * Insertion d'un lien de catégorie cms
   */
  var _categoryCmsTreeClick = function () {
    addLink('{{category url=' + $(this).val() + '}}');
  };


  /**
   * Recherche des produits
   * @param e
   * @private
   */
  var _searchInputKeyUp = function (e) {

    e.preventDefault();

    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("listProductName");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
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
  var _initEvent = function () {


    $('body').on('click', '.show-block-link', _tabLinkClick);
    $('body').on('click', '.category_label', _categoryLabelClick);
    $('body').on('keyup', '#searchInput', _searchInputKeyUp);
    $('body').on("click", '#categories-treeview li span input[type=radio]', _categoryProductClick);
    $('body').on("click", '#category_product_content .tt-suggestion p', _categoryProductSearchInputClick);
    $('body').on('click', '#categories-tree input', _categoryCmsTreeClick);
    $('body').on('change', '[name=allOtherPage]', _allOtherPageChange);
    $('body').on('change', '[name=allManufacturers]', _allManufacturersChange);
    $('body').on('change', '[name=allSuppliers]', _allSuppliersChange);

  };

  // initialisation
  _initEvent();

  $('a[rel=product_content]').trigger('click');

});
