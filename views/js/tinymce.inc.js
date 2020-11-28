/**
 * Les données / function sont accessibles via window.
 */

// données id_shop accessible via d'autres fichiers
window.id_shop = id_shop;

// on enregistre l'id des tinyMCE editor déjà chargé
window.editorLoaded = [];

// le nombre de fois où l'on a vérifié le chargement
window.editorLoadedCheckCpt = 0;

// le nombre de fois où l'on doit vérifié le chargement
window.editorLoadedToCheckCpt = -1; // -1 pour infini

// Si le merge de config TinyMce est fonctionnel dans le fichier \js\admin\tinymce.inc.js
window.needLoadCustomEditor = typeof window.defaultTinyMceConfig === 'undefined';

// notre configuration TinyMce
window.defaultTinyMceConfig = {
  selector: ".rte",
  plugins: "align colorpicker link image filemanager table media placeholder advlist code table autoresize eicmslinks",
  browser_spellcheck: true,
  toolbar1: "code,colorpicker,bold,italic,underline,strikethrough,blockquote,link,align,bullist,numlist,table,image,media,formatselect",
  toolbar2: "eicmslinks",
  external_filemanager_path: baseAdminDir + "filemanager/",
  filemanager_title: "File manager",
  external_plugins: {"filemanager": baseAdminDir + "filemanager/plugin.min.js"},
  language: iso_user,
  content_style: (typeof lang_is_rtl !== "undefined" && lang_is_rtl === '1' ? "body {direction:rtl;}" : ""),
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
  rel_list: [
    {title: 'nofollow', value: 'nofollow'}
  ],
  setup: function (ed) {
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
  let materialIconAssoc = {
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
    'mce-i-checkbox': '<i class="mce-ico mce-i-checkbox"></i>',
  };

  $.each(materialIconAssoc, function (index, value) {
    $('.' + index).replaceWith(value);
  });
}

window.handleCounterTiny = function (id) {
  let textarea = $('#' + id);
  let counter = textarea.attr('counter');
  let counter_type = textarea.attr('counter_type');
  let max = tinyMCE.activeEditor.getBody().textContent.length;

  textarea.parent().find('span.currentLength').text(max);
  if ('recommended' !== counter_type && max > counter) {
    textarea.parent().find('span.maxLength').addClass('text-danger');
  } else {
    textarea.parent().find('span.maxLength').removeClass('text-danger');
  }
}

window.updateTinyMce = function () {
  window.editorLoadedCheckCpt++;

  //https://stackoverflow.com/questions/4651676/how-do-i-remove-tinymce-and-then-re-add-it/4655467#4655467
  tinyMCE.editors.forEach(function (editor) {

    if (window.editorLoaded.indexOf(editor.id) === -1) {

      tinyMCE.settings = window.defaultTinyMceConfig;
      tinyMCE.EditorManager.execCommand('mceRemoveEditor', false, editor.id);
      tinyMCE.EditorManager.execCommand('mceAddEditor', false, editor.id);
      tinyMCE.settings = window.defaultTinyMceConfig;

      window.editorLoaded.push(editor.id);
    }
  });
}

window.processTinyMce = function () {
  // les tinyMCE editors mettent parfois plus de temps à charger
  var interval_time = setInterval(window.updateTinyMce, 1000);

  if (window.editorLoadedCheckCpt === window.editorLoadedToCheckCpt) {
    clearInterval(interval_time);
  }
}

window.waitTinyMce = function () {

  if (typeof tinyMCE === "undefined" || tinyMCE.editors.length === 0) {
    setTimeout(window.waitTinyMce, 250); //wait 250 milliseconds then recheck
    return false;
  }

  window.processTinyMce();
}

try {

  window.waitTinyMce();

} catch (error) {
  console.log("catch error :");
  console.log(error);
}
