/*global $, GLOBALS, window, document */

var modal = (function () {
    'use strict';
    var overlay = $('#modal-overlay'),
        initialscroll = 0,
        main = $('.main'),
        footer = $('.footer'),

        open = function (select) {
            var box = $(select);

            if (overlay.length <= 0) {
                overlay = $('<div id="modal-overlay" class="overlay"></div>').appendTo($('body'));
            }

            overlay.fadeIn(250, function () {
                box.fadeIn(350);
                initialscroll = $(window).scrollTop();

                if (window.innerWidth < GLOBALS.MEDIA_MOBILE) {
                    main.addClass('hidden-block');
                    footer.addClass('hidden-block');
                    $(window).scrollTop(0);
                }
            });
        },

        close = function (select) {
            animateClose($(select));
        },

        closeButton = function () {
            $('.modal__close').on('click', function (e) {
                e.preventDefault();
                var box = $(this).closest('.modal');

                animateClose(box);
            });
        },

        animateClose = function (obj) {
            obj.fadeOut(250, function () {
                overlay.fadeOut(300);
                main.removeClass('hidden-block');
                footer.removeClass('hidden-block');
                $(window).scrollTop(initialscroll);
            });
        },

        autoOpen = function () {
            $('[data-modal]').on('click', function (e) {
                e.preventDefault();
                open($(this).attr('data-modal'));
            });
        };

    return {
        open: open,
        close: close,
        closeButton: closeButton,
        autoOpen: autoOpen
    };
}());

$(document).ready(function () {
    'use strict';
    modal.closeButton();
    modal.autoOpen();
});


