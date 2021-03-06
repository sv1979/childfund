import $ from 'jquery';

(function($) {
    var Sage = {
        // All pages
        'common': {
            init: function() {
                initTopMenu();
            },
            finalize: function() {
                console.log("[Ok!]")
            }
        }
    };

    // The routing fires all common scripts, followed by the page specific scripts.
    // Add additional events for more control over timing e.g. a finalize event
    var UTIL = {
        fire: function(func, funcname, args) {
            var fire;
            var namespace = Sage;
            funcname = (funcname === undefined) ? 'init' : funcname;
            fire = func !== '';
            fire = fire && namespace[func];
            fire = fire && typeof namespace[func][funcname] === 'function';

            if (fire) {
                namespace[func][funcname](args);
            }
        },
        loadEvents: function() {
            // Fire common init JS
            UTIL.fire('common');
            // Fire page-specific init JS, and then finalize JS
            $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
                UTIL.fire(classnm);
                UTIL.fire(classnm, 'finalize');
            });

            // Fire common finalize JS
            UTIL.fire('common', 'finalize');
            //$(#sh);  
        }
    };

    // Load Events
    $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.

function initTopMenu() {
    const top_menu_toggle = $('.mobile_menu_close, .mobile_menu_open');
    const top_menu = $('.header__menu');
    const collapsible_menu_toggle = $('.level_1.has_children > a', top_menu);
    const top_menu_elements = $('.level_1 > a');
    const header_container = $('.header .container');
    const header__search_form = $('.header__search_form');
    const header__search_toggle = $('.header__search_toggle');

    top_menu_toggle.on('click', () => {
        top_menu.toggleClass('active');
    })

    collapsible_menu_toggle.on('click', (e) => {
        e.preventDefault();
        const $this_parent = $(e.currentTarget).closest('.level_1.has_children');
        const level_1_items = $('.level_1.active').not($this_parent);
        level_1_items.removeClass('active');
        $this_parent.toggleClass('active');
    })

    top_menu_elements.on('focus', () => {
        const level_1_items = $('.level_1.active');
        level_1_items.removeClass('active');
    })

    header_container.on('mouseleave', () => {
        const level_1_items = $('.level_1.active');
        level_1_items.removeClass('active');
    })

    header__search_toggle.on('click', () => {
        header__search_form.toggleClass('active');
        if (header__search_form.hasClass('active')) {
            $('[type="search"]', header__search_form).trigger('focus')
        }
    })
}