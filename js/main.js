(function ($) {
    "use strict";

    // Preloader
    $(window).on('load', function () {
        if ($('#preloader').length) {
            $('#preloader').delay(100).fadeOut('slow', function () {
                $(this).remove();
            });
        }
    });
    
    // Full page
    var myFullpage = new fullpage('#full-page', {
        scrollBar: true,
        scrollingSpeed: 500,
        autoScrolling: true,
        fitToSection: true,
        navigation: true,
        navigationPosition: 'left',
        paddingTop: '0',
        paddingBottom: '0',
        verticalCentered: true,
        showActiveTooltip: true,
        navigationTooltips: ['HOME', 'OUR STORY', 'GALLERY', 'THE WEDDING', 'GETTING THERE', 'REGISTRY', 'RSVP', 'DAYS LEFT'],
        sectionsColor: ['#ffffff']
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Initiate menu
    $('#header').after('<div class="mobile-menu d-xl-none">');
    $('.top-menu').clone().appendTo('.mobile-menu');
    $('.mobile-menu-btn').click(function () {
        $('.mobile-menu').stop().slideToggle();
    });

    // Intro carousel
    var introCarousel = $(".carousel");
    var introCarouselIndicators = $(".carousel-indicators");
    introCarousel.find(".carousel-inner").children(".carousel-item").each(function (index) {
        (index === 0) ?
                introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "' class='active'></li>") :
                introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "'></li>");

        $(this).css("background-image", "url('" + $(this).children('.carousel-background').children('img').attr('src') + "')");
        $(this).children('.carousel-background').remove();
    });

    $(".carousel").swipe({
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            if (direction == 'left')
                $(this).carousel('next');
            if (direction == 'right')
                $(this).carousel('prev');
        },
        allowPageScroll: "vertical"
    });
    
    //Portfolio modal slider
    $('.gallery').slick({
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.gallery-nav'
    });
    $('.gallery-nav').slick({
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.gallery',
        arrows: false,
        dots: false,
        centerMode: true,
        focusOnSelect: true
    });
    
    // Countdown mariage 19 juin 2027 15h30
    function updateHeaderClock() {
        var target = new Date(2027, 5, 19, 15, 30, 0);
        var diff = target - new Date();
        if (diff <= 0) { return; }
        var d = Math.floor(diff / 86400000);
        var h = Math.floor((diff % 86400000) / 3600000);
        var m = Math.floor((diff % 3600000) / 60000);
        var s = Math.floor((diff % 60000) / 1000);
        var pad = function(n) { return String(n).padStart(2, '0'); };
        $('#hc-days').text(pad(d));
        $('#hc-hours').text(pad(h));
        $('#hc-minutes').text(pad(m));
        $('#hc-seconds').text(pad(s));
    }
    updateHeaderClock();
    setInterval(updateHeaderClock, 1000);

})(jQuery);


// Lightbox
function openLightbox(src) {
    document.getElementById('lightbox-img').src = src;
    var lb = document.getElementById('lightbox');
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = '';
}
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
});
