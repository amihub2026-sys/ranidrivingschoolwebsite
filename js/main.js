(function ($) {
    "use strict";

    // Spinner
    function spinner() {
        setTimeout(function () {
            $('#spinner').removeClass('show');
        }, 1);
    }
    spinner();

    $(document).ready(function () {

        // WOW
        if (typeof WOW !== "undefined") {
            new WOW().init();
        }

        // Header carousel - faster slider text/transition
        if ($(".header-carousel").length) {
            $(".header-carousel").owlCarousel({
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                items: 1,
                margin: 0,
                stagePadding: 0,
                autoplay: true,
                autoplayTimeout: 3500,
                smartSpeed: 350,
                dots: false,
                loop: true,
                nav: true,
                navText: [
                    '<i class="bi bi-arrow-left"></i>',
                    '<i class="bi bi-arrow-right"></i>'
                ]
            });
        }

        // Service carousel
        if ($(".service-carousel").length) {
            $(".service-carousel").owlCarousel({
                autoplay: true,
                smartSpeed: 1000,
                center: false,
                dots: false,
                loop: true,
                margin: 25,
                nav: true,
                navText: [
                    '<i class="bi bi-arrow-left"></i>',
                    '<i class="bi bi-arrow-right"></i>'
                ],
                responsive: {
                    0: { items: 1 },
                    576: { items: 1 },
                    768: { items: 2 },
                    992: { items: 2 },
                    1200: { items: 2 }
                }
            });
        }

        // Testimonial carousel
        if ($(".testimonial-carousel").length) {
            $(".testimonial-carousel").owlCarousel({
                autoplay: true,
                smartSpeed: 1000,
                center: false,
                dots: true,
                loop: true,
                margin: 25,
                nav: false,
                responsive: {
                    0: { items: 1 },
                    576: { items: 1 },
                    768: { items: 1 },
                    992: { items: 1 },
                    1200: { items: 2 }
                }
            });
        }

        // Back to top
        $('.back-to-top').on('click', function () {
            $('html, body').stop().animate({ scrollTop: 0 }, 700);
            return false;
        });

        // Smooth scroll for same-page navbar links
        $('.navbar-nav .nav-link, .dropdown-menu .dropdown-item, .navbar-brand.brand').on('click', function (e) {
            var href = $(this).attr('href');
            if (!href || href.indexOf('#') === -1) return;

            var targetId = href.substring(href.indexOf('#'));
            var $target = $(targetId);

            if ($target.length) {
                e.preventDefault();

                var navHeight = $('.custom-navbar-wrap').outerHeight() || 80;
                var targetTop = $target.offset().top - navHeight + 2;

                $('html, body').stop().animate({
                    scrollTop: targetTop
                }, 600);

                if ($('#navCollapse').hasClass('show')) {
                    $('#navCollapse').collapse('hide');
                }

                if (window.location.hash !== targetId) {
                    history.replaceState(null, null, targetId);
                }
            }
        });

        // Mobile dropdown fix
        $('.mobile-dropdown .dropdown-toggle').on('click', function (e) {
            if ($(window).width() < 992) {
                e.preventDefault();
                $(this).parent().toggleClass('show');
                $(this).next('.dropdown-menu').toggleClass('show');
            }
        });

        // Active nav on scroll
        var sectionIds = ['home', 'about', 'services', 'team', 'testimonials', 'contact'];
        var ticking = false;

        function clearActiveNav() {
            $('.navbar-nav .nav-link').removeClass('active');
            $('.dropdown-menu .dropdown-item').removeClass('active');
            $('.navbar-nav .dropdown-toggle').removeClass('active');
        }

        function setActiveNavOnScroll() {
            var scrollPos = $(window).scrollTop() + 140;
            var currentSection = 'home';

            for (var i = 0; i < sectionIds.length; i++) {
                var id = sectionIds[i];
                var $section = $('#' + id);

                if ($section.length) {
                    var top = $section.offset().top;
                    var height = $section.outerHeight();

                    if (scrollPos >= top && scrollPos < top + height) {
                        currentSection = id;
                        break;
                    }
                }
            }

            clearActiveNav();

            var $mainLink = $('.navbar-nav .nav-link[href="#' + currentSection + '"], .navbar-nav .nav-link[href="index.html#' + currentSection + '"]');
            var $dropLink = $('.dropdown-menu .dropdown-item[href="#' + currentSection + '"], .dropdown-menu .dropdown-item[href="index.html#' + currentSection + '"]');

            if ($mainLink.length) {
                $mainLink.addClass('active');
            }

            if ($dropLink.length) {
                $dropLink.addClass('active');
            }

            if (currentSection === 'team' || currentSection === 'testimonials') {
                $('.navbar-nav .dropdown-toggle').addClass('active');
            }
        }

        // Reveal on scroll
        function revealOnScroll() {
            $('.reveal-up, .reveal-left, .reveal-right, .reveal-zoom, .reveal-fade').each(function () {
                var elementTop = $(this).offset().top;
                var windowBottom = $(window).scrollTop() + $(window).height();

                if (windowBottom > elementTop + 80) {
                    $(this).addClass('show');
                }
            });
        }

        // Counter animation
        function animateCounter($counter) {
            var target = parseInt($counter.attr('data-target'), 10) || 0;
            var current = 0;
            var increment = Math.max(1, Math.ceil(target / 60));

            function update() {
                current += increment;
                if (current < target) {
                    $counter.text(current);
                    requestAnimationFrame(update);
                } else {
                    $counter.text(target);
                }
            }

            update();
        }

        function startCountersOnScroll() {
            $('.counter').each(function () {
                var $this = $(this);
                if ($this.hasClass('counted')) return;

                var elementTop = $this.offset().top;
                var windowBottom = $(window).scrollTop() + $(window).height();

                if (windowBottom > elementTop + 80) {
                    $this.addClass('counted');
                    animateCounter($this);
                }
            });
        }

        function onScrollHandler() {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    if ($(window).scrollTop() > 300) {
                        $('.back-to-top').fadeIn('slow');
                    } else {
                        $('.back-to-top').fadeOut('slow');
                    }

                    revealOnScroll();
                    startCountersOnScroll();
                    setActiveNavOnScroll();
                    ticking = false;
                });

                ticking = true;
            }
        }

        $(window).on('scroll', onScrollHandler);

        // Force homepage top on first load only
        setTimeout(function () {
            if (!window.location.hash || window.location.hash === '#home') {
                $('html, body').scrollTop(0);
            }
            revealOnScroll();
            startCountersOnScroll();
            setActiveNavOnScroll();
        }, 100);
    });

})(jQuery);