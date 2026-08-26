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


    document.addEventListener('DOMContentLoaded', function () {
    const openButton =
        document.getElementById('openEnrollForm');

    const closeButton =
        document.getElementById('closeEnrollForm');

    const modal =
        document.getElementById('enrollModal');

    const overlay =
        document.getElementById('enrollModalOverlay');

    const form =
        document.getElementById('enrollmentForm');

    const phoneInput =
        document.getElementById('studentPhone');

    const dobInput =
        document.getElementById('studentDob');

    const classSelect =
        document.getElementById('drivingClass');

    const otherField =
        document.getElementById('otherInterestField');

    const otherInput =
        document.getElementById('otherInterest');


    if (
        !openButton ||
        !closeButton ||
        !modal ||
        !overlay ||
        !form
    ) {
        console.error(
            'Enrollment form elements are missing from the HTML.'
        );

        return;
    }


  function openEnrollmentModal(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    // Stop the header carousel
    $('.header-carousel').trigger(
        'stop.owl.autoplay'
    );

    modal.classList.add('active');

    document.body.classList.add(
        'enroll-modal-open'
    );

    setTimeout(function () {
        document
            .getElementById('studentName')
            .focus();
    }, 300);
}



  function closeEnrollmentModal() {
    modal.classList.remove('active');

    document.body.classList.remove(
        'enroll-modal-open'
    );

    // Start the header carousel again
    $('.header-carousel').trigger(
        'play.owl.autoplay',
        [3500]
    );
}


    openButton.addEventListener(
        'click',
        openEnrollmentModal
    );


    closeButton.addEventListener(
        'click',
        closeEnrollmentModal
    );


    overlay.addEventListener(
        'click',
        closeEnrollmentModal
    );


    document.addEventListener(
        'keydown',
        function (event) {
            if (
                event.key === 'Escape' &&
                modal.classList.contains('active')
            ) {
                closeEnrollmentModal();
            }
        }
    );


    // Do not allow a future DOB
    const today =
        new Date().toISOString().split('T')[0];

    dobInput.setAttribute('max', today);


    // Allow only 10 numbers
    phoneInput.addEventListener(
        'input',
        function () {
            this.value = this.value
                .replace(/\D/g, '')
                .slice(0, 10);
        }
    );


    // Show the Others field
    classSelect.addEventListener(
        'change',
        function () {
            if (this.value === 'Others') {
                otherField.classList.add('active');
                otherInput.required = true;
            } else {
                otherField.classList.remove('active');
                otherInput.required = false;
                otherInput.value = '';
            }
        }
    );


    // Send details to WhatsApp
    form.addEventListener(
        'submit',
        function (event) {
            event.preventDefault();


            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }


            const name =
                document
                    .getElementById('studentName')
                    .value
                    .trim();

            const dob =
                dobInput.value;

            const phone =
                phoneInput.value.trim();

            let selectedClass =
                classSelect.value;


            if (selectedClass === 'Others') {
                selectedClass =
                    otherInput.value.trim();
            }


            const dobParts =
                dob.split('-');

            const formattedDob =
                dobParts[2] +
                '/' +
                dobParts[1] +
                '/' +
                dobParts[0];


            const message =
`Hello Rani Driving School,

I would like to enrol for driving training.

Name: ${name}
Date of Birth: ${formattedDob}
Phone Number: ${phone}
Interested In: ${selectedClass}

Please contact me with further details.`;


            // WhatsApp number: 75500 08588
            const whatsappNumber =
                '919842952188';


            const whatsappUrl =
                'https://wa.me/' +
                whatsappNumber +
                '?text=' +
                encodeURIComponent(message);


            window.open(
                whatsappUrl,
                '_blank'
            );
        }
    );
});


document.addEventListener('DOMContentLoaded', function () {
    const faqItems =
        document.querySelectorAll('.rds-faq-item');

    const faqRevealElements =
        document.querySelectorAll('.rds-faq-reveal');


    // =====================================
    // FAQ ACCORDION
    // =====================================

    faqItems.forEach(function (item) {
        const question =
            item.querySelector('.rds-faq-question');

        question.addEventListener('click', function () {
            const isAlreadyOpen =
                item.classList.contains('active');


            // Close every FAQ
            faqItems.forEach(function (faq) {
                faq.classList.remove('active');

                faq
                    .querySelector('.rds-faq-question')
                    .setAttribute(
                        'aria-expanded',
                        'false'
                    );
            });


            // Open clicked FAQ
            if (!isAlreadyOpen) {
                item.classList.add('active');

                question.setAttribute(
                    'aria-expanded',
                    'true'
                );
            }
        });
    });


    // =====================================
    // STAGGERED SCROLL REVEAL
    // =====================================

    faqRevealElements.forEach(function (element, index) {
        element.style.transitionDelay =
            Math.min(index * 90, 450) + 'ms';
    });


    if ('IntersectionObserver' in window) {
        const faqObserver =
            new IntersectionObserver(
                function (entries, observer) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add(
                                'rds-faq-visible'
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }
                    });
                },
                {
                    threshold: 0.15
                }
            );


        faqRevealElements.forEach(function (element) {
            faqObserver.observe(element);
        });
    } else {
        faqRevealElements.forEach(function (element) {
            element.classList.add(
                'rds-faq-visible'
            );
        });
    }
});

})(jQuery);


