/* global JS:false */

var run = function() {
    JS.Test.autorun();
};

var ROOT = JS.ENV.ROOT || '..';
// JS.cache = false;

JS.load(ROOT + '/emojify.js',
        ROOT + '/tests/string_spec.js',
        ROOT + '/tests/dom_spec.js',
        // add files here as the project grows
        run);
