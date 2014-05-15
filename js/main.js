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
	//console.log(currSection.css('background-color')

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
	//bg.each(function(el) {
  		//bg.css({height: getInnerHeight()+'px'});
  	//}); 
}

$(document).ready(function() {

	init();

	navLink.on('click', function (e){
		id = $(e.currentTarget).data('scroll');
		navLink.removeClass('active');
		$(e.currentTarget).addClass('active');
		
		animateTo($('#'+id));

		return false;

	});
	galleryItem.on('mouseenter', function(e) {
		$('.hoverInfo').fadeIn();
		var img = $(e.target).closest('li').find('img');
	});
	galleryItem.on('click', function (e){

		var selLi = $(e.target).closest('li');
		selLi.siblings().removeClass('selected');
		selLi.addClass('selected');
		animateTo(portfolio);
		closeLink.show();
		return false;
	});
	closeLink.on('click', function (e) {
		galleryItem.removeClass('selected');
		$(this).hide();
		animateTo(portfolio);
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
		//console.log('window: '+ $(window).scrollTop() + ' | ' +  (getInnerHeight() - header.height())  + ' | ' +  $('nav').offset().top + ' | ' +  header.offset().top)
		//console.log('scrollBox:  ' + scrollBox.scrollTop() +  ' | ' + (getInnerHeight() - header.height()))
		
		if($(window).scrollTop() > $('nav').offset().top || $(window).scrollTop() <  getInnerHeight() - header.height() ){
		
			//resetNavPosition();
			stickyNav();
			handleScrolling();
			updateNav(getCurrentSection());
			
		}else {
			
			return
		}

	});
	$(window).scrollStopped(function(){
		//stickyNav();
		scrolling = false;
		updateNav(getCurrentSection());
	});
	$(window).resize(function(argument) {
		// body...
		setItemGalleryHeight();
	});
	
});