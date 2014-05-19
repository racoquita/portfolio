var about; 
var portfolio;
var faq;
var contact;
var id;
var view;
var inViewSection;
var bg;
var galleryItem;
var closeLink;
var navLink;
var header;
var currentSection;
var activeNav;
var to;
var interval;
var inview = false;
var temp;
var scrolling=false;
var scrollBox;
var info;
var selLi;
function getInnerWidth(){

	return (window.innerWidth) ? window.innerWidth : ((document.documentElement.clientWidth) ? document.documentElement.clientWidth : document.body.clientWidth);
}
function getInnerHeight(){

	return (window.innerHeight) ? window.innerHeight : ((document.documentElement.clientHeight) ? document.documentElement.clientHeight : document.body.clientHeight);
}
var getCurrentSection = function () {
	
	bg.each(function(index, el){
		
		var el = $(el);
		if (el.visible(true)) {
			
		    inViewSection = el.attr('id');
		} 
		// if( ($(window).scrollTop() >= $(elem).offset().top - $(window).innerHeight() / 2)  && ( $(window).scrollTop() <= $(elem).offset().top  + $(window).innerHeight() /2 ) ){
		// 	inViewSection = $(elem).attr('id');
		// }
	});

	return inViewSection
}
var clearTimeouts = function(argument) {
	clearTimeout(to[0]);
 	clearTimeout(to[1]);
}
var animateTo = function(currSection){
	//scrolling = true;

	updateNav($(currSection).attr('id'));

	var tl = new TimelineMax({
		onComplete: function() {
			console.log('done')
			scrolling = false;
		}
	});

	tl.to( window, 1, { scrollTo:{y:currSection.offset().top}, ease:Power2.easeOut});

}
var updateNav = function(section){

	activeNav = $('nav a[data-scroll="'+section+'"');
	if(! activeNav.hasClass('active')) {
		$('.active').removeClass('active');
		activeNav.addClass('active');
		header.css({'background': $('#'+section).css('background')})
		
	}
	stickyNav();
}
var checkWindowTop = function(){
	return $(window).scrollTop();
}
var stickyNav = function() {
	var scrollTop =  $(window).scrollTop();//$(window).scrollTop(); 
	if (scrollTop >= $('nav').offset().top && ! header.hasClass('stick')) {   
	    header.addClass('stick');  
	   
	}else if(scrollTop <  625 ){
		
		header.removeClass('stick');
	}
	
}
var handleScrolling = function () {
	//if(scrolling) return;
	bg.each(function(i, el) {
	    var el = $(el).children();
	   
	    if (el.visible(false)) {
	      el.addClass("come-in"); 
	    }
	});
}
var init = function(){
	$.getJSON('http://localhost/14Personal/scrolling/json/data.json', function(data){
		port = data;
	});

	Modernizr.load({  
	    test: Modernizr.touch,  
	    yep : 'touchscroll.js',  
	});
	about  = $('#about');
  	portfolio = $('#portfolio');
  	faq = $('#faq');
  	contact = $('#contact');
  	bg = $('.bg');
  	galleryItem = $('#gallery li');
  	closeLink = $('.close');
  	navLink = $('nav a');
  	header = $('header');
  	scrollBox = $('#wrapper');
  	var to = [];
  	
 	
	$('.part2').fadeIn('slow').delay(100).fadeOut('slow');
	$('.scroll-signifier').toggleClass('hidden').addClass('come-in');
	$('#sm').toggleClass('hidden').addClass('come-in');
		
 	
 	//resetNavPosition();
  	stickyNav();
  	//bg.each(function(el) {
  		//bg.css({height: getInnerHeight()+'px'});
  	//}); 
  	//setItemGalleryHeight();
  	//scrollBox.css({height: getInnerHeight()+'px'});
  	
}
var test = function() {
	alert('done')
	
}
var resetNavPosition = function() {
	header.css({top: getInnerHeight() - header.height() +'px'})
}
var setItemGalleryHeight = function() {
	if(getInnerHeight() < 500){
		galleryItem.css({height: getInnerHeight() / 3+'px'})
	}
	
}

$(document).ready(function() {

	init();
	console.log()

	navLink.on('click', function (e){
		id = $(e.currentTarget).data('scroll');
		navLink.removeClass('active');
		$(e.currentTarget).addClass('active');
		
		animateTo($('#'+id));

		return false;

	});
	galleryItem.on('mouseenter', function(e) {
		//$('.hoverInfo').fadeIn();
		var img = $(e.target).closest('li').find('img');
		info = $(e.target).closest('li').find('.info');
		info.addClass('hover');
		var hover = $(e.target).closest('li').find('.info.hover');
		TweenLite.to(hover, 1, {top:0, left:0});
		
		
		return false;
	}).on('mouseleave', function (evt) {
		
		info = $(evt.target).closest('li').find('.info');
		info.removeClass('hover');
		
		TweenLite.to(info, 1, { top:300, left:0});
		return false	
	});
	
	galleryItem.on('click', function (e){

		selLi = $(e.target).closest('li');
		//selLi.siblings().removeClass('selected');
		//selLi.addClass('selected');
		animateTo(portfolio);
		var clone = selLi.find('.contain').clone();
		clone.addClass('clone').css({
			top: selLi.position().top,
			left:selLi.position().left,
			width:selLi.width(),
			height:selLi.height()
		});
		$(portfolio).append(clone);

		var selected = $(e.currentTarget).find('.contain').data('name');
		var data = port[selected];

		console.log(data);

		// $('body').html(raco.selectedWork(port[]));
		
		setTimeout(function() {
			$(clone).addClass('full');

			setTimeout(function(){
				$('.clone').find('img').css('opacity', 1);
			}, 10);
		}, 10);
		
		closeLink.show();
		return false;
	});
	closeLink.on('click', function (e) {
		$('.clone').remove();
		// galleryItem.removeClass('selected');
		// $(this).hide();
		// animateTo(portfolio);
		// info = galleryItem.find('.info');
		// selLi.on('mouseleave').on('mouseenter')
		// TweenLite.to(info, 0, { top:300, left:0});
		return false;
	});
	$( "form" ).on( "submit", function( event ) {
		$.ajax({
		  url: "send_form_email.php",
		  context: document.body,
		  success: function (response) {
		  	console.log(response);
		  }
		})
	 	return false;
	});
	$(window).scroll(function() {
		
		if($(window).scrollTop() > $('nav').offset().top || $(window).scrollTop() <  getInnerHeight() - header.height() ){
		
			stickyNav();
			handleScrolling();
			updateNav(getCurrentSection());
			
		}else {
			
			return
		}

	});
	$(window).scrollStopped(function(){
		
		scrolling = false;
		updateNav(getCurrentSection());
	});
	$(window).resize(function(argument) {
		
		setItemGalleryHeight();
	});
	
});