(function ($) {

  jQuery(window).load(function () {
    jQuery("#preloader").delay(100).fadeOut("slow");
    jQuery("#load").delay(100).fadeOut("slow");
  });
  if ($(document).width() < 768) {
    $(".navbar-fixed-top").addClass("top-nav-collapse");
    $("#logoImg").attr("src", "img/logo_invert_mini.png");
  }else{ 
    new WOW().init(); 
  }
  $(window).scroll(function () {
    if ($(".navbar").offset().top > 50) {
      $(".navbar-fixed-top").addClass("top-nav-collapse");
      $("#logoImg").attr("src", "img/logo_invert_mini.png");
    } else {
      if ($(document).width() > 768) {
        $("#logoImg").attr("src", "img/logo_mini.png");
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
      }
    }
  });
  $(window).scroll(function () {
    if ($(".navbar").offset().top > 1000) {
      $(".toTop").removeClass("on");
    } else {
      $(".toTop").addClass("on");
    }
  });
  var $grid = $('.grid').isotope({
    filter: '*'
  });
  $("#gallery").justifiedGallery({
    lastRow: 'justify',
    rowHeight: 160
  });
  $('.filter-group').on('click', 'a', function () {
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({
      filter: filterValue
    });
  });

  $('.filter-group').each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'a', function () {
      $buttonGroup.find('.active').removeClass('active');
      $(this).addClass('active');
    });
  });

  $('#gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    gallery: {enabled: true}
  });

  $('#up').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 2000);
    return false;
  })  
})(jQuery);