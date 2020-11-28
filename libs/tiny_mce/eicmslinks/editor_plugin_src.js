(function (tinymce) {


  tinymce.create('tinymce.plugins.eicmslinksPlugin', {
    init: function (ed, url) {

      console.log(ed);


      ed.addCommand('mceCmsLinks', function () {
        ed.windowManager.open({
          title: 'Ajouter un lien dynamique',
          file: url + '/eicmslinks.php?eicmslinks_sel=' + encodeURIComponent(tinymce.activeEditor.selection.getContent({format: 'text'}))+ "&id_language="+id_language,
          width: 650,
          height: 400,
          inline: 1
        }, {
          plugin_url: url
        });

      });
      ed.addButton('eicmslinks', {
        title: 'Ajouter un lien dynamique',
        cmd: 'mceCmsLinks',
        icons: 'eicmslinks',
        className: 'ckeditor_eicmslinks_btn',
        style: 'background: url(' + url + '/img/eicmslinks.gif) 50% 50% no-repeat; background-size: 16px; font-size: 0; width: 24px; height: 24px;'
      });
    },
    getInfo: function () {
      return {
        longname: 'Ei Cms Links',
        author: 'seyo41@gmail.com',
        authorurl: '',
        infourl: '',
        version: tinymce.majorVersion + "." + tinymce.minorVersion
      };
    }
  });
  tinymce.PluginManager.add('eicmslinks', tinymce.plugins.eicmslinksPlugin);
})(tinymce);
