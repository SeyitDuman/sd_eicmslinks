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
<body>
<p>
  {l s='Le module "Eicmslink" est désactivé' mod='sd_eicmslinks'},
  {l s="veuillez l'activer ou le réinitialiser" mod='sd_eicmslinks'}.
  <script>
    /**
     * Fermeture de la popup
     * @returns void
     */
    function closePopup() {
      console.log(top);
      console.log(top.tinymce);
      console.log(top.tinymce.activeEditor);
      top.tinymce.activeEditor.windowManager.close();
    }
  </script>
</p>
</body>
</html>
