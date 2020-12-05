<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>{l s='Ajouter des liens dynamiques' mod='sd_eicmslinks'}</title>
  <script type="text/javascript">
    var admin_dir = '{$admin_dir}';
    var ajax_page = '{$ajax_page}'
  </script>
  <script type="text/javascript" src="{$jquery_file}"></script>
  <script type="text/javascript" src="{$js_file}"></script>
  <link rel="stylesheet" href="{$css_file}">
</head>
<body id="eicmslinks_body">
<ul class="menu-link">
  <li class="selected"><a class="show-block-link" rel="product_content"
                          href="#">{l s='Produit' mod='sd_eicmslinks'}</a></li>
  <li><a class="show-block-link" rel="category_product_content"
         href="#">{l s='Catégorie de produit' mod='sd_eicmslinks'}</a></li>
  <li><a class="show-block-link" rel="cms_content" href="#">{l s='Page CMS' mod='sd_eicmslinks'}</a></li>
  <li><a class="show-block-link" rel="category_cms_content" href="#">{l s='Catégorie CMS' mod='sd_eicmslinks'}</a></li>
  <li><a class="show-block-link" rel="marque_product_content"
         href="#">{l s='Marque de produit' mod='sd_eicmslinks'}</a></li>
  <li><a class="show-block-link" rel="fournisseur_product_content"
         href="#">{l s='Fournisseur de produit' mod='sd_eicmslinks'}</a></li>
  <li><a class="show-block-link" rel="files_product_content"
         href="#">{l s='Lien fichier' mod='sd_eicmslinks'}</a></li>
  <li><a class="show-block-link" rel="autres_content"
         href="#">{l s='Autres' mod='sd_eicmslinks'}</a></li>
</ul>

<div class="input-group">
  <div class="relative">
    <label for="eicmslinks_textlink">{l s='Texte du lien :' mod='sd_eicmslinks'}</label>
    <div id="eicmslinks_textlink_wrapper">
      <input type="text" id="eicmslinks_textlink"
             onkeyup="textlinkKeyUp()"/><span>{l s='Ce champ est requis' mod='sd_eicmslinks'}</span><br/>
    </div>
  </div>
  <div class="relative">
    <label for="eicmslinks_textlink_option_ouverture">{l s='Ouverture nouvelle fenetre' mod='sd_eicmslinks'} : <input
              type="checkbox" id="eicmslinks_textlink_option_ouverture" name="eicmslinks_textlink_option_ouverture"
              value="1"/></label>
  </div>
</div>

<div class="clearfix"></div>
<p>{l s='Il suffit de cliquer sur un élément ci-dessous pour ajouter le lien' mod='sd_eicmslinks'}</p>
{* Cms contents *}
<div id="cms_content" class="link-block" style="display:block;">
  <!-- Content dynamicaly loaded -->
  {l s='Page CMS' mod='sd_eicmslinks'}
</div>
{* Categories (product) content *}
<div id="category_cms_content" class="link-block">
  <!-- Content dynamicaly loaded -->
  {l s='Catégorie CMS' mod='sd_eicmslinks'}
</div>
{* Product content *}
<div id="product_content" class="link-block">
  <!-- Content dynamicaly loaded -->
  {l s='Contenu produits' mod='sd_eicmslinks'}
</div>

<div id="category_product_content" class="link-block">
  <!-- Content dynamicaly loaded -->
  {l s='Les catégories de produits' mod='sd_eicmslinks'}
</div>
<div id="marque_product_content" class="link-block">
  <!-- Content dynamicaly loaded -->
  {l s='Les marques de produits' mod='sd_eicmslinks'}
</div>
<div id="fournisseur_product_content" class="link-block">
  <!-- Content dynamicaly loaded -->
  {l s='Les fournisseurs de produits' mod='sd_eicmslinks'}
</div>
<div id="files_product_content" class="link-block">
  <!-- Content dynamicaly loaded -->
  {l s='Lien fichier' mod='sd_eicmslinks'}
</div>
<div id="autres_content" class="link-block">
  <!-- Content dynamicaly loaded -->
  {l s='Autres' mod='sd_eicmslinks'}
</div>

<div class="mceActionPanel">
  <div>
    <input type="button" id="cancel" name="cancel" value="{l s='Annuler' mod='sd_eicmslinks'}" class="mce-close"
           onclick="closePopup();"/>
  </div>
</div>
<script>
  {literal}
  // mise à jour du text du lien si text sélectionné
  var iframe = window.parent.document.querySelectorAll("iframe");
  var $textlink = document.getElementById("eicmslinks_textlink");
  var $textlink_option_ouverture = document.getElementById("eicmslinks_textlink_option_ouverture");
  var $textlinkWrapper = document.getElementById("eicmslinks_textlink_wrapper");

  /**
   * Récupére un param de l'url
   */
  function _findGetParameter(parameterName) {
    var result = null,
            tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
      tmp = items[index].split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
  }

  function textlinkKeyUp() {
    $textlink.value.length === 0 ? showError() : hideError();
  }

  function showError() {
    $textlinkWrapper.className = "error";
  }

  function hideError() {
    $textlinkWrapper.className = "";
  }

  textlinkKeyUp();

  function getLinkTargetHtml() {
    return $textlink_option_ouverture.checked ? "target='_blank'" : "target='_self'";
  }

  function addNormalLink(url) {

    if ($('#eicmslinks_textlink').val() === "") {
      alert("Veuillez d'abord renseigner le texte du lien");
      $("iframe").contents().children().animate({scrollTop: 0}, 200)
    } else {
      var texte = $textlink.value;
      if (texte.length === 0 || texte === null) {
        showError();
        return false;
      } else {
        hideError();
      }

      parent.tinymce.activeEditor.execCommand('mceInsertContent', false, '<a href="' + url + '" ' + getLinkTargetHtml() + '>' + texte + '</a>');
      top.tinymce.activeEditor.windowManager.close();
    }
  }

  /**
   * Ajout du lien d'ans l'éditeur
   */
  function addLink(url) {

    if ($('#eicmslinks_textlink').val() === "") {
      alert("Veuillez d'abord renseigner le texte du lien");
      $("iframe").contents().children().animate({scrollTop: 0}, 200)
    } else {

      var texte = $textlink.value;

      if (texte.length === 0 || texte === null) {
        showError();
        return false;
      } else {
        hideError();
      }

      parent.tinymce.activeEditor.execCommand('mceInsertContent', false, '<a href="' + url + '" ' + getLinkTargetHtml() + '>' + texte + '</a>');
      top.tinymce.activeEditor.windowManager.close();
    }
  }


  /**
   * Fermeture de la popup
   * @returns void
   */
  function closePopup() {
    top.tinymce.activeEditor.windowManager.close();
  }

  var local_correspondance = {/literal}{$local_correspondance};{literal}

  // id_lang pour les formulaires non moderne
  var id_language_popup = _findGetParameter('id_language');
  var local_popup = _findGetParameter('local');

  if (local_popup !== null && local_popup !== "") {
    id_language_popup = local_correspondance[local_popup];
  }

  var eicmslinks_sel = _findGetParameter('eicmslinks_sel');
  if (eicmslinks_sel !== null) {
    $textlink.value = decodeURIComponent(_findGetParameter('eicmslinks_sel'));
  }

  {/literal}
</script>

</body>
</html>
