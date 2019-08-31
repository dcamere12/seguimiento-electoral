/*global $, window, document*/
'use strict';

var test = (function () {
    var render = function () {
        // code here
    };

    var init = function () {
        render();
    };

    // public methods
    return {
        init: init,
        render: render
    };
}());

$(document).ready(function () {
    test.init();
});
