﻿<?php
/**
 * 2007-2014 PrestaShop
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
 * @author    Hennes Hervé <contact@h-hennes.fr>
 * @copyright 2013-2015 Hennes Hervé
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  http://www.h-hennes.fr/blog/
 */
define('_PS_ADMIN_DIR_', 1);

require_once('./../../../../config/config.inc.php');

$cookie = new Cookie('psAdmin', '', (int)Configuration::get('PS_COOKIE_LIFETIME_BO'));

if (isset($cookie->id_employee) && $cookie->id_employee) {

    $local = isset($_GET['local']) ? $_GET['local'] : null;

    include_once(_PS_MODULE_DIR_ . '/sd_eicmslinks/sd_eicmslinks.php');

    //Affichage de la popup d'insertion des cms
    $eicmslink = new Sd_eicmslinks();

    $local_arr = json_decode($eicmslink->getLocalCorrespondance(), true);

    if(isset($local_arr[$local])){
        Context::getContext()->language = new Language($local_arr[$local]);
    }

    $eicmslink->displayTinyMcePopup();

} else {
    die('No employee logged in.');
}
