/* global JS:false, phantom:false */

phantom.injectJs('./node_modules/jstest/jstest.js');
var options  = {format: 'dot'},
    reporter = new JS.Test.Reporters.Headless(options);

reporter.open('./tests/browser/browser.html');
