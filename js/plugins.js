// Avoid `console` errors in browsers that lack a console.
// (function() {
//     var method;
//     var noop = function () {};
//     var methods = [
//         'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
//         'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
//         'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
//         'timeStamp', 'trace', 'warn'
//     ];
//     var length = methods.length;
//     var console = (window.console = window.console || {});

//     while (length--) {
//         method = methods[length];

//         // Only stub undefined methods.
//         if (!console[method]) {
//             console[method] = noop;
//         }
//     }
// }());
$.fn.scrollStopped = function(callback) {           
        $(this).scroll(function(){
            var self = this, $this = $(self);
            if ($this.data('scrollTimeout')) {
              clearTimeout($this.data('scrollTimeout'));
            }
            $this.data('scrollTimeout', setTimeout(callback,250,self));
        });
};
// Place any jQuery/helper plugins in here.
// $.fn.visible = function(partial) {
    
//       var $t            = $(this),
//           $w            = $(window),
//           viewTop       = $w.scrollTop(),
//           viewBottom    = viewTop + $w.height(),
//           _top          = $t.offset().top,
//           _bottom       = _top + $t.height(),
//           compareTop    = partial === true ? _bottom : _top,
//           compareBottom = partial === true ? _top : _bottom;
//     // console.log((compareBottom <= viewBottom) && (compareTop >= viewTop) + partial)
//     return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
// };
$.fn.visible = function(partial) {
    
      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.innerHeight()/2,
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;
    // console.log((compareBottom <= viewBottom) && (compareTop >= viewTop) + partial)
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
};
$.fn.jslide = function(opts){
  //console.log(arguments)

    if(typeof opts === 'string'){
      
      return this.data('jslide_api')[arguments[0]](arguments[1])
    }
    opts = $.extend({
      direction: "horizontal",
      duration: 600,
      easing: "swing",
      loop: false,
      pagination: true,
      paginationClass : 'pagination',
      generatePagination: true,
      start: 1, 
      currentClass: 'current'
    }, opts);
    
    return this.each(function(){
      opts.direction = opts.direction.toLowerCase();
    
      var carousel = $(this),
        slider = carousel.children('ul'),
        items = slider.children('li'),
        totalItems = items.size(),
        itemW = items.outerWidth(true),
        itemH = items.outerHeight(true),
        carouselW = carousel.width(),
        carouselH = carousel.height(),
        sliderW =(opts.direction === 'horizontal' ? itemW * items.length : itemW), 
        sliderH =(opts.direction === 'horizontal' ? itemH : itemH * items.length),
        page = 0,
        nextbtn = $(opts.next),
        backbtn = $(opts.back),
        itemsPerView = (opts.direction === 'horizontal' ? Math.floor(carouselW / itemW) : Math.floor(carouselH / itemH) ),
        sliderMax = items.length - itemsPerView,
        sliderTimer,
        clicked,
        active,
        current = 0,
        next = 0,
        number = 0,
        start = opts.start - 1

      ;
      carousel.css({
        overflow: 'hidden',
        position: (carousel.css('position') === 'static' ? 'relative' : carousel.css('position'))
        
      });
      slider.css({
        listStyle: 'none',
        margin: 0,
        padding: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        width: sliderW,
        height: sliderH
      }); 
      items.css({"float" : "left"});
      
      if(opts.loop === false){
        backbtn.css({visibility:'hidden'});
      };
      if(totalItems <= 1){
        backbtn.css({visibility: "hidden"});
        nextbtn.css({visibility: "hidden"});
      
      };
      
      if(opts.pagination == true){
        
        $('.'+ opts.paginationClass +' li.' + opts.currentClass).removeClass(opts.currentClass);
        $('.' + opts.paginationClass + ' li:eq('+ next +')', carousel).addClass(opts.currentClass);
      }
      //GENERATES PAGINATION
      if (opts.generatePagination) {
        
        
        carousel.append('<ul class='+ opts.paginationClass +'></ul>');
        //FOR EACH SLIDE CREATE A LI AND LINK
        items.each(function(){

            $('.' + opts.paginationClass, carousel).append('<li><a href="'+ number +'">'+ (number + 1)+'</a></li>');
            number++;
            if(totalItems ===1){
              $('.'+opts.paginationClass).css('visibility', 'hidden')
            }
        });
        
      } else {
        
        $('.' + opts.paginationClass + ' li a', carousel).each(function(){
          $(this).attr('href',  number );
          number++;
        });
      }
      
      // ADDS CURRENT CLASS TO THE FIRST SLIDE
      $('.' + opts.paginationClass + ' li:eq('+ page +')', carousel).addClass(opts.currentClass);

      //PAGINATION CLICK HANDLER
      $('.' + opts.paginationClass + ' li a', carousel ).on('click', function(e){
        e.preventDefault();
        
        clicked = $(this).attr('href');

        if (current != clicked) {

          next = parseInt(clicked,10);
          current = next+1;
          prev = $('.' + opts.paginationClass + ' li.'+ opts.currentClass +' a', carousel).attr('href');  
          current = next;
          goToSlide(current);

          $('.' + opts.paginationClass + ' li:eq('+ prev +')', carousel).removeClass(opts.currentClass);
          $('.' + opts.paginationClass + ' li:eq('+ next +')', carousel).addClass(opts.currentClass);

        }
      });
      //ANIMATION
      var anim = function(){
        active = true;
        if(opts.direction === 'horizontal'){
          slider.stop(true).animate({
            left: -(page * itemW)
          }, opts.duration, opts.easing);
        }else{
          slider.stop(true).animate({
            top: -(page * itemH)
          }, opts.duration, opts.easing);
        };
      };
      //EVENTS BACK AND NEXT FUNCTIONS
      var nextfn = function(e){
        
      $('.'+ opts.paginationClass +' li.' + opts.currentClass).removeClass(opts.currentClass);
      backbtn.css({visibility:'visible'})

        if(page === sliderMax ){
          
          if(opts.loop === true){
            page = 0; 
          };
        
        }else{
          page++;
        };
        
        if( (page === sliderMax ) && opts.loop === false){
          nextbtn.css({visibility:'hidden'});
        };
        anim();
        $('.' + opts.paginationClass + ' li:eq('+ page +')', carousel).addClass(opts.currentClass);

        if(e && e.preventDefault){
        
          e.preventDefault();
        }
      };
      //BACK FUNCTION SLIDER
      var backfn = function(e){
        
        // if( TouchEvent && page === 0){
        //  page = totalItems ;
  
        // }
        nextbtn.css({visibility:'visible'})
        if(page <= 0){
          
          if(opts.loop === true){
            page = (sliderMax -1);
          };
        }else{
          page--; 
        };
        
        $('.'+ opts.paginationClass +' li.' + opts.currentClass).removeClass(opts.currentClass);
        $('.' + opts.paginationClass + ' li:eq('+ page +')', carousel).addClass(opts.currentClass);

        if(page === 0 && opts.loop === false){
          backbtn.css({visibility:'hidden'})
        
        };
        anim();
        if(e && e.preventDefault){
        
          e.preventDefault();
        }
        current = next;

      };
      
      if( Modernizr.touch ){
        
        items.swipe({
            
            swipeLeft: function(event, direction, distance, duration, fingerCount) {
                          
               if( page !== (totalItems-1)){
                nextfn(event);
             };
            },
            swipeRight: function(event, direction, distance, duration, fingerCount) {
              
              backfn(event);
            
            },
            threshold: 0,
            triggerOnTouchEnd:false
            
        });           
        
      }else{
        
        backbtn.on('click', backfn);
        nextbtn.on('click', nextfn);
        nextbtn.on('mousedown', function(e){
          clearInterval(sliderTimer);
          if(ss){ss.pause()}
          sliderTimer = setInterval(nextfn, opts.duration/2)
      
          return false
        });
        backbtn.on('mousedown', function(e){
          
          clearInterval(sliderTimer);
          if(ss){ss.pause()}
          sliderTimer = setInterval(backfn, opts.duration/2)
        
          e.preventDefault();
        });
        nextbtn.add(backbtn).add(window).on('mouseup', function(){
          clearInterval(sliderTimer)
        })

      }
      // GO TO SLIDE
      var goToSlide = function(n){
        
        if(n > page){
          page = n -1;
          nextfn();
        
        }else if(n < page){
        
          page = n + 1;
          backfn();
        }

      }

      //SLIDESHOW API ====================================================================================================
      
      if(opts.slideshow){
        var ss ={
          opts: opts.slideshow
        };
        //supposed to move jslide forward or backwards
        ss.play = function(){
          ss.interval = setInterval(function(){  
            ss.time += ss.delay;
            if(ss.opts.direction === 'next'){ 
              nextfn();
            }else{
              backfn();
            };
            if(ss.time >= ss.opts.duration && ss.opts.duration !== 0){
              ss.stop();
            };
          }, ss.delay);
        };
        ss.start = function(){
          ss.stop();
          ss.delay = ss.opts.delay + opts.duration;
          ss.play();
        };
        ss.pause = function(){
          clearInterval(ss.interval);

        };
        ss.stop = function(){
        //takes time and reset it
          ss.time = 0; 
        // cancel interval from continuing to run
          clearInterval(ss.interval); 
          delete ss.interval; 
        };
        ss.start();
      };
      //PUBLIC API  ====================================================================================================
      var api = {};
      
      if(opts.slideshow){
        api.play = ss.play;
        api.stop = ss.stop;
        api.pause = ss.pause;
        api.start = ss.start;
      };
      api.next = nextfn;
      api.back = backfn;
  
      api.go = function(n){
        if(n > page){
          page = n -1;
          nextfn();
        
        }else if(n < page){
        
          page = n + 1;
          backfn();
        }
      };
      api.get = function(){
        return{
          page:page,
          max: 5
        };
      };
      carousel.data('jslide_api', api);

    
    });
  };