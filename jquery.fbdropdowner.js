/**
 * jquery.fbDropdowner.js
 * Version 1.7
 * September 26th, 2017
 *
 * Dropdown list styling (<select>).
 * Because styling dropdown lists for browsers is pretty much impossible!
 * This plugin transforms the <select> tag to <dl>, <dt> and <dd> tags, which are more stylable.
 * Don't forgot to include the fbdropdowner.css file.
 *
 * Required:
 *    - jQuery (tested on jQuery v3.1.1)
 *    - tocca (tested on tocca v2.0.0)
 *
 * TODO : Supprimer le click_or_tap et utiliser FastClick. Supprimer Tocca.
 *
 * To activate:
 *    $(".js-dropdown").fbDropdowner();
 *
 * Options configurables :
 *    - create_default_option --> true --> If false, doesn't create a default option.
 *          This can be useful if you don't want to use the <dt>, and only
 *          show the available options.
 *
 * Data attributes:
 *    - data-fbdropdowner-class --> Add a custom class to the stylable dropdown created.
 */

(function ($) {

    $.fbDropdowner = function (element, options) {

        // to avoid confusions, use "plugin" to reference the
        // current instance of the object
        var plugin = this;

        var $dropdown = $(element), // reference to the jQuery version of DOM element
            dropdown = element,     // reference to the actual DOM element
            $styleable_dropdown;    // Stylable dropdown that will be created


        // OPTIONS by default.
        var settings = $.extend({
            create_default_option: true
        }, options);


        // CONSTRUCTOR method that gets called when the object is created
        plugin.init = function () {
            create_stylable_dropdown();
            create_events();
        }


        // TRANSFORMS the <select> to more stylable tags
        // Those tags are <dl>, <dt> and <dd>
        var create_stylable_dropdown = function () {
            var
                selected_option = $dropdown.find("option[selected]"),
                $options = $("option", $dropdown);

            $styleable_dropdown = $('<dl class="fbdropdowner"></dl>');

            // Add a custom class to the dropdown
            var add_class = $dropdown.attr("data-fbdropdowner-class");
            if (add_class) {
                $styleable_dropdown.addClass(add_class);
            }

            // Si aucun selected option par defaut, prendre le premier.
            if (selected_option.length === 0 && settings.create_default_option) {
                selected_option = $dropdown.find("option:first");
            }

            // DROPDOWN STYLABLE juste apres le dropdown std.
            $dropdown.after($styleable_dropdown);

            // Option par defaut
            $styleable_dropdown.append('<dt><a href="#">' + selected_option.text() +
                '<span class="value">' + selected_option.val() +
                '</span></a></dt>');

            // Autres options.
            $styleable_dropdown.append('<dd><ul></ul></dd>');
            $options.each(function () {

                // Default option receives "on" class.
                var add_class = "";

                if ($(this).val() == selected_option.val()) {
                    add_class = ' class="on"';
                }

                // Add the <option>.
                $("dd ul", $styleable_dropdown).append('<li><a' +
                    add_class + ' href="#" > ' +
                    $(this).text() + '<span class="value">' +
                    $(this).val() + '</span></a></li>');
            });
        }


        // EVENTS associated with the stylable dropdown.
        function create_events() {

            var $dropdown_items_c = $("dd ul", $styleable_dropdown);


            // If we are on iPod, iPad or iPhone, "tap" event.
            // Un peu useless avec FastClick, et serieux ca a des risques
            // d'utiliser ca. Donc, pas l'utiliser.
            var click_or_tap = 'click';
            if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                // click_or_tap = 'tap';
            }

            // CLICK on the shown item opens the dropdown.
            $("dt a", $styleable_dropdown).on(click_or_tap, function (evt) {
                evt.preventDefault();

                if ($dropdown_items_c.hasClass("show")) {
                    $dropdown_items_c.removeClass("show");
                } else {
                    $dropdown_items_c.addClass("show");
                }
            });

            // CLICK somewhere else in the document closes the dopdown.
            $(document).on(click_or_tap, function (evt) {
                if ($styleable_dropdown.is(':hidden')) { return; }

                var $clicked = $(evt.target);
                if (!$clicked.parents(".fbdropdowner").is($styleable_dropdown)) {
                    $dropdown_items_c.removeClass("show");
                }
            });

            // CLICK on the selected item in the dropdown.
            $("dd a", $styleable_dropdown).on(click_or_tap, function (evt) {
                evt.preventDefault();

                // Select this item and closes the dropdown.
                var text = $(this).html();
                $("dt a", $styleable_dropdown).html(text);
                $dropdown_items_c.removeClass("show");

                // Put the selected item in the original dropdown.
                // And trigger a "change" event.
                $dropdown.val($(this).find("span.value").html()).trigger("change");

                // Add class "on" to selected item, so the next time the user opens the dropdown,
                // the selected item will be "on".
                $("a", $styleable_dropdown).removeClass("on");
                $(this).addClass("on");
            });
        }


        // fire up the plugin!
        plugin.init();

    }

    // add the plugin to the jQuery.fn object
    $.fn.fbDropdowner = function (options) {

        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function () {

            // if plugin has not already been attached to the element
            if (undefined == $(this).data('fbDropdowner')) {

                // create a new instance of the plugin
                // pass the DOM element and the user-provided options as arguments
                var plugin = new $.fbDropdowner(this, options);

                // in the jQuery version of the element
                // store a reference to the plugin object
                // you can later access the plugin and its methods and properties like
                // element.data('fbDropdowner').publicMethod(arg1, arg2, ... argn) or
                // element.data('fbDropdowner').settings.propertyName
                $(this).data('fbDropdowner', plugin);

            }

        });

    }

})(jQuery);