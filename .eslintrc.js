/*
 * 2007-2020 PayPal
 *
 *  NOTICE OF LICENSE
 *
 *  This source file is subject to the Academic Free License (AFL 3.0)
 *  that is bundled with this package in the file LICENSE.txt.
 *  It is also available through the world-wide-web at this URL:
 *  http://opensource.org/licenses/afl-3.0.php
 *  If you did not receive a copy of the license and are unable to
 *  obtain it through the world-wide-web, please send an email
 *  to license@prestashop.com so we can send you a copy immediately.
 *
 *  DISCLAIMER
 *
 *  Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 *  versions in the future. If you wish to customize PrestaShop for your
 *  needs please refer to http://www.prestashop.com for more information.
 *
 *  @author 2007-2020 PayPal
 *  @author 202 ecommerce <tech@202-ecommerce.com>
 *  @copyright PayPal
 *  @license http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 */

// http://eslint.org/docs/user-guide/configuring

module.exports = {
  env: {
    "browser": true,      // browser global variables.
    "node": false,        // Node.js global variables and Node.js-specific rules.
    "worker": false,      // web workers global variables.
    "amd": false,         // defines require() and define() as global variables as per the amd spec.
    "mocha": false,       // adds all of the Mocha testing global variables.
    "jasmine": false,     // adds all of the Jasmine testing global variables for version 1.3 and 2.0.
    "phantomjs": false,   // phantomjs global variables.
    "jquery": false,      // jquery global variables.
    "prototypejs": false, // prototypejs global variables.
    "shelljs": false,     // shelljs global variables.
    "meteor": false,      // meteor global variables.
    "mongo": false,       // mongo global variables.
    "applescript": false, // applescript global variables.
    "es6": false,         // enable all ECMAScript 6 features except for modules.
  },
  globals: {
    "goog": true
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module"
  },
  root: true,
  // extends: 'airbnb-base',
  plugins: [
    // 'import',
    // 'html',
  ],
  rules: {
    // Possible Errors
    "no-extra-semi": 1,            // disallow unnecessary semicolons
    "no-inner-declarations": 2,    // disallow function or variable declarations in nested blocks


    // Best Practices
    "curly": 2,                 // specify curly brace conventions for all control statements
    "no-eval": 2,               // disallow use of eval()
    "no-extend-native": 2,      // disallow adding to native types
    "no-new-wrappers": 2,       // disallows creating new instances of String, Number, and Boolean
    "no-with": 2,               // disallow use of the with statement


    // Strict Mode


    // Variables
    "no-undef": 2,                   // disallow use of undeclared variables unless mentioned in a /*global */ block


    // Node.js


    // Stylistic Issues
    "array-bracket-spacing": [2, "never"], // enforce spacing inside array brackets (off by default)
    "indent": [2, 2],                      // this option sets a specific tab width for your code (off by default)
    "no-array-constructor": 2,             // disallow use of the Array constructor
    "no-mixed-spaces-and-tabs": 2,         // disallow mixed spaces and tabs for indentation
    "no-new-object": 2,                    // disallow use of the Object constructor
    "object-curly-spacing": [2, "never"],  // require or disallow padding inside curly braces (off by default)
    "semi": 2,                             // require or disallow use of semicolons instead of ASI


    // ECMAScript 6


    // Legacy
    "max-len": [1, 80, 2] // specify the maximum length of a line in your program (off by default)
  }
};
