<?php
/**
 * 2007-2018 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2018 PrestaShop SA
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

/**
 * Class Sd_eicmslinks
 */
class Sd_eicmslinks extends Module
{
    /**
     * @var bool
     */
    protected $config_form = false;

    /**
     * @var bool
     */
    protected $debug_mode = false;

    /**
     * @var string
     */
    protected $_html = '';

    /**
     * @var string
     */
    public $module_link = '';

    /**
     * Sd_eicmslinks constructor.
     *
     * @throws PrestaShopException
     */
    public function __construct()
    {
        $this->name = 'sd_eicmslinks';
        $this->tab = 'others';
        $this->version = '1.0.2';
        $this->author = 'Seyit Duman';
        $this->need_instance = 0;

        $this->bootstrap = true;

        parent::__construct();

        $this->displayName = $this->transMe('Eicmslinks');
        $this->description = $this->transMe('Ajoutez des liens internes à votre contenu pour créé un maillage et renforcer votre SEO');

        $this->confirmUninstall = $this->transMe('Est vous sûr de vouloir désinstaller ce module ?');

        // minimum 1.7.1 => possibilité d'utiliser le hook actionOutputHTMLBefore
        $this->ps_versions_compliancy = ['min' => '1.7.1', 'max' => _PS_VERSION_];
        $this->debug_mode = (bool)_PS_MODE_DEV_;

        $this->module_link = $this->context->link->getAdminLink('AdminModules', true) . '&configure=' . $this->name . '&tab_module=' . $this->tab . '&module_name=' . $this->name;
    }

    /**
     * @return bool
     */
    public function install(): bool
    {
        if ($this->debug_mode) {
            PrestaShopLogger::addLog('Module Sd_eicmslinks, DEBUT install function');
        }

        $install_ok = parent::install()
            && $this->registerHook('displayBackOfficeHeader')
            && $this->registerHook('actionOutputHTMLBefore')
            && $this->registerHook('dashboardZoneOne');

        if ($this->debug_mode) {
            PrestaShopLogger::addLog('Module Sd_eicmslinks, install function, STEP 1 : ' . ($install_ok ? 'OK' : 'KO'));
        }

        if (is_dir(realpath(dirname(__FILE__) . '/../../js/tiny_mce/plugins/eicmslinks'))) {
            $this->deleteDir(realpath(dirname(__FILE__) . '/../../js/tiny_mce/plugins/eicmslinks'));
        }

        // Copie des dossier de l'editeur tinyMce
        $install_ok = $install_ok && $this->copyDir(realpath(dirname(__FILE__) . '/libs/tiny_mce/'), realpath(dirname(__FILE__) . '/../../js/tiny_mce/plugins'));

        if ($this->debug_mode) {
            PrestaShopLogger::addLog('Module Sd_eicmslinks, install function, STEP 2 : ' . ($install_ok ? 'OK' : 'KO'));
        }

        $install_ok = $install_ok && Configuration::updateValue('EICMSLINKS_ADMIN_PATH', $this->getAdminFolder());

        if ($this->debug_mode) {
            PrestaShopLogger::addLog('Module Sd_eicmslinks, install function, STEP  3 : ' . ($install_ok ? 'OK' : 'KO'));
        }

        $install_ok = $install_ok && Configuration::updateValue('EICMSLINKS_SHOW_DONATE', true);

        if ($this->debug_mode) {
            PrestaShopLogger::addLog('Module Sd_eicmslinks, install function, STEP  4 : ' . ($install_ok ? 'OK' : 'KO'));
        }

        $this->_clearCache('*');

        if ($this->debug_mode) {
            PrestaShopLogger::addLog('Module Sd_eicmslinks, FIN install function : ' . ($install_ok ? 'OK' : 'KO'));
        }

        return $install_ok;
    }

    /**
     * @return bool
     */
    public function uninstall(): bool
    {
        if ($this->debug_mode) {
            PrestaShopLogger::addLog('Module Sd_eicmslinks, DEBUT uninstall function');
        }

        $uninstall_ok = parent::uninstall();

        //Suppression des fichiers lors de la désinstallation
        $uninstall_ok = $uninstall_ok && $this->deleteDir(dirname(__FILE__) . '/../../js/tiny_mce/plugins/eicmslinks/');

        if ($this->debug_mode) {
            PrestaShopLogger::addLog('Module Sd_eicmslinks, uninstall function, STEP 1 : ' . ($uninstall_ok ? 'OK' : 'KO'));
        }

        $file_to_delete = realpath(dirname(__FILE__) . '/../../js/tiny_mce/plugins/eicmslinks/plugin.min.js');

        if ($file_to_delete !== false && is_file($file_to_delete)) {
            $uninstall_ok = $uninstall_ok && unlink($file_to_delete);
        }

        if ($this->debug_mode) {
            PrestaShopLogger::addLog('Module Sd_eicmslinks, uninstall function, STEP 2 : ' . ($uninstall_ok ? 'OK' : 'KO'));
        }

        $uninstall_ok = $uninstall_ok && Configuration::deleteByName('EICMSLINKS_ADMIN_PATH');

        if ($this->debug_mode) {
            PrestaShopLogger::addLog('Module Sd_eicmslinks, FIN uninstall function : ' . ($uninstall_ok ? 'OK' : 'KO'));
        }

        return $uninstall_ok;
    }

    /**
     * @param $table
     * @param $field
     *
     * @return bool
     */
    public function tableExistSql($table): bool
    {
        $res = Db::getInstance()->executeS("show tables like '" . _DB_PREFIX_ . $table . "';");

        return isset($res[0]) ? true : false;
    }

    /**
     * Hook appelé uniqument en front !
     * Modifie le contenu pour ajouter les liens
     *
     * @param $params => contient la valeur HTML
     */
    public function hookActionOutputHTMLBefore($params): void
    {
        $params['html'] = Sd_eicmslinks::updateLinks($params['html']);
    }

    /**
     * Hook appelé uniqument en front !
     * Modifie le contenu pour ajouter les liens
     */
    public function hookDisplayBackOfficeHeader(): void
    {
        $this->addTinyJS();
    }

    public function addTinyJS(): void
    {
        Media::addJsDef([
            'id_shop' => Context::getContext()->shop->id,
        ]);

        Context::getContext()->controller->addJs($this->_path . 'views/js/tinymce.inc.js');
    }

    /**
     * Mise à jour de l'objet cms pour remplacer les variables d'url des lien
     *
     * @param string|null : contenu ou il faut remplacer les liens
     *
     * @return string : contenu avec les liens remplacés
     */
    public static function updateLinks($content = '')
    {
        if ($content === null || $content === '') {
            return $content;
        }

        $link_model = new Link();
        $content = urldecode($content);

        $content = self::updateLinksCMS($link_model, $content);
        $content = self::updateLinksCategoryCms($link_model, $content);
        $content = self::updateLinksProduct($link_model, $content);
        $content = self::updateLinksCategoryProduct($link_model, $content);
        $content = self::updateLinksManufacturers($link_model, $content);
        $content = self::updateLinksSuppliers($link_model, $content);
        $content = self::updateLinksFiles($link_model, $content);

        $content = self::removeDeadLinks($content);

        return $content;
    }

    /**
     * Suppression des liens morts pour éviter des 404
     *
     * @param string $content
     *
     * @return string|string[]|null
     */
    public static function removeDeadLinks(string $content)
    {
        $content = preg_replace("/<a href=''>(.*?)<\/a>/", '$1', $content);
        $content = preg_replace('/<a href="">(.*?)<\/a>/', '$1', $content);

        return $content;
    }

    /**
     * Mise à jour des liens vers les pages categories
     *
     * @param Link $link_model
     * @param string $content
     *
     * @return string|string[]|null
     */
    public static function updateLinksCategoryProduct(Link $link_model, string $content)
    {
        preg_match_all('#{{categoryproduct url=([0-9+]{0,12}) data-idshop=([0-9+]{0,12}) data-idlang=([0-9+]{0,12})}}#', $content, $category_product_links);

        if (isset($category_product_links[1]) && sizeof($category_product_links[1])) {
            foreach ($category_product_links[1] as $key => $category_product_links_id) {
                $idLang = (int)$category_product_links[3][$key];
                $idShop = (int)$category_product_links[2][$key];

                $category_product_links_url = '';
                $cat_mapper = new Category((int)$category_product_links_id, $idLang, $idShop);

                if (false !== $cat_mapper && (bool)$cat_mapper->active) {
                    $category_product_links_url = $link_model->getCategoryLink($category_product_links_id, null, $idLang, null, $idShop, false);
                    $category_product_links_url = Sd_eicmslinks::removeBaseUrl($category_product_links_url);
                }

                $content = preg_replace('#{{categoryproduct url=' . $category_product_links_id . ' data-idshop=([0-9+]{0,12}) data-idlang=([0-9+]{0,12})}}#', $category_product_links_url . '" title="' . htmlspecialchars($cat_mapper->name) . '"', $content);
            }
        }

        return $content;
    }

    /**
     * @param Link $link_model
     * @param string $content
     *
     * @return string|string[]|null
     */
    public static function updateLinksSuppliers(Link $link_model, string $content)
    {
        preg_match_all('#{{suppliers url=([0-9+]{0,12}) data-idshop=([0-9+]{0,12}) data-idlang=([0-9+]{0,12})}}#', $content, $supplier_links);

        if (isset($supplier_links[1]) && sizeof($supplier_links[1])) {
            foreach ($supplier_links[1] as $key => $supplier_links_id) {
                $idLang = (int)$supplier_links[3][$key];
                $idShop = (int)$supplier_links[2][$key];

                $supplier_links_url = '';
                $supplier_mapper = new Supplier((int)$supplier_links_id, $idLang);

                if (false !== $supplier_mapper && (bool)$supplier_mapper->active) {
                    $supplier_links_url = $link_model->getSupplierLink($supplier_links_id, null, $idLang, $idShop, false);
                    $supplier_links_url = Sd_eicmslinks::removeBaseUrl($supplier_links_url);
                }

                $content = preg_replace('#{{suppliers url=' . $supplier_links_id . ' data-idshop=([0-9+]{0,12}) data-idlang=([0-9+]{0,12})}}#', $supplier_links_url . '" title="' . htmlspecialchars($supplier_mapper->name) . '"', $content);
            }
        }

        return $content;
    }

    /**
     * @param Link $link_model
     * @param string $content
     *
     * @return string|string[]|null
     */
    public static function updateLinksManufacturers(Link $link_model, string $content)
    {
        preg_match_all('#{{manufacturers url=([0-9+]{0,12}) data-idshop=([0-9+]{0,12}) data-idlang=([0-9+]{0,12})}}#', $content, $manufacture_links);

        if (isset($manufacture_links[1]) && sizeof($manufacture_links[1])) {
            foreach ($manufacture_links[1] as $key => $manufacture_links_id) {
                $idLang = (int)$manufacture_links[3][$key];
                $idShop = (int)$manufacture_links[2][$key];

                $manufacture_links_url = '';
                $manufacture_mapper = new Manufacturer((int)$manufacture_links_id, $idLang);

                if (false !== $manufacture_mapper && (bool)$manufacture_mapper->active) {
                    $manufacture_links_url = $link_model->getManufacturerLink($manufacture_links_id, null, $idLang, $idShop, false);
                    $manufacture_links_url = Sd_eicmslinks::removeBaseUrl($manufacture_links_url);
                }

                $content = preg_replace('#{{manufacturers url=' . $manufacture_links_id . ' data-idshop=([0-9+]{0,12}) data-idlang=([0-9+]{0,12})}}#', $manufacture_links_url . '" title="' . htmlspecialchars($manufacture_mapper->name) . '"', $content);
            }
        }

        return $content;
    }

    /**
     * Mise à jour des liens vers les pages produits
     *
     * @param Link $link_model
     * @param string $content
     *
     * @return string|string[]|null
     */
    public static function updateLinksProduct(Link $link_model, string $content)
    {
        preg_match_all('#{{product url=([0-9+]{0,12}) data-idshop=([0-9+]{0,12}) data-idlang=([0-9+]{0,12})}}#', $content, $product_links);

        if (isset($product_links[1]) && sizeof($product_links[1])) {
            foreach ($product_links[1] as $key => $product_link) {
                $idLang = (int)$product_links[3][$key];
                $idShop = (int)$product_links[2][$key];

                $product_link_url = '';
                $product_mapper = new Product((int)$product_link, false, $idLang, $idShop);

                if (false !== $product_mapper && (bool)$product_mapper->active) {
                    $product_link_url = $link_model->getProductLink($product_link, null, null, null, $idLang, $idShop);
                    $product_link_url = Sd_eicmslinks::removeBaseUrl($product_link_url);
                }

                $content = preg_replace('#{{product url=' . $product_link . ' data-idshop=([0-9+]{0,12}) data-idlang=([0-9+]{0,12})}}#', $product_link_url . '" title="' . htmlspecialchars($product_mapper->name) . '"', $content);
            }
        }

        return $content;
    }

    /**
     * Mise à jour des liens vers les pages cms
     *
     * @param Link $link_model
     * @param string $content
     *
     * @return string|string[]|null
     */
    public static function updateLinksCMS(Link $link_model, string $content)
    {
        preg_match_all('#{{cms url=([0-9+]{0,12}) data-idshop=([0-9+]{0,12}) data-idlang=([0-9+]{0,12})}}#', $content, $cms_links);

        if (isset($cms_links[1]) && sizeof($cms_links[1])) {
            foreach ($cms_links[1] as $key => $cms_id) {
                $idLang = (int)$cms_links[3][$key];
                $idShop = (int)$cms_links[2][$key];

                $link_url = '';
                $cms_mapper = new Cms((int)$cms_id, $idLang, $idShop);

                if ((false !== $cms_mapper && true === (bool)$cms_mapper->active)) {
                    //$link_url = $link_model->getCMSLink($cms_id, null, null, $idLang, $idShop, false);
                    $link_url = $link_model->getCMSLink($cms_id, null, null, $idLang, $idShop);
                    $link_url = Sd_eicmslinks::removeBaseUrl($link_url);
                }

                $content = preg_replace('#{{cms url=' . $cms_id . ' data-idshop=([0-9+]{0,12}) data-idlang=([0-9+]{0,12})}}#', $link_url . '" title="' . htmlspecialchars($cms_mapper->meta_title[$idLang]) . '"', $content);
            }
        }

        return $content;
    }

    /**
     * Mise à jour des liens vers les pages categories
     *
     * @param Link $link_model
     * @param string $content
     *
     * @return string|string[]|null
     */
    public static function updateLinksCategoryCms(Link $link_model, string $content)
    {
        preg_match_all('#{{category url=([0-9+]{0,12}) data-idshop=([0-9+]{0,12}) data-idlang=([0-9+]{0,12})}}#', $content, $category_links);

        if (isset($category_links[1]) && sizeof($category_links[1])) {
            foreach ($category_links[1] as $key => $category_link) {
                $idLang = (int)$category_links[3][$key];
                $idShop = (int)$category_links[2][$key];

                $category_link_url = '';
                $cat_mapper = new CMSCategory((int)$category_link, $idLang, $idShop);
                if (false !== $cat_mapper && (bool)$cat_mapper->active) {
                    if ($category_link == 0 || $category_link == 1) {
                        $content = preg_replace('#{{category url=' . $category_link . ' data-idshop=([0-9+]{0,12}) data-idlang=([0-9+]{0,12})}}#', '/' . '" title="' . htmlspecialchars($cat_mapper->name) . '"', $content);
                    } else {
                        $category_link_url = $link_model->getCMSCategoryLink($category_link, null, $idLang, $idShop, false);
                        $category_link_url = Sd_eicmslinks::removeBaseUrl($category_link_url);
                        $content = preg_replace('#{{category url=' . $category_link . ' data-idshop=([0-9+]{0,12}) data-idlang=([0-9+]{0,12})}}#', $category_link_url . '" title="' . htmlspecialchars($cat_mapper->name) . '"', $content);
                    }
                } else {
                    $content = preg_replace('#{{category url=' . $category_link . ' data-idshop=([0-9+]{0,12}) data-idlang=([0-9+]{0,12})}}#', $category_link_url . '" title="' . htmlspecialchars($cat_mapper->name) . '"', $content);
                }
            }
        }

        return $content;
    }

    /**
     * Mise à jour des liens vers les fichiers de produits
     *
     * @param Link $link_model
     * @param string $content
     *
     * @return string|string[]|null
     */
    public static function updateLinksFiles(Link $link_model, string $content)
    {
        preg_match_all('#{{filelink url=([0-9+]{0,12}) data-idshop=([0-9+]{0,12}) data-idlang=([0-9+]{0,12})}}#', $content, $links);

        if (isset($links[1]) && sizeof($links[1])) {
            foreach ($links[1] as $key => $link_id) {
                $idLang = (int)$links[3][$key];
                $idShop = (int)$links[2][$key];

                $attachment_url = $link_model->getPageLink('attachment', true, $idLang, 'id_attachment=' . (int)$link_id, false, $idShop, false);

                $content = preg_replace('#{{filelink url=' . $link_id . ' data-idshop=' . $idShop . ' data-idlang=' . $idLang . '}}#', $attachment_url . '" download="download"', $content);
            }
        }

        return $content;
    }

    /**
     * Supprimer le domaine pour url donnée
     *
     * @param string $url
     *
     * @return mixed
     */
    public static function removeBaseUrl(string $url)
    {
        $urlPart = explode('//' . Context::getContext()->shop->domain, $url);

        // return until base url
        if (isset($urlPart[1])) {
            return $urlPart[1];
        }

        // default return not updated link
        return $url;
    }

    /**
     * Function traduction prestashop 1.7
     *
     * @param string $msg
     * @param array $parameters
     * @param string $locale
     *
     * @return mixed|string
     */
    public function transMe(string $msg, $parameters = [], $locale = 'fr-FR')
    {
        $domain = 'Modules.Sdeicmslinks.Admin';

        return $this->trans($msg, $parameters, $domain, $locale);
    }

    /**
     * Charge la configuration du module
     *
     * @return string
     */
    public function getContent()
    {
        $this->_html = '';

        /*
         * If values have been submitted in the form, process.
         */
        if (((bool)Tools::isSubmit('submitSdEicmslinksGlobalForm')) == true) {
            $this->postProcess();
        }

        $this->renderForm();

        $id_shop = (int)Context::getContext()->shop->id;
        $id_shop_group = Context::getContext()->shop->id_shop_group;

        if (Configuration::get('EICMSLINKS_SHOW_DONATE', null, $id_shop_group, $id_shop)) {
            $this->_html .= $this->getDonateTemplateHtml();
        }

        return $this->_html;
    }

    /**
     * Create the form that will be displayed in the configuration of your module.
     *
     * @throws PrestaShopException
     */
    protected function renderForm()
    {
        $helper = new HelperForm();

        $helper->show_toolbar = false;
        $helper->table = $this->table;
        $helper->module = $this;
        $helper->default_form_language = $this->context->language->id;
        //$helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG', 0);

        $helper->identifier = $this->identifier;
        $helper->submit_action = 'submitSdEicmslinksGlobalForm';
        $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false)
            . '&configure=' . $this->name . '&tab_module=' . $this->tab . '&module_name=' . $this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');

        $helper->tpl_vars = [
            'uri' => $this->getPathUri() . 'views/',
            'fields_value' => $this->getConfigFormValues(), /* Add values for your inputs */
            'languages' => $this->context->controller->getLanguages(),
            'id_shop' => $this->context->shop->id,
            'id_language' => $this->context->language->id,
        ];

        $this->_html .= $helper->generateForm([$this->getConfigForm()]);
    }

    /**
     * Set values for the inputs.
     *
     * @return mixed
     */
    protected function getConfigFormValues()
    {
        $ret = [];

        $ret['EICMSLINKS_ADMIN_PATH'] = Configuration::get('EICMSLINKS_ADMIN_PATH');
        $ret['EICMSLINKS_SHOW_DONATE'] = Configuration::get('EICMSLINKS_SHOW_DONATE');

        return $ret;
    }

    /**
     * Save form data.
     */
    protected function postProcess()
    {
        Configuration::updateValue('EICMSLINKS_SHOW_DONATE', Tools::getValue('EICMSLINKS_SHOW_DONATE'));
        Configuration::updateValue('EICMSLINKS_ADMIN_PATH', Tools::getValue('EICMSLINKS_ADMIN_PATH'));
    }

    /**
     * Create the structure of your form.
     *
     * @return array
     */
    protected function getConfigForm()
    {
        return [
            'form' => [
                'legend' => [
                    'title' => $this->transMe('Configuration'),
                    'icon' => 'icon-cogs',
                ],
                'input' => [
                    [
                        'type' => 'text',
                        'label' => $this->transMe('Chemin vers le dossier admin'),
                        'name' => 'EICMSLINKS_ADMIN_PATH',
                        'required' => true,
                    ],
                    [
                        'type' => 'switch',
                        'label' => $this->transMe('Afficher le bloc de SOUTIEN'),
                        'name' => 'EICMSLINKS_SHOW_DONATE',
                        'is_bool' => true,
                        'values' => [
                            [
                                'id' => 'active_on',
                                'value' => 1,
                                'label' => $this->trans('Enabled', [], 'Admin.Global'),
                            ],
                            [
                                'id' => 'active_off',
                                'value' => 0,
                                'label' => $this->trans('Disabled', [], 'Admin.Global'),
                            ],
                        ],
                    ],
                ],
                'submit' => [
                    'title' => $this->transMe('Enregistrer'),
                ],
            ],
        ];
    }

    /**
     * Copie du contenu d'un dossier vers un autre emplacement
     *
     * @param string $src
     * @param string $dest
     *
     * @return bool
     */
    public function copyDir(string $src, string $dest): bool
    {
        // If source is not a directory stop processing
        if (!is_dir($src)) {
            return false;
        }

        // If the destination directory does not exist create it
        if (!is_dir($dest)) {
            if (!mkdir($dest)) {
                // If the destination directory could not be created stop processing
                return false;
            }
        }

        // Open the source directory to read in files
        $i = new DirectoryIterator($src);
        foreach ($i as $f) {
            if ($f->isFile()) {
                copy($f->getRealPath(), "$dest/" . $f->getFilename());
            } elseif (!$f->isDot() && $f->isDir()) {
                $this->copyDir($f->getRealPath(), "$dest/$f");
            }
        }

        return true;
    }

    /**
     * Supression récursive d'un dossier
     *
     * @param string $dir
     *
     * @return bool
     */
    public function deleteDir(string $dir): bool
    {
        if (!is_dir($dir)) {
            return true;
        }

        $ret = true;
        $files = array_diff(scandir($dir), ['.', '..']);

        foreach ($files as $file) {
            if (is_dir("$dir/$file")) {
                $ret = $this->deleteDir("$dir/$file");
            } else {
                if (is_file("$dir/$file")) {
                    $ret = unlink("$dir/$file");
                }
            }
        }

        return rmdir($dir) && $ret;
    }

    /**
     * @param $categories
     * @param $current
     * @param int $id_cms_category
     * @param int $id_selected
     * @param int $is_html
     *
     * @return array|mixed
     */
    public static function recurseCMSCategory($categories, $current, $id_cms_category = 1, $id_selected = 1, $is_html = 0)
    {
        $ret = [];
        $ret[$current['infos']['id_cms_category']] = CMSCategory::hideCMSCategoryPosition(stripslashes($current['infos']['name']));

        if (isset($categories[$id_cms_category])) {
            foreach (array_keys($categories[$id_cms_category]) as $key) {
                $ret = $ret + self::recurseCMSCategory($categories, $categories[$id_cms_category][$key], $key, $id_selected, $is_html);
            }
        }

        return $ret;
    }

    /**
     * @return string
     */
    public static function getCatCmsLinks()
    {
        $id_lang = (int)$_GET['id_language'];
        $id_shop = (int)$_GET['id_shop'];

        $categories = CMSCategory::getCategories($id_lang, false);
        $categories_ret = self::recurseCMSCategory($categories, $categories[0][1], 1, 1, 0);

        $categories_html = '<ul>';
        if (is_array($categories_ret) && count($categories_ret) > 0) {
            foreach ($categories_ret as $key => $name) {
                $categories_html .= '<li><a href="#" onclick="addLink(\'{{category url=' . $key . ' data-idshop=' . $id_shop . ' data-idlang=' . $id_lang . '}}\')">' . $name . '</a></li>';
            }
        }
        $categories_html .= '</ul>';

        return $categories_html;
    }

    /**
     * Récupération de l'arborescence des pages cms
     *
     * @return string
     */
    public function getCmsLinks()
    {
        $id_lang = (int)$_GET['id_language'];
        $id_shop = (int)$_GET['id_shop'];

        //Version basique pour l'instant : ne gère qu'un niveau
        $categories = CMSCategory::getRecurseCategory($id_lang);

        $categories_html = '<ul>';
        if (isset($categories['children']) && is_array($categories['children']) && count($categories['children']) > 0) {
            foreach ($categories['children'] as $child) {
                $categories_html .= '<li>' . $child['name'] . '

				<ul>';
                if (isset($child['cms']) && is_array($child['cms']) && count($child['cms']) > 0) {
                    foreach ($child['cms'] as $child_cms) {
                        $categories_html .= '<li><a href="#" onclick="addLink(\'{{cms url=' . $child_cms['id_cms'] . ' data-idshop=' . $id_shop . ' data-idlang=' . $id_lang . '}}\')">' . $child_cms['meta_title'] . '</a></li>';
                    }
                }

                $categories_html .= '</ul></li>';
            }
        }
        if (isset($categories['cms']) && is_array($categories['cms']) && count($categories['cms']) > 0) {
            foreach ($categories['cms'] as $cms) {
                $categories_html .= '<li><a href="#" onclick="addLink(\'{{cms url=' . $cms['id_cms'] . ' data-idshop=' . $id_shop . ' data-idlang=' . $id_lang . '}}\')">' . $cms['meta_title'] . '</a></li>';
            }
        }
        $categories_html .= '</ul>';

        return $categories_html;
    }

    /**
     * @return false|string
     */
    public function getLocalCorrespondance()
    {
        $ret = [];

        foreach (Language::getLanguages(false) as $lang) {
            $ret[$lang['iso_code']] = $lang['id_lang'];
        }

        return json_encode($ret);
    }

    /**
     * Affichage de la popin TinyMce dans l'admin
     * Context vide ( id_shop, id_lang )
     *
     * @throws PrestaShopException
     */
    public function displayTinyMcePopup()
    {
        $ajax_page = $this->context->link->getAdminLink('AdminModules') . '&configure=' . $this->name;
        $ajax_page = str_replace('/1/index.php', '/' . Configuration::get('EICMSLINKS_ADMIN_PATH') . '/index.php', $ajax_page);

        $this->context->smarty->assign('local_correspondance', $this->getLocalCorrespondance());
        $this->context->smarty->assign('ajax_page', $ajax_page);
        $this->context->smarty->assign('admin_dir', Configuration::get('EICMSLINKS_ADMIN_PATH'));

        // JS nécessaires au fonctionnement de la popin
        $jquery_files = Media::getJqueryPath();
        $this->context->smarty->assign('jquery_file', $jquery_files[0]);
        $this->context->smarty->assign('js_file', __PS_BASE_URI__ . 'modules/' . $this->name . '/views/js/tinymce_popup.js');
        $this->context->smarty->assign('css_file', __PS_BASE_URI__ . 'modules/' . $this->name . '/views/css/tinymce_popup.css');

        if (false === Module::isEnabled($this->name)) {
            echo $this->display(__FILE__, 'views/templates/admin/module_disabled_msg.tpl');
        } else {
            echo $this->display(__FILE__, 'views/templates/admin/tinymce_popup.tpl');
        }
    }

    /**
     * @return array
     *
     * @throws PrestaShopException
     */
    protected function getAlternativeLangsUrl()
    {
        $alternativeLangs = [];
        $languages = Language::getLanguages(true, $this->context->shop->id);

        if (count($languages) < 2) {
            // No need to display alternative lang if there is only one enabled
            return $alternativeLangs;
        }

        foreach ($languages as $lang) {
            $alternativeLangs[$lang['language_code']] = $this->context->link->getLanguageLink($lang['id_lang']);
        }

        return $alternativeLangs;
    }

    /**
     * Get attachments.
     *
     * @param int $idLang Language ID
     *
     * @return array|false|mysqli_result|PDOStatement|resource|null Database query result
     */
    public static function getAttachments($idLang)
    {
        return Db::getInstance()->executeS(
            '
			SELECT *
			FROM ' . _DB_PREFIX_ . 'attachment_lang al
			WHERE al.id_lang = ' . (int)$idLang . '
			'
        );
    }

    public function ajaxProcessGetFileLinkList()
    {
        $id_lang = (int)$_GET['id_language'];
        $id_shop = (int)$_GET['id_shop'];

        $attachments = self::getAttachments($id_lang);

        $html = '';

        if ($attachments) {
//            $html .= $this->transMe("Les fichiers sont commums à toutes les boutiques");
            $html .= '<ul>';
            foreach ($attachments as $attachment) {
                $html .= '<li><a href="#" onclick="addLink(\'{{filelink url=' . $attachment['id_attachment'] . ' data-idshop=' . $id_shop . ' data-idlang=' . $id_lang . '}}\')">' . $attachment['name'] . '</a></li>';
            }
            $html .= '</ul>';
        } else {
            $html .= $this->transMe('Aucun fichier trouvé');
        }

        die(json_encode(['success' => true, 'html' => trim($html)]));
    }

    public function ajaxProcessGetOtherLinkList()
    {
        $id_lang = (int)$_GET['id_language'];
        $id_shop = (int)$_GET['id_shop'];

        $base_url = $this->context->shop->getBaseURL(true, true);

        $urls = [
            'base_url' => $base_url,
        ];

        $pages = [];
        $p = [
            'address', 'addresses', 'authentication', 'cart', 'category', 'cms', 'contact',
            'discount', 'guest-tracking', 'history', 'identity', 'index', 'my-account',
            'order-confirmation', 'order-detail', 'order-follow', 'order', 'order-return',
            'order-slip', 'pagenotfound', 'password', 'pdf-invoice', 'pdf-order-return', 'pdf-order-slip',
            'prices-drop', 'product', 'search', 'sitemap', 'stores', 'supplier',
        ];

        $ssl = ((isset($this->ssl) && $this->ssl && Configuration::get('PS_SSL_ENABLED')) || Tools::usingSecureMode()) ? true : false;

        foreach ($p as $page_name) {
            $index = str_replace('-', '_', $page_name);
            $pages[$index] = $this->context->link->getPageLink($page_name, $ssl, $id_lang, null, false, $id_shop);
        }
        $pages['register'] = $this->context->link->getPageLink('authentication', true, $id_lang, ['create_account' => '1'], false, $id_shop);
        $pages['order_login'] = $this->context->link->getPageLink('order', true, $id_lang, ['login' => '1'], false, $id_shop);
        $urls = array_merge($urls, $pages);

        $html = "<select name='allOtherPage'>";
        $html .= "<option value='-1'>Choisir une valeur</option>";

        if ($pages) {
            foreach ($urls as $page_name => $url) {
                $html .= "<option value='" . $url . "'>" . $page_name . '</option>';
            }
        }

        $html .= '<select>';

        die(json_encode(['success' => true, 'html' => trim($html)]));
    }

    public function ajaxProcessGetPageCmsList()
    {
        die(json_encode(['success' => true, 'html' => trim($this->getCmsLinks())]));
    }

    public function ajaxProcessGetCategoriesCmsList()
    {
        die(json_encode(['success' => true, 'html' => trim($this->getCatCmsLinks())]));
    }

    /**
     * @throws PrestaShopDatabaseException
     */
    public function ajaxProcessGetProductsList()
    {
        $id_lang = (int)$_GET['id_language'];
        $id_shop = (int)$_GET['id_shop'];

        $sql = 'SELECT p.id_product as id,p.reference, pl.name
				FROM ' . _DB_PREFIX_ . 'product p
				LEFT JOIN ' . _DB_PREFIX_ . 'product_lang pl ON ( p.id_product = pl.id_product)
				WHERE pl.id_lang = ' . $id_lang . '
				AND pl.id_shop = ' . $id_shop . '
				AND p.active=1
				ORDER BY pl.name';

        //Récupération des produits
        $products = Db::getInstance()->ExecuteS($sql);

        $listeLiProduct = '';

        foreach ($products as $key => $product) {
            $listeLiProduct .= '<li data-id="' . $product['id'] . '"><a href="#" onclick="addLink(\'{{product url=' . $product['id'] . ' data-idshop=' . $id_shop . ' data-idlang=' . $id_lang . '}}\')"><span>' . $product['name'] . '</span></a></li>';
        }

        $html = '<div class="panel-content">
                 <div id="searchInputWrapper"><i class="icon-search" aria-hidden="true"></i><input type="text" id="searchInput" placeholder="' . $this->transMe('Recherche un produit via son nom uniquement') . '"> </div>
                 <ul id="listProductName">' . $listeLiProduct . '</ul>
                 <div id="listProductNameMsg" style="display:none;">' . $this->transMe('Aucun résultat') . '</div>
                 </div>';

        die(json_encode(['success' => true, 'html' => trim($html)]));
    }

    public function ajaxProcessGetMarqueList()
    {
        $id_lang = (int)$_GET['id_language'];
//        $id_shop = (int)$_GET['id_shop'];

        $manufacturers = Manufacturer::getManufacturers(false, $id_lang, true, false, false, false, true);

        $ret = "<select name='allManufacturers'>";
        $ret .= "<option value='-1'>Choisir une valeur</option>";

        if ($manufacturers) {
            foreach ($manufacturers as $manufacturer) {
                $ret .= "<option value='" . $manufacturer['id_manufacturer'] . "'>" . htmlspecialchars(trim($manufacturer['name'])) . '</option>';
            }
        }

        $ret .= '<select>';

        die(json_encode(['success' => true, 'html' => $ret]));
    }

    public function ajaxProcessGetFournisseurList()
    {
        $id_lang = (int)$_GET['id_language'];
        $id_shop = (int)$_GET['id_shop'];

        $suppliers = Supplier::getSuppliers(false, (int)$id_lang, true, false, false, false, false);

        $ret = "<select name='allSuppliers'>";
        $ret .= "<option value='-1'>Choisir une valeur</option>";

        if ($suppliers) {
            foreach ($suppliers as $supplier) {
                $ret .= "<option value='" . $supplier['id_supplier'] . "'>" . htmlspecialchars(trim($supplier['name'])) . '</option>';
            }
        }

        $ret .= '<select>';

        die(json_encode(['success' => true, 'html' => $ret]));
    }

    /**
     * @throws PrestaShopException
     */
    public function ajaxProcessGetCategoriesList()
    {
        $id_lang = (int)$_GET['id_language'];
        $id_shop = (int)$_GET['id_shop'];

        $id_category = 0;

        if (Shop::getContext() == Shop::CONTEXT_SHOP) {
            $cat_mapper = Category::getRootCategory($id_lang, new Shop($id_shop, $id_lang));

            if ($cat_mapper !== false) {
                $id_category = (int)$cat_mapper->id_category;
            }
        }

        $tree_categories_helper = new HelperTreeCategories('categories-treeview', '', $id_category, $id_lang);

        $tree_categories_helper->setLang($id_lang);
        $tree_categories_helper->setShop($id_shop);
        $tree_categories_helper->setRootCategory($id_category);

        $html = $tree_categories_helper
//            ->setAttribute()
            ->setInputName('id-category-for-insert')
            ->render();

        die(json_encode(['success' => true, 'html' => trim($html)]));
    }

    /**
     * @return mixed
     */
    public function getAdminFolder()
    {
        $r = $_SERVER['REQUEST_URI'];
        $r = explode('/', $r);
        $r = array_filter($r);
        $r = array_merge($r, []);
        $r = preg_replace('/\?.*/', '', $r);

        return $r[0];
    }

    /**
     * @return false|string
     */
    public function getDonateTemplateHtml()
    {
        $this->context->smarty->assign(
            [
                'paypal_donate_img' => '/modules/' . $this->name . '/views/img/paypal_donate.jpg',
                'paypal_donate_img_qr' => '/modules/' . $this->name . '/views/img/paypal_donate_code_qr.png',
            ]
        );

        return $this->display(__FILE__, 'views/templates/admin/paypal_donation.tpl');
    }

    /**
     * @param array $params (from to date)
     *
     * @return string
     */
    public function hookDashboardZoneOne(array $params)
    {
        $ret = '';
        $id_shop = (int)Context::getContext()->shop->id;
        $id_shop_group = Context::getContext()->shop->id_shop_group;

        if (Configuration::get('EICMSLINKS_SHOW_DONATE', null, $id_shop_group, $id_shop)) {
            $this->updateModulePositionInDashBoard();
            $ret = $this->getDonateTemplateHtml();
        }

        return $ret;
    }

    public function updateModulePositionInDashBoard()
    {
        foreach ($this->getPossibleHooksList() as $key => $hook) {
            if ($hook['name'] === 'dashboardZoneOne') {
                $this->updatePosition((int)$hook['id_hook'], 0, 1);
            }
        }
    }

    public function isUsingNewTranslationSystem()
    {
        return true;
    }
}
