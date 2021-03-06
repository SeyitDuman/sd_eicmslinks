# sd_eicmslinks
Add Cms Links tools in tinyMce Editor for prestashop 1.7 [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=7DYHRZRNJBXQ2)

## :question: What's up here?

It allows you to insert dynamics links using rich editor TinyMCE, like :
 - Product
 - Product Files
 - Category product
 - Cms
 - Category Cms
 - Supplier
 - Manufacturer
 - All other link ( account / contact / cart / search / sitemap ... )

Exemple :

<img src="https://raw.githubusercontent.com/SeyitDuman/sd_eicmslinks/master/views/img/screenshot_1.jpg" alt="Ei cms links configuration">



## :exclamation: Compatibility
 - PrestaShop 1.6.x :x: ( look here => https://github.com/SeyitDuman/prestashop_eicmslinks )
 - PrestaShop 1.7.1 to 1.7.x :white_check_mark:
 - Multilanguage :white_check_mark:
 - Multistore :white_check_mark:
 - Module using custom TinyMCE plugin :x:
 - Minimum PHP version 7.0 for PrestaShop 1.7.1 to 1.7.5 ~ 1.7.6
 - Minimum PHP version 7.1 for PrestaShop 1.7.x
 - Recommended PHP version => ( More info => https://devdocs.prestashop.com/1.7/basics/installation/system-requirements/ )


## License
Released under the MIT license - http://opensource.org/licenses/MIT

Let's get on with it!

## Contributing
PR on branch develop please

## Install

1. Download ZIP from Latest release.
2. Install it through prestashop back office in "Alls Shop" Context if in multistore
6. After install, module add automatically plugin to rich editor TinyMCE

## Compiling assets
**For development**

We use _Webpack_ to compile our javascript and scss files.
In order to compile those files, you must :
1. have _Node 14_ installed locally
2. run `npm install` in the root folder to install dependencies
3. then run `npm run watch` to compile assets and watch for file changes

**For production**

Run `npm run build` to compile for production.
Files are minified, `console.log` and comments dropped.

## :eyes: Donation
If this project help you reduce time to develop, you can give me a cup of coffee :)


[![paypal](https://raw.githubusercontent.com/SeyitDuman/sd_eicmslinks/master/views/img/paypal_donate.jpg)](https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=7DYHRZRNJBXQ2)


