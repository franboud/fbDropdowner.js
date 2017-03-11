/**
 * jquery.fbDropdowner.js
 * Version 1.3,
 * March 11th, 2017
 *
 * Dropdown list styling (<select>).
 * Because styling dropdown lists for browsers is pretty much impossible!
 * This plugin transforms the <select> tag to <dl>, <dt> and <dd> tags, which are more stylable.
 * Don't forgot to include the fbdropdowner.css file.
 *
 * Required:
 *    - jQuery (tested on jQuery v3.1.1)
 *
 * To activate :
 *    $(".js-dropdown").fbDropdowner();
 *
 */

(function ($) {

    $.fbDropdowner = function (element) {

        // to avoid confusions, use "plugin" to reference the
        // current instance of the object
        var plugin = this;

        var $dropdown = $(element), // reference to the jQuery version of DOM element
            dropdown = element,     // reference to the actual DOM element
            $styleable_dropdown;    // Stylable dropdown that will be created


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

            // Si aucun selected option par defaut, prendre le premier.
            if (selected_option.length === 0) {
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

            // CLICK on the shown item opens the dropdown.
            $("dt a", $styleable_dropdown).on("click", function (evt) {
                evt.preventDefault();
                $("dd ul", $styleable_dropdown).toggle();
            });

            // CLICK somewhere else in the document closes the dopdown.
            $(document).on('click', function (evt) {
                var $clicked = $(evt.target);
                if (!$clicked.parents().hasClass("fbdropdowner")) {
                    $("dd ul", $styleable_dropdown).hide();
                }
            });

            // CLICK on the selected item in the dropdown.
            $("dd a", $styleable_dropdown).on("click", function (evt) {
                evt.preventDefault();

                // Select this item and closes the dropdown.
                var text = $(this).html();
                $("dt a", $styleable_dropdown).html(text);
                $("dd ul", $styleable_dropdown).hide();

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
    $.fn.fbDropdowner = function () {

        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function () {

            // if plugin has not already been attached to the element
            if (undefined == $(this).data('fbDropdowner')) {

                // create a new instance of the plugin
                // pass the DOM element and the user-provided options as arguments
                var plugin = new $.fbDropdowner(this);

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