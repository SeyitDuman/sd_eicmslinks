(function (tinymce) {

  tinymce.create('tinymce.plugins.eicmslinksPlugin', {
    init: function (ed, url) {

      ed.addCommand('mceCmsLinks', function () {

        var local = "";
        if ($("#form_switch_language").length) {

          // Exemple : Product
          local = $("#form_switch_language").val();
        } else if ($('.tab-pane.translation-field.active').length) {

          // Exemple : page CMS / Cageorie
          local = $('.tab-pane.translation-field.active').data().locale;
        }else if($('.form-group.translatable-field:visible .btn.btn-default.dropdown-toggle').length){

          // Ancien version translatable-field
          local = $.trim($('.form-group.translatable-field:visible .btn.btn-default.dropdown-toggle').first().text());
        }

        ed.windowManager.open({
          title: 'EicmsLinks',
          file: url + '/eicmslinks.php?eicmslinks_sel=' + encodeURIComponent(tinymce.activeEditor.selection.getContent({format: 'text'})) + "&id_language=" + id_language + "&local=" + local,
          width: 650,
          height: 400,
          inline: 1
        }, {
          plugin_url: url
        });

      });
      ed.addButton('eicmslinks', {
        title: 'EicmsLinks',
        cmd: 'mceCmsLinks',
        icons: 'eicmslinks',
        className: 'ckeditor_eicmslinks_btn',
        style: 'background: url(' + url + '/img/eicmslinks.gif) 50% 50% no-repeat; background-size: 16px; font-size: 0; width: 24px; height: 24px;'
      });
    },
    getInfo: function () {
      return {
        longname: 'EicmsLinks',
        author: 'seyo41@gmail.com',
        authorurl: '',
        infourl: '',
        version: tinymce.majorVersion + "." + tinymce.minorVersion
      };
    }
  });
  tinymce.PluginManager.add('eicmslinks', tinymce.plugins.eicmslinksPlugin);
})(tinymce);
