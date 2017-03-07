/**
 * jquery.fbdropdownstyle.js
 * Version 1.1
 * March 2017
 *
 * Dropdown list styling (<select>).
 * Because styling dropdown lists for browsers is pretty much impossible!
 * This plugin transforms the <select> tag to <dl>, <dt> and <dd> tags, which are more stylable.
 * Don't forgot to include the fbdropdownstyle.css file.
 *
 * Required:
 *    - jQuery (tested on jQuery v3.1.1)
 *
 * To activate :
 *    $(".js-dropdown").fbdropdownstyle();
 *
 */

(function ($) {

    $.fn.fbdropdownstyle = function (options) {

        // Global vars
        var
            $dropdown,
            $styleable_dropdown;


        return this.each(function () {
            $dropdown = $(this);

            create_stylable_dropdown();
            create_events();
        });


        // TRANSFORMS the <select> to more stylable tags
        // Those tags are <dl>, <dt> and <dd>
        function create_stylable_dropdown() {
            var
                selected_option = $dropdown.find("option[selected]"),
                $options = $("option", $dropdown);

            $styleable_dropdown = $('<dl class="fbdropdownstyle"></dl>');

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
                $("dd ul", $styleable_dropdown).append('<li><a href="#">' +
                    $(this).text() + '<span class="value">' +
                    $(this).val() + '</span></a></li>');
            });

        }


        function create_events() {

            // CLICK on the shown item opens the dropdown.
            $("dt a", $styleable_dropdown).on("click", function (evt) {
                evt.preventDefault();
                $("dd ul", $styleable_dropdown).toggle();
            });

            // CLICK somewhere else in the document closes the dopdown.
            $(document).on('click', function (evt) {
                var $clicked = $(evt.target);
                if (!$clicked.parents().hasClass("fbdropdownstyle"))
                    $("dd ul", $styleable_dropdown).hide();
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
            });
        }
    };

}(jQuery));

