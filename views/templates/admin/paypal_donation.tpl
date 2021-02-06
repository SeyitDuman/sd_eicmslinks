<section id="eicmslink-panel" class="panel widget">
  <div class="panel-heading">
    <i class="material-icons mi-chat">chat</i> {l s='Module SEO - Référencement - Eicmslink' mod='sd_eicmslinks'}
  </div>
  <span>{l s='Participer au soutien des développeurs, faites un don, peut importe le montant.' mod='sd_eicmslinks'}</span>
  <p>
    <br/>
    <a target="_blank"
       href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=7DYHRZRNJBXQ2&source=url">
      <img src="{$paypal_donate_img}" width="184"/>
    </a>
  </p>
  {if isset($lien_module)}
    <br/>
    <a href="{$lien_module}"
       class="eicmslink-link-module">{l s='Cacher ce bloc depuis la configuration du module' mod='sd_eicmslinks'}</a>
  {/if}
</section>
