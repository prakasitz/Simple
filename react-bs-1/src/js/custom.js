// =============================================================
/* Animation */
// =============================================================

$(window).scroll(function () {

	$(".animated-area").each(function () {
		if ($(window).height() + $(window).scrollTop() - $(this).offset().top > 0) {
			$(this).trigger("animate-it");
		}
	});
});

$('a[data-rel]').each(function () {
	$(this).attr('rel', $(this).data('rel'));
});


if ($('.animated-area').length) {
	$(".animated-area").on("animate-it", function () {
		var cf = $(this);
		cf.find(".animated").each(function () {
			$(this).css("-webkit-animation-duration", "0.9s");
			$(this).css("-moz-animation-duration", "0.9s");
			$(this).css("-ms-animation-duration", "0.9s");
			$(this).css("animation-duration", "0.9s");
			$(this).css("-webkit-animation-delay", $(this).attr("data-animation-delay"));
			$(this).css("-moz-animation-delay", $(this).attr("data-animation-delay"));
			$(this).css("-ms-animation-delay", $(this).attr("data-animation-delay"));
			$(this).css("animation-delay", $(this).attr("data-animation-delay"));
			$(this).addClass($(this).attr("data-animation"));
		});
	});
}
// JavaScript Document
$(document).ready(function ($) {

	if ($('#form_contact').length) {
		$('#form_contact').validate();
	}

	if ($('#reserve_form').length) {
		$('#reserve_form').validate();
	}



	if ($('a.login-here').length) {
		$("a.login-here").click(function () {
			//Active Class
			if ($(this).attr('id') == 'log-active') {
				$('#header-login').slideDown();
				$('#header-login').addClass('no-log-active');
				$(this).attr('id', 'no-log-active');
			} else {
				$('#header-login').slideUp();
				$('#header-login').removeClass('no-log-active');
				$(this).attr('id', 'log-active');
			}
		});
	}

	if ($('a.search-toggle').length) {
		$("a.search-toggle").click(function () {
			//Active Class
			if ($(this).attr('id') == 'search-active') {
				$(this).parent().find('#search').animate({ "width": "150px" }, "slow");
				$(this).attr('id', 'no-search-active');
			} else {
				$(this).parent().find('#search').animate({ width: "-10px", border: "0px" }, "slow");
				$(this).attr('id', 'search-active');
			}
		});
	}

	if ($('a.cross-login').length) {
		$("a.cross-login").click(function () {
			//Active Class
			$('#no-log-active').attr('id', 'log-active');
			$('#header-login').slideUp();
		});
	}

	// Nav Bar Dropdown on mouseover
	if ($('.navbar-inner ul >li').length) {
		$(".navbar-inner ul >li").hover(
			function () {
				$(this).addClass('open');
			},
			function () {
				$(this).removeClass('open');
			}
		);
	}
	//Home Page Mian Image Slider
	if ($('.header-slider').length) {
		$('.header-slider').bxSlider({
			auto: true,
			autoControls: false
		});
	}


	//Home Page Quote Slider
	if ($('.quote-slider').length) {
		$('.quote-slider').bxSlider({
			auto: true,
			autoControls: false
		});
	}


	//Home Page Quote Slider
	if ($('.about-slider').length) {
		$('.about-slider').bxSlider({
			auto: true,
			mode: 'fade',
			autoControls: false
		});
	}


	//Product Details Page
	if ($('.pro-slider').length) {
		$('.pro-slider').bxSlider({
			pagerCustom: '#bx-pager'
		});
	}

	if ($('.bxslider').length) {
		$('.bxslider').bxSlider({
			pagerCustom: '#bx-pager'
		});
	}


	//Partner Logos
	if ($('.logo-slider').length) {
		$('.logo-slider').bxSlider({
			minSlides: 1,
			maxSlides: 6,
			slideWidth: 170,
			slideMargin: 24
		});
	}

	if ($('.blog-slider').length) {
		$('.blog-slider').bxSlider({
			adaptiveHeight: true,
			mode: 'fade'
		});
	}


	// Dropdown Menu Fade
	if ($('.dropdown').length) {
		$(".dropdown").hover(
			function () {
				$('.dropdown-menu', this).fadeIn("fast");
			},
			function () {
				$('.dropdown-menu', this).fadeOut("fast");
			});
	}

	if ($('#container').length) {
		$('#container').BlocksIt({
			numOfCol: 3,
			offsetX: 8,
			offsetY: 8
		});
	}

	if ($('#container-blog').length) {
		$('#container-blog').BlocksIt({
			numOfCol: 2,
			offsetX: 15,
			offsetY: 0
		});
	}

	var currentWidth = 1140;
	$(window).resize(function () {
		var winWidth = $(window).width();
		var conWidth = '';
		var col = '';
		if (winWidth < 660) {
			conWidth = 440;
			col = 2
		} else if (winWidth < 880) {
			conWidth = 660;
			col = 3
		} else if (winWidth < 1100) {
			conWidth = 880;
			col = 4;
		} else {
			conWidth = 1100;
			col = 5;
		}

		if (conWidth != currentWidth) {
			currentWidth = conWidth;
			$('#container').width(conWidth);
			$('#container').BlocksIt({
				numOfCol: col,
				offsetX: 8,
				offsetY: 8
			});
		}
	});






	//Sticky Header
	if ($('#header').length) {
		// grab the initial top offset of the navigation 
		var stickyNavTop = $('#header').offset().top;
		// our function that decides weather the navigation bar should have "fixed" css position or not.
		var stickyNav = function () {
			var scrollTop = $(window).scrollTop(); // our current vertical position from the top

			// if we've scrolled more than the navigation, change its position to fixed to stick to top,
			// otherwise change it back to relative
			if (scrollTop > stickyNavTop) {
				$('#header').addClass('sticky');
			} else {
				$('#header').removeClass('sticky');
			}
		};
		stickyNav();
		// and run it again every time you scroll
		$(window).scroll(function () {
			stickyNav();
		});
	}
	//Sticky Header End

	if ($('#duration').length) {
		if ($('#duration').length) {
			$('#duration').timepicker();
		}
	}

});

$(window).on('load', function () {
	if ($('.selectpicker').length) {
		$('.selectpicker').selectpicker({
			'selectedText': 'cat',
		});
	}
});