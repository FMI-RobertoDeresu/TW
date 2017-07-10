"use strict";
(function() {
    $(".gallery").each(function() {
        var $mainImage = $(this).find(".main-image");
        var $images = $(this).find(".images");
        var $firstImage = $images.find("img").first();

        $mainImage.attr("src", $firstImage.attr("src"));
        $firstImage.addClass("active");
    });
})();

$(".gallery .change-image.right, .gallery .change-image.left").on("click", function() {
    var $gallery = $(this).parent();
    var $mainImage = $gallery.find(".main-image");
    var $images = $gallery.find(".images");
    var $activeImage = $images.find(".active").first();
    var $prevImage = $activeImage.prev("img");
    var $nextImage = $activeImage.next("img");

    var offsetFromBegin = $images.find("img").index($activeImage) * $activeImage.width();
    var scrollOffset = $images.scrollLeft();

    if ($(this).data("direction") === "left" && $prevImage.length > 0) {
        $mainImage.attr("src", $prevImage.attr("src"));
        $prevImage.addClass("active");
        $activeImage.removeClass("active");
        if (offsetFromBegin < scrollOffset + $images.width() / 2 || offsetFromBegin > scrollOffset + $images.width()) {
            $images.animate({
                scrollLeft: offsetFromBegin - $images.width() / 2
            }, 100);
        }
    }
    else if ($(this).data("direction") === "right" && $nextImage.length > 0) {
        $mainImage.attr("src", $nextImage.attr("src"));
        $nextImage.addClass("active");
        $activeImage.removeClass("active");
        if (offsetFromBegin + $activeImage.width() > scrollOffset + $images.width() / 2 || offsetFromBegin < scrollOffset) {
            $images.animate({
                scrollLeft: offsetFromBegin - $images.width() / 2 + $activeImage.width()
            }, 100);
        }
    }
});

$(".gallery .images img").on("click", function() {
    var $gallery = $(this).parent().parent();
    var $mainImage = $gallery.find(".main-image");
    var $images = $gallery.find(".images");
    var $activeImage = $images.find(".active").first();
    var $selectedImage = $(this);

    $mainImage.attr("src", $selectedImage.attr("src"));
    $selectedImage.addClass("active");
    $activeImage.removeClass("active");
});