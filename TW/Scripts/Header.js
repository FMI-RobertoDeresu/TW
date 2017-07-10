$(document).ready(function() {
    $("header ul.dropdown li.item img.toggle-dropdown").on("click", function() {
        var $item = $(this).parent().parent();

        $item.toggleClass("hidden-dropdown");
        $item.toggleClass("visible-dropdown");
    });

    $("header #logo #menu-icon").on("click", function() {
        $("header div.menu").toggleClass("closed");
        $(this).toggleClass("active");
    });

    var degrees = 0;
    var duration = 3;
    var interval = 4;

    setInterval(function() {
        degrees += 180;

        if (degrees / 180 > 7) {
            degrees = 0;
        }

        $("header #logo img").css({
            '-webkit-transform': "rotateY(" + degrees + "deg)",
            '-moz-transform': "rotateY(" + degrees + "deg)",
            '-ms-transform': "rotateY(" + degrees + "deg)",
            'transform': "rotateY(" + degrees + "deg)",
            '-moz-transition': duration + "s",
            '-o-transition': duration + "s",
            '-webkit-transition': duration + "s",
            'transition': duration + "s"
        });
    }, interval * 1000);
});