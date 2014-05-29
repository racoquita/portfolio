var scroller;
var g_scroller;
var appended = false;
var startPos = 0;
var prevPos = 0;
var fromClick = false;
var galleryItem;
var works = getPortfolioData();

$(document).ready(function(){
	galleryItem = $('#gallery li');
	initPackery();
	initScroller();
	initGalleryScroll();
	handleNav();
	onItemHover();
	itemClickHandler();
	
});

var initPackery = function () {	 
	$('#gallery').packery({
		columnWidth: '.grid-sizer',
		isHorizontal: true,
		gutter:5,
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
function onItemHover () {
	var info;
	var img;
	galleryItem.on('mouseenter', function(e) {
		
		img = $(e.target).closest('li').find('img');
		info = $(e.target).closest('li').find('.info');
		info.addClass('show');
		return false;

	}).on('mouseleave', function () {
		
		info.removeClass('show');
		return false	
	});
}
function getPortfolioData () {

	$.getJSON('http://localhost/14Personal/scrolling/json/data.json', function(res){
		works = res;

	});
	return works
}
function itemClickHandler () {
	var selLi;
	var clone;
	var closeLink = $('.close');
	
	galleryItem.on('click',function(e) {
		selLi = $(e.target).closest('li');
		var selected = selLi.find('.contain').data('name');
		var data = works[selected];
		clone = $('<div class="contain"></div>');
		
		clone.addClass('clone').css({
			top: selLi.position().top,
			left:selLi.position().left,
			width:selLi.width(),
			height:selLi.height()
		});
		console.log(works)
		$(clone).html(raco.selectedWork(data));
		$('#portfolio').append(clone);
		setTimeout(function() {
			$(clone).addClass('full');

			setTimeout(function(){
				$(clone).find('img').css('opacity', 1);
				$(clone).find('.expanded-info').css('opacity', 1);
				$(clone).find('dl').css('opacity', 1);
				$(clone).children().css('opacity', 1);
			}, 10);
		}, 10);
		closeLink.show().on('click', function(e) {
			$(this).hide();
			clone.remove();
			return false;
		});
	});
}
