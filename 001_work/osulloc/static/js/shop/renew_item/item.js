// @file shop/item.js

require(['ui', 'slick', 'SmoothScroll'], function(a, b, c) {
	'use strict';

	require(['utils/quantity'], function(qnt) {
		qnt.init();
	});

	require(['modal'], function() {
		$.modal.defaults = IG.modal_defaults;
	});

	var winW;

	var $btnTabBox,
    $btnTab,
    $firstCont,
    $firstContTop,
    $secontContTopWeb,
    $lastContTopWeb,
    $btnTabH,
    $topContTab,
    $halfHtml,
		$RESIZE = 0;
		
		

	$(window).load(function() {
		$secontContTopWeb = $('.tab_content').eq(1).position().top;

		$lastContTopWeb = $('.tab_content').eq($('.tab_content').length-1).position().top;
	
		$RESIZE = 0;
	
	});
	
	$(function() {

		require(['utils/zoomImage']);

		// 콘텐츠 탭 처리
		$('#purchasing-info-tabs').simpleTab({
			rwd: true,
			scroll: false,
			// scrollOffset: -80,
			changeByClass: true
		});

		TweenMax.fromTo( $('.teahouse-aside, .teahouse-dessert li'), 0.8, {
			autoAlpha: 0,
			y: '5%',
			delay: 0.8
		},{
			autoAlpha: 1,
			y: '0%'
		});

		// recommend list (함께 하면 좋은 상품)
		$('.withprod_list .listbox').slick({
			dots: false,
			arrows: true,
			infinite: true,
			speed: 200,
			draggable: false,
			slidesToShow: 4,
			slidesToScroll: 4,
			responsive: [
				{
				  breakpoint: 1024,
				  settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				  }
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				}
			]
		});

		
		$('.product_newdetail .product_close').click(function() {
			if ($(this).hasClass('closed')) {
				$('.product_newdetail .product_closecont').show();
				$(this).removeClass('closed');
				$(this).find('.close_txt').html('제품상세 접어보기<span></span>');
			} else {
				$('.product_newdetail .product_closecont').hide();
				$(this).addClass('closed');
				$('html').scrollTop($(this).position().top - $('.prod_tabarea').height());
				$(this).find('.close_txt').html('제품상세 펼쳐보기<span></span>');
			}
		});

		require(['utils/rating'], function(rating){
			rating.init();
		});

		// recommend product list select
		var $rc_all = $('#rc-all'),
				$rc_checks = $('#rc-list').find('input');

		$rc_all.data('state', 0).on('click', function() {
			if ( !$rc_all.data('state') ) {
				$rc_checks.prop('checked', true).attr('checked', true);
				$rc_all.data('state', 1);
				$rc_all.text('선택해제');
			} else {
				$rc_checks.prop('checked', false).attr('checked', false);
				$rc_all.data('state', 0);
				$rc_all.text('전체선택');
			}
		});

		var cartLayer = {
			isOpen: false,
			$btn: $('#call-cart-layer'),
			$layer: $('#cart-layer'),
			$close: $('#cart-layer').find('.close-layer'),
			init: function() {
				var _this = this;

				_this.$btn.on('click', function(event){
					if ( _this.isOpen ) {
						_this.close();
					} else {
						_this.open();
					}
					event.preventDefault();
				});

				_this.$close.on('click', function() {
					_this.close();
				});

				_this.close();
			},
			open: function() {
				var _this = this;

				IG.$go_top.hide();
				_this.$btn.addClass('toggle-on');
				_this.$layer.delay(200).slideDown(300);
				_this.isOpen = true;
			},
			close: function() {
				var _this = this;

				IG.$go_top.show();
				_this.$layer.slideUp(300, function() {
					_this.$btn.removeClass('toggle-on');
				});
				_this.isOpen = false;
			}
		}

		cartLayer.init();

		
		$btnTabBox = $('.prod_tabarea').find('li');
		$btnTab = $('.prod_tabarea').find('li').find('a');
		$firstCont = $('.tab_content').eq(0);
		$firstContTop = $('.tab_content').eq(0).position().top;
		$btnTabH = $('.prod_tabarea').height();
		$topContTab = parseInt($('.prod_tabarea').css('top'));
		$halfHtml = $('html').height()*0.2;

		setTabFunc('load');

		$('.prod_tabarea').find('li').find('a').click(function() {
			console.log('A');

			clickTabBtn($(this));
		});

		$('.bottom_review').click(function() {
			clickTabBtn($(this), 2);
		});
		
		slideProdInfo();
	});
	$(window).resize(function() {
		slideProdInfo();
	});

	
	function slideProdInfo() {
		var prod_slide_box = $('.prod_slide_box'),
			device = prod_slide_box.css('z-index');
		if (device == 1){
			if (!prod_slide_box.hasClass('slick-initialized')) {    
				prod_slide_box.slick({
					dots: true,
					infinite: true,
					speed: 500,
					slidesToShow: 1,
					autoplay: true,
					autoplaySpeed: 4000,
					pauseOnHover:true,
					draggable: false,
					customPaging: function(slick, index) {
					   return  '<a href="javascript:void(0)" data-role="none" data-slick-index="' + index + '"><span><strong>0' +
									( index + 1) +
								'</strong>&emsp;'+$(slick.$slides[index]).data('label')+'</span></a>';
					},
				});
				prod_slide_box.find('.slick-dots').wrap('<div class="slick-pager" />')
			}
		} else {
			if (prod_slide_box.hasClass('slick-initialized')) {
				prod_slide_box.slick('unslick');
				prod_slide_box.find('.slick-pager').remove();
			}
		}
	}

	/*scroll*/
	$(window).off('scroll').on('scroll',function(){
		//스크롤 멈춤 감지
		$.fn.scrollStopped = function(callback) {
			var that = this, $this = $(that);
			$this.scroll(function(ev) {
				clearTimeout($this.data('scrollTimeout'));
				$this.data('scrollTimeout', setTimeout(callback.bind(that), 100, ev));
			});
		};
			
		//스크롤 멈춘 후 동작
		$(window).scrollStopped(function(){

			$firstCont = $('.tab_content').eq(0);
			$firstContTop = $('.tab_content').eq(0).position().top;
			$btnTabH = $('.prod_tabarea').height();
			$topContTab = parseInt($('.prod_tabarea').css('top'));
			$halfHtml = $('html').height()*0.2;

			setTabFunc('scroll');

		});
	});

	// 리사이즈 이벤트 후처리
	$(window).resize(function () {
		
		$firstCont = $('.tab_content').eq(0);
		$firstContTop = $('.tab_content').eq(0).position().top;
		$btnTabH = $('.prod_tabarea').height();
		$ptCont = parseInt($('.product_newdetail').css('padding-top'));
		$topContTab = parseInt($('.prod_tabarea').css('top'));
		$halfHtml = $('html').height()*0.2;

	});

	// 후처리 코드 넣을 곳
	$(window).on('resizeEnd', function () {

		
		$firstCont = $('.tab_content').eq(0);
		$firstContTop = $('.tab_content').eq(0).position().top;
		$btnTabH = $('.prod_tabarea').height();
		$topContTab = parseInt($('.prod_tabarea').css('top'));
		$halfHtml = $('html').height()*0.2;

		var $tabAct,$currentCont;
		for (var i=0; i < $('.prod_tabarea').find('li').length; i++) {
			if ($('.prod_tabarea').find('li').eq(i).find('a').hasClass('active')) {
				$tabAct = i;
			}
		}

		if ($tabAct != 0 && $tabAct == 1) {
			$currentCont = $secondContTopWeb
		} else {
			$currentCont = $lastContTopWeb;
		}
		

		$('html').stop().delay(150).animate({ scrollTop: $currentCont+'px' }, 500, function() {
			setTabFunc('load');
		});
		
		scrollTabActive();

		$('.prod_tabarea').find('li').find('a').click(function() {
			clickTabBtn($(this))
		});

	});

	function setTabFunc(target) {
		switch(target) {
			case 'load':
				//기존 이벤트 삭제
				$('html').clearQueue();
				$('html').off();
				
				//모바일에서 숨긴 컨텐츠 보이기
				$('.tab_content').show();
				scrollTabActive();
			break;

			case 'scroll':
				scrollTabActive();

			break;
		}
		
	}
	function scrollTabActive() {
		//html 스크롤 위치가 TAB 보다 작을 경우 : 원래위치 유지
		if ($('html').scrollTop() < $firstContTop) {
			$('.prod_tabarea').css({
				'position': 'relative',
				'top' : 'auto',
				'width' : '100%',
				'left' : '0',
				'z-index': '20'
			});
			$($firstCont).css({
				'padding-top' : '0'
			});
		} else { //html 스크롤 위치가 TAB 보다 클 경우 : 위치 상단에 고정
			$('.prod_tabarea').css({
				'position': 'fixed',
				'top' : $('#header').height() - 2,
				'width' : '100%',
				'left' : '0',
				'z-index': '20'
			});
			$($firstCont).css({
				'padding-top' : $btnTabH
			});

			setTabActive('scrolled');
		}
	}
	function clickTabBtn(i, j) {
		
		var $this = i;

		if (j != null) {
			var $idx = 1,
				$targetIdx = $('.tab_content').eq($idx).offset().top - ($btnTabH + $('#header').height());

			$('html').stop().animate({ scrollTop: $targetIdx+'px' }, 500);

			$('.prod_tabarea').find('li').find('a').removeClass('active');
			$('.prod_tabarea').find('li').find('a').eq(2).addClass('active');
			

		} else {
			var $idx = $this.parent().index(),
				$targetIdx = $('.tab_content').eq($idx).offset().top - ($btnTabH + $('#header').height());

			$('html').stop().animate({ scrollTop: $targetIdx+'px' }, 500);

			setTabActive($idx);

			$('.prod_tabarea').find('li').find('a').removeClass('active');
			$('.prod_tabarea').find('li').find('a').eq($idx).addClass('active');

			if ($idx == 0) {
				$('.prod_tabarea').find('li').find('a').removeClass('active');
				$this.addClass('active');
			}
		}

	}

	function setTabActive(idx)  {
		var $cont1 = $('.tab_content').eq('0').offset().top - ($btnTabH + $('#header').height() + 100),
		$cont2 = $('.tab_content').eq('1').offset().top - ($btnTabH + $('#header').height() + 100),
		$cont3 = $('.tab_content').eq('2').offset().top - ($btnTabH + $('#header').height() + 100);

		if ($('html').scrollTop() > $cont3) {
				idx = 2;
		} else if ($('html').scrollTop() > $cont2) {
				idx = 1;
		} else if ($('html').scrollTop() > $cont1) {
				idx = 0;
		} else {
		}
		var $idx = $('.prod_tabarea').find('li').eq(idx).find('a');
				
		$('.prod_tabarea').find('li').find('a').removeClass('active');
		$idx.addClass('active');
			
	}

});
