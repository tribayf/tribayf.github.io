$(window).on('load', function() {

  function centerImages() {
    $('.flexslider').each(function() {

      var images = $(this).find('.slides li img');

      var maxHeight = images.toArray().reduce(
        function (max, image) { return Math.max(max, image.height) } , 0);

      images.each(function() {
        var image = $(this);
        var height = image.height();
        if (height < maxHeight) {
          image.css('padding-top', 0.5*(maxHeight - height));
        }
      })
    });
  }

  $('.flexslider').flexslider({
    slideshow: false,
    controlNav: "thumbnails",
    smoothHeight: false,
    start: centerImages
  });

  $('.swipebox').swipebox({
    removeBarsOnMobile : false,
    hideBarsDelay : 0
  });

  $(window).resize(centerImages);

});
