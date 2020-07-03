(function ($) {
	
	"use strict";

	$(function() {
        $("#tabs").tabs();
    });

/*
	$(window).scroll(function() {
	  var scroll = $(window).scrollTop();
	  var box = $('.header-text').height();
	  var header = $('header').height();

	  if (scroll >= box - header) {
	    $("header").addClass("background-header");
	  } else {
	    $("header").removeClass("background-header");
	  }
	});
*/

	$('.schedule-filter li').on('click', function() {
        var tsfilter = $(this).data('tsfilter');
        $('.schedule-filter li').removeClass('active');
        $(this).addClass('active');
        if (tsfilter == 'all') {
            $('.schedule-table').removeClass('filtering');
            $('.ts-item').removeClass('show');
        } else {
            $('.schedule-table').addClass('filtering');
        }
        $('.ts-item').each(function() {
            $(this).removeClass('show');
            if ($(this).data('tsmeta') == tsfilter) {
                $(this).addClass('show');
            }
        });
    });


	// Window Resize Mobile Menu Fix
	mobileNav();


	// Scroll animation init
	window.sr = new scrollReveal();
	

	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	$(document).ready(function () {
		// Initialize slick sliders
		$('.achievement-slider').slick({
		  centerMode: true,
		  centerPadding: '0px',
		  swipeToSlide: true,
		  slidesToShow: 15,
		  speed: 300,
		  responsive: [
			{
		      breakpoint: 1700,
		      settings: {
		        slidesToShow: 13,
		      }
		    },
			{
		      breakpoint: 1400,
		      settings: {
		        slidesToShow: 12,
		      }
		    },
			{
		      breakpoint: 1100,
		      settings: {
		        slidesToShow: 9,
		      }
		    },
		    {
		      breakpoint: 800,
		      settings: {
		        slidesToShow: 7,
		      }
		    },
		    {
		      breakpoint: 500,
		      settings: {
		        slidesToShow: 5,
		      }
		    }
		  ]
	  	});

		$('.section-slider').slick({
		  lazyLoad: 'ondemand',
		  dots: true,
		  infinite: true,
		  slidesToShow: 6,
		  slidesToScroll: 6,
		  speed: 300,
		  responsive: [
			{
		      breakpoint: 1700,
		      settings: {
		        slidesToShow: 5,
		        slidesToScroll: 5
		      }
		    },
			{
		      breakpoint: 1400,
		      settings: {
		        slidesToShow: 4,
		        slidesToScroll: 4
		      }
		    },
			{
		      breakpoint: 1100,
		      settings: {
		        slidesToShow: 3,
		        slidesToScroll: 3
		      }
		    },
		    {
		      breakpoint: 800,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2
		      }
		    },
		    {
		      breakpoint: 500,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }
		  ]
	  	});

	    $(document).on("scroll", onScroll);
	    
	    //smoothscroll
	    $('.scroll-to-section a[href^="#"]').on('click', function (e) {
	        e.preventDefault();
	        $(document).off("scroll");
	        
	        $('a').each(function () {
	            $(this).removeClass('active');
	        })
	        $(this).addClass('active');
	      
	        var target = this.hash,
	        menu = target;
	       	var target = $(this.hash);
	        $('html, body').stop().animate({
	            scrollTop: (target.offset().top) - 20
	        }, 500, 'swing', function () {
	            window.location.hash = target;
	            $(document).on("scroll", onScroll);
	        });
	    });
	});

	function onScroll(event){
	    var scrollPos = $(document).scrollTop();
	    $('.nav a').each(function () {
	        var currLink = $(this);
	        var refElement = $(currLink.attr("href"));
	        if (typeof refElement.position() !== 'undefined')
	        {
		        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
		            $('.nav ul li a').removeClass("active");
		            currLink.addClass("active");
		        }
		        else{
		            currLink.removeClass("active");
		        }
	        }
	    });
	}


	// Page loading animation
	 $(window).on('load', function() {

        $('#js-preloader').addClass('loaded');

    });


	// Window Resize Mobile Menu Fix
	$(window).on('resize', function() {
		mobileNav();
		//slidesToScroll();
	});


	// Window Resize Mobile Menu Fix
	function mobileNav() {
		var width = $(window).width();
		$('.submenu').on('click', function() {
			if(width < 767) {
				$('.submenu ul').removeClass('active');
				$(this).find('ul').toggleClass('active');
			}
		});
	}
/*
	function slidesToScroll() {
	    if ($(window).width() >= 1280) {
	        $('.section-slider').slick('slickSetOption', 'slidesToScroll', 3, true);
	        console.log("SLIDES 3");
	    } else {
	        $('.section-slider').slick('slickSetOption', 'slidesToScroll', 1, true);
	        console.log("SLIDES 1");
	    }
	}
*/
	// Dynamic video iframes
	$('.video-container').each(function() {
		var container = $(this);
		container.find('.play-button').on('click', function(){
			// Pull the video url from the data attribute on the wrapper element
			container.html('<iframe allowfullscreen frameborder="0" class="embed-responsive-item" src="https://www.youtube.com/embed/' + container.data('video-id') + '?rel=0&modestbranding=1&autoplay=1"></iframe>');
		});
	});

	// Achievement foldout
	$('.achievements-button').click(function(){
		var topSection = $('section:first-of-type');
		var foldout = $('.achievements-foldout');
		var button = $('.achievements-button');

		if (foldout.hasClass("folded")) // Unfold
		{
			var height = $('.achievement-container .circle').first().height()+78;
			topSection.css('margin-top', (height+50)+'px');	
			foldout.removeClass('folded');
			foldout.height(height-80);
			button.addClass('arrow');
			button.html('<');
		}
		else // Fold
		{
			topSection.css('margin-top', '50px');
			foldout.addClass('folded');
			foldout.height(-80);
			button.removeClass('arrow');
			button.html('LOGROS');
		}
	});

	// Achievement info
	$('.achievement-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		var img = $(slick.$slides.get(nextSlide)).find('img');
		$('.achievements-info h3').html(img.data('title'));
		$('.achievements-info p').html(img.attr('alt'));
	});

	// Achievement lock/unlock simulation
	$(".achievement-container").click(function(){
		$(this).toggleClass('locked');
	});

})(window.jQuery);