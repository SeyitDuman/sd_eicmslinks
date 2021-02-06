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
//
// // Si le merge de config TinyMce est fonctionnel dans le fichier \js\admin\tinymce.inc.js
// window.needLoadCustomEditor = typeof window.defaultTinyMceConfig === 'undefined';

window.defaultTinyMceConfig = {
  plugins: "align colorpicker eicmslinks link image filemanager table media placeholder advlist code table autoresize",
  toolbar2: "eicmslinks",
};

window.updateTinyMce = function () {
  window.editorLoadedCheckCpt++;

  //https://stackoverflow.com/questions/4651676/how-do-i-remove-tinymce-and-then-re-add-it/4655467#4655467
  tinyMCE.editors.forEach(function (editor) {

    if (window.editorLoaded.indexOf(editor.id) === -1) {

      // si notre plugin n'est pas chargé de base
      if (typeof editor.plugins.eicmslinks === "undefined") {

        tinyMCE.EditorManager.execCommand('mceRemoveEditor', false, editor.id);
        tinyMCE.EditorManager.execCommand('mceAddEditor', false, editor.id);

      }

      window.editorLoaded.push(editor.id);
    }
  });
};

window.processTinyMce = function () {

  // on effectue l'action 1 fois
  tinyMCE.settings.plugins = tinyMCE.settings.plugins.replace(',link,', ',eicmslinks,link,');
  tinyMCE.settings.toolbar1 = tinyMCE.settings.toolbar1.replace(',link,', ',eicmslinks,link,');
  tinyMCE.settings.autoresize_on_init = true;

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
