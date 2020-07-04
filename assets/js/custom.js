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
	mobileNavigation();


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
		  infinite: true,
		  centerPadding: '2px',
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
		        slidesToShow: 11,
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
		mobileNavigation();
		unfoldedAchievements();
		//slidesToScroll();
	});


	// Window Resize Mobile Menu Fix
	function mobileNavigation() {
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
		if ($('.achievements-foldout').hasClass("folded"))
		{
			// Unfold
			var circle = $('.achievement-container .circle').first();
			var height = $(circle).height()+78;
			var width = $(circle).width()+6;
			
			$('.achievements-foldout').height(height-80).removeClass('folded'); 					// Move the unfolded element down (by increaseing its height)
			$('.achievements-button').html('<').addClass('arrow'); 									// Change the fold button content and style
			$('.achievement-slider .slick-arrow').width(width).height(width).css('opacity', '1'); 	// Show arrows (addapted to the current circle size)
			$('section:first-of-type').css('margin-top', (height+50)+'px');							// Move "top of the page" along
		}
		else
		{
			// Fold
			$('.achievements-foldout').height(-80).addClass('folded');			// Move the folded element up (by reducing its height)
			$('.achievements-button').html('LOGROS').removeClass('arrow');		// hange the fold button content and style
			$('.achievement-slider .slick-arrow').css('opacity', '0');			// Hide arrows
			$('section:first-of-type').css('margin-top', '50px');				// Move "top of the page" back to original position
		}
	});

	// Achievement info
	$('.achievement-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		var img = $(slick.$slides.get(nextSlide)).find('img');
		$('.achievements-info h3').html(img.data('title'));
		$('.achievements-info p').html(img.attr('alt'));
	});

	function unfoldedAchievements() {
		if (!$('.achievements-foldout').hasClass("folded"))
		{
			var circle = $('.achievement-container .circle').first();
			var height = $(circle).height()+78;
			var width = $(circle).width()+6;
			$('.achievements-foldout').height(height-80);
			$('.achievement-slider .slick-arrow').width(width).height(width).css('opacity', '1');;
			$('section:first-of-type').css('margin-top', (height+50)+'px');
		}
	}

	// Achievement lock/unlock simulation
	$(".achievement-container").click(function(){
		$(this).toggleClass('locked');
	});

})(window.jQuery);