/* global JS:false */

var ROOT = JS.ENV.ROOT || '../..';
// JS.cache = false;

JS.load(
    ROOT + '/src/emojify.js',
    ROOT + '/tests/spec/string.js',
    ROOT + '/tests/spec/dom.js',
    ROOT + '/tests/spec/tag_type.js',
    ROOT + '/tests/spec/modes.js',
    // add files here as the project grows
    JS.Test.autorun
);
