$.fn.visible = function(partial) {
    
      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;
    
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

};
var scroller;
var g_scroller;
var appended = false;
var startPos = 0;
var prevPos = 0;
var fromClick = false;
var galleryItem;
var works = getPortfolioData();
var $portfolio;
var $gallery;
var $about;
var $sm;

$(document).ready(function(){
	galleryItem = $('#gallery li');
	$portfolio =  $('#portfolio');
	$gallery = $('#gallery');
	$about = $('#about');
	$sm = $('#sm');

	initScroller();
	//initGalleryScroll();
	handleNav();
	onItemHover();
	itemClickHandler();
	
	init();
});

var initPackery = function () {	 
	galleryItem.css({
		height: $(window).innerHeight() / 2+"px"
	})
	$gallery.packery({
		columnWidth: '.item',
		isHorizontal: true,
		gutter:0,
		isResizeBound: false,
		itemSelector: '.item'
	});
}
function init () {
	$sm.addClass('come-in');
	$('.introduction.scroll-signifier').addClass('animated').addClass('bounce');
	initPackery();
}
function initScroller() {
	$('#scroll, ul.wrapper li.bg').height($(window).height());
	$('.wrapper').height($(window).height() * 3);

	scroller = new IScroll('#scroll', {
		scrollX: false,
		scrollY: true,
		probeType: 3,
		mouseWheel: true,
		momentum:true
	});


	scroller.on('scroll', function() {
		checkDir(this.y);

		if($portfolio.position().top <= $('header:not(.clone)').height()) {
			if(!appended) {
				var clone = $about.find('header').clone();
					clone.addClass('clone');

				$about.find('header').hide();
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
		mouseWheel: true,
		snap:true,
		eventPassthrough:true
	});

	// g_scroller.on('beforeScrollStart', function(){
	// 	console.dir(g_scroller.options);
	// 	console.log('before')
	// });
	g_scroller.on('scroll', function(){
		console.dir(g_scroller.options);
		console.log('scroll');
	});
}
function onItemHover () {
	var info;
	var img;
	galleryItem.on('mouseenter', function(e) {
		e.preventDefault();
		img = $(e.target).closest('li').find('img');
		info = $(e.target).closest('li').find('.info');
		info.addClass('show');
		
	}).on('mouseleave', function () {
		
		info.removeClass('show');
		return false;
	});
}
function getPortfolioData () {
	$.getJSON('json/data.json', function(res){
		works = res;
	});

	return works;
}
function itemClickHandler () {
	var clone = $('<div class="contain"></div>');

	galleryItem.on('click',function(e) {
		var selLi = $(e.target).closest('li');
		var selected = selLi.find('.contain').data('name');	

		$('header a[data-scroll="portfolio"]').trigger('click');
		
		clone.addClass('clone').css({
			top: selLi.position().top,
			left:selLi.position().left,
			width:selLi.width(),
			height:selLi.height()
			//backgroundColor: selLi.css('background-color')
		});

		$portfolio.append(clone);

		appendWorkData(selected);
	});
}
function appendWorkData(name) {
	var clone = $('.contain.clone');
	var data = works[name];
	var closeLink = $('.close');
	var to = [];
	clone.html(raco.selectedWork(data));
	
	setTimeout(function() {
		$(clone).addClass('full');

		setTimeout(function(){
			$(clone).find('img').css('opacity', 1);
			$(clone).find('.expanded-info').css('opacity', 1);
			$(clone).find('dl').css('opacity', 1);
			$(clone).children().css('opacity', 1);

			setWorkEvents(data);
		}, 10);
	}, 15);

	closeLink.show().on('click', function(e) {
		e.preventDefault();
		$(this).hide();
		clone.remove();
	});
}
function setWorkEvents(data) {
	var num = data.images.length;
	var counter = 1;

	$('.clone .next').on('click', function(e){
		e.preventDefault();

		if(num > 1) {
			$('#imgFull img').attr('src', data.images[counter].image);
			counter < data.images.length - 1 ? counter++ : counter = 0;
		}
		
	});

	$('.clone .prev').on('click', function(e){
		e.preventDefault();
		if(num > 1) {
			$('#imgFull img').attr('src',  data.images[counter].image);
			counter > 0 ? counter-- : counter = num - 1;
		}
	});
}
