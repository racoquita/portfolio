var scroller;
var g_scroller;
var appended = false;
var startPos = 0;
var prevPos = 0;
var fromClick = false;

$(document).ready(function(){
	initPackery();
	initScroller();
	initGalleryScroll();
	handleNav();
});

var initPackery = function () {	 
	$('#gallery').packery({
		columnWidth: '.grid-sizer',
		isHorizontal: true,
		gutter:10,
		itemSelector: '.item'
	});
}

function initScroller() {
	$('#scroll, ul.wrapper li.bg').height($(window).height());
	$('.wrapper').height($(window).height() * 3);

	scroller = new IScroll('#scroll', {
		scrollX: false,
		scrollY: true,
		probeType: 3,
		mouseWheel: true
	});

	scroller.on('scroll', function() {
		checkDir(this.y);

		if($('#portfolio').position().top <= $('header:not(.clone)').height()) {
			if(!appended) {
				var clone = $('#about').find('header').clone();
					clone.addClass('clone');

				$('#about').find('header').hide();
				$('body').append(clone);
				
				appended = true;
				handleNav();
			}
		} else {
			$('header.clone').remove();
			$('#about').find('header').show();
			appended = false;
		}
	});

	scroller.on('scrollStart', function(){
		startPos = this.y;
		checkDir(this.y);
	});
}

function handleNav() {
	$('header a').on('click', function(e){
		e.preventDefault();
		fromClick = true;

		var target = $(e.currentTarget).data('scroll');

		if(typeof scroller != 'undefined') {
			scroller.scrollToElement('#' + target, 500);

			$('header a').removeClass('active');
			$('header a[data-scroll="'+ target +'"]').addClass('active');

			setTimeout(function(){
				fromClick = false;
			}, 500);
		}
	});
}

function checkDir(y) {
	var dir = prevPos - y;
		prevPos = y;

	if(appended && !fromClick) {
		if(dir > 0) $('.clone').addClass('hide');
		if(dir < 0) $('.clone').removeClass('hide');
	}
}

function initGalleryScroll() {
	g_scroller = new IScroll('#g-scroll', {
		scrollX: true,
		scrollY: false,
		probeType: 3,
		mouseWheel: false
	});

	g_scroller.on('beforeScrollStart', function(){
		console.log(this);
	});
}
