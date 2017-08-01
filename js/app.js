function centerImages() {
  $('.flexslider').each(function() {
    var maxHeight = 0;
    $(this).find('.slides li img').each(function() {
      maxHeight = Math.max(maxHeight, $(this).height());
    })
    $(this).find('.slides li img').each(function() {
      var img = $(this);
      var height = img.height();
      if (height < maxHeight) {
        img.css('padding-top', 0.5*(maxHeight - height));
      }
    })
  });
}

$(document).ready(function() {
  $('.flexslider').flexslider({
    slideshow: false,
    controlNav: "thumbnails",
    smoothHeight: false,
    start: function() { centerImages(); }
  });
  $('.swipebox').swipebox({
    removeBarsOnMobile : false,
    hideBarsDelay : 0
  });
  $(window).resize(function() {
    centerImages();
  });
});
