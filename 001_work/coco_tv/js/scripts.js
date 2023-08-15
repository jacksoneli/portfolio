/*
 * Coco TV Common Script
 */

 /* jslint			browser : true,		continue : true,
 	devel : true, 	indent : 2,			maxerr : 50,
 	newcap : true,	nomen : true, 		plusplus : true,
	regexp : true,	sloppy : true,		vars : false,
	white : true
 */

var cocotv = (function(){
    var initModule = function ( $container ){
        function showDim(obj){
            $(obj).wrap( "<div class='bgDim'></div>" );
            $(obj).show();
            bodyHoldFn(true);
            $('.bgDim').children().on('click',function(){
                preventClick(event);
            });
            $('.bgDim').on('click',function(){
                $(obj).unwrap();
                $(obj).hide();
                bodyHoldFn(false);
            });
        }
        $('.menu').on('click',function(){
            showDim('.sidebar');
            $('.sidebar').animateCss('slideInRight');
        });
        // Search Script
        $('.search').on('click',function(){
            $('.layer_search').toggle();
            $('.layer_search').animateCss('bounceInDown')
            bodyHoldFn(true);
        });
        $('.search_close').on('click',function(){
            $('.layer_search').animateCss('bounceOutDown',function(){
                $('.layer_search').toggle();
            })
            bodyHoldFn(false);
        });

        $('.btn_pop').on('click',function(event){
            showDim('.layer_pop[data-pop-type="layer"]');
        });
        $('.alert').on('click',function(event){
            showDim('.layer_pop[data-pop-type="alert"]');
        });

        function bodyHoldFn(flag){
            if(flag === true){
                $('body').css('overflow-y','hidden');
            } else {
                $('body').css('overflow-y','auto');
            }
        }
        function preventClick(event){
            event.stopPropagation();
        };
    
        // Event Script
        $('.layer_option').find('.btn_canel').on('click',function(){
            $(this).parent().unwrap();
          
            $('.layer_option').hide();
            bodyHoldFn(false);
        });
        $('.btn_option').on('click',function(){
            showDim('.layer_option');
        });

        animateModule.animateCssExtend();
        
        //프로필 레이어
        $('.open_profile').on('click',function(){
            showDim('.profile_layer');
        });
        
        //프리미엄 시청 레이어 열고 닫기
        $('.open_premium_layer').on('click',function(){
            showDim('.js_premium_layer');
        });
        $('.js_premium_layer').find('.btn_canel').on('click',function(){
            $(this).parent().parent().unwrap();
            $('.js_premium_layer').hide();
            bodyHoldFn(false);
        });
    
        //프리미엄 시청 종료 레이어 열고 닫기
        $('.open_premium_out').on('click',function(){
            showDim('.js_premium_out');
        });
        $('.js_premium_out').find('.btn_canel').on('click',function(){
            $(this).parent().parent().unwrap();
            $('.js_premium_out').hide();
            bodyHoldFn(false);
        });        
        
        //토큰부족 레이어 열고 닫기
        $('.open_token_layer').on('click',function(){
            showDim('.js_token_layer');
        });
        $('.js_token_layer').find('.btn_canel').on('click',function(){
            $(this).parent().parent().unwrap();
            $('.js_token_layer').hide();
            bodyHoldFn(false);
        });        
        
        //풀방시청 레이어 열고 닫기
        $('.open_full_layer').on('click',function(){
            showDim('.js_full_layer');
        });
        $('.js_full_layer').find('.btn_canel').on('click',function(){
            $(this).parent().parent().unwrap();
            $('.js_full_layer').hide();
            bodyHoldFn(false);
        });        
        
        //아이템 레이어 열고 닫기
        $('.open_item_layer').on('click',function(){
            showDim('.js_item_layer');
        });
        $('.js_item_layer').find('.btn_canel').on('click',function(){
            $(this).parent().parent().unwrap();
            $('.js_item_layer').hide();
            bodyHoldFn(false);
        });        
        
        //토큰전환 레이어 열고 닫기
        $('.open_exchange_layer').on('click',function(){
            showDim('.js_exchange_layer');
        });
        $('.js_exchange_layer').find('.btn_canel').on('click',function(){
            $(this).parent().parent().unwrap();
            $('.js_exchange_layer').hide();
            bodyHoldFn(false);
        });     
        
        //토큰 정산 레이어 열고 닫기
        $('.js_open_calculate').on('click',function(){
            showDim('.js_calculate_layer');
        });
        $('.js_calculate_layer').find('.btn_canel').on('click',function(){
            $(this).parent().parent().unwrap();
            $('.js_calculate_layer').hide();
            bodyHoldFn(false);
        });        
        
        //본인인증 레이어 열고 닫기
        $('.open_certify').on('click',function(){
            showDim('.js_certify');
        });
        $('.js_certify').find('.btn_canel').on('click',function(){
            $(this).parent().parent().unwrap();
            $('.js_certify').hide();
            bodyHoldFn(false);
        });        
        
        //상점 레이어 열고 닫기
        $('.open_store').on('click',function(){
            showDim('.js_store');
            $('.js_token_layer').unwrap();
            $('.js_token_layer').hide();
        });
        $('.js_store').find('.btn_canel').on('click',function(){
            $(this).parent().parent().unwrap();
            $('.js_store').hide();
            bodyHoldFn(false);
        });        
        
        //각종 레이어 열고 닫기
        $('.js_open_layer').on('click',function(){
            showDim('.js_layer');
        });
        $('.js_layer').find('.btn_canel').on('click',function(){
            $(this).parent().parent().unwrap();
            $('.js_layer').hide();
            bodyHoldFn(false);
        });        
        
        //각종 레이어 열고 닫기2
        $('.js_open_layer2').on('click',function(){
            showDim('.js_layer2');
        });
        $('.js_layer2').find('.btn_canel').on('click',function(){
            $(this).parent().parent().unwrap();
            $('.js_layer2').hide();
            bodyHoldFn(false);
        });
        
        //시청하기 페이지) 영상통화 버튼 누르면 안내창 띄움
        $('.js_open_call').on('click',function(){
            showDim('.js_call');
        });
        $('.js_call').find('.btn_canel').on('click',function(){
            $(this).parent().parent().unwrap();
            $('.js_call').hide();
            bodyHoldFn(false);
            $('.js_open_call').removeClass('on');
        });
     
        
        

        
        
        
        

        
        
        
    };
 	return { initModule : initModule };
}());

var layerModalModule = (function(){
    var configMap = {

    }
});

var animateModule = (function(){
    var animateCssExtend = function(){
        $.fn.extend({
            animateCss: function(animationName, callback) {
            var animationEnd = (function(el) {
                var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
                };
        
                for (var t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
                }
            })(document.createElement('div'));
        
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
        
                if (typeof callback === 'function') callback();
            });
        
            return this;
            },
        });
    };
 	return { animateCssExtend : animateCssExtend };
}());

$(document).ready(function(){
    /*
    * 탭메뉴 이벤트
    */
    $('.tabs-group li').on('click',function(){
        var currentIdx = $(this).index();  // 현재 탭 인덱스번호
        if(!$(this).hasClass('add')){
            // 탭 초기화
            $('.tabs-group li').removeClass('on');
            $('.tabs-group').siblings('.tab-pannel').hide();

            // 선택 탭 이벤트
            $(this).addClass('on');
            $(this).parent().siblings('.tab-pannel').eq(currentIdx).show();
        }
    });

    $('.selectbox li').on('click',function(){
        selectFn($(this),"on");
    });

    $('.sm-label').on('click',function(){
        $('.sm-list').toggle();
    });
    $('.sm-list li').on('click',function(){
        selectFn($(this),"on");
    });
    
    //사이드바 하위메뉴 펼치기
    $('.sidebar .more_depth').on('click',function(){
        $(this).toggleClass('on');
        $(this).parent().find('.depth2').slideToggle();
    });
    
    //프로필 레이어 내 follow 버튼 토글
    $('.profile_layer .follow').on('click',function(){
        $(this).hide();
        $('.profile_layer .unfollow').show();
    });
    $('.profile_layer .unfollow').on('click',function(){
        $(this).hide();
        $('.profile_layer .follow').show();
    });
    
    //follow 페이지 내 follow 버튼 토글
    $('.bj_list .right_area1 .follow').on('click',function(){
        $(this).hide();
        $(this).parent().find('.unfollow').show();
    });
    $('.bj_list .right_area1 .unfollow').on('click',function(){
        $(this).hide();
        $(this).parent().find('.follow').show();
    });

    //푸시 알람 토글
    $('.push_alarm').on('click',function(){
        $(this).toggleClass('active');
    });
    
	//스크롤시 헤더 고정
    $('.header').each(function(){
		var $win = $(window),
				$header = $(this),
				headerOffsetTop = $header.offset().top;
		
		$win.on('scroll', function(){
			var scrollTop = $win.scrollTop();
			if(headerOffsetTop < scrollTop){
				$header.addClass('active')
                $('.header_back').css('height','50px')//header가 fixed돼서 화면이 갑자기 움직이므로 헤더 뒤에 공간을 생기게 함.
			}else{
				$header.removeClass('active')
                $('.header_back').css('height','0')
			};			
		});	
    });	 
    
    //아이템(입장권 등) 클릭시 토글
    $('.js_ticket').on('click',function(){
        $(this).toggleClass('active');
    });
    
    //클릭시 토글
    $('.js_toggle').on('click',function(){
        $(this).toggleClass('active');
    });
    
    //받은 토큰 - 정산내역의 테이블 클릭시 해당 줄 bg변경
    $(".js_tr_bg_toggle tr").click(function(){
        $(".js_tr_bg_toggle tr").removeClass('yellow_bg');
        if($(this).hasClass('yellow_bg')){
            $(this).removeClass('yellow_bg');
        }else{
            $(this).addClass('yellow_bg');
        }
        return false;
    });    
    
    //라디오 버튼(css도 있음)
    $('.radio_area li').on('click',function(){
        $(".radio_area li").removeClass('on');
        if($(this).hasClass('on')){
            $(this).removeClass('on');
        }else{
            $(this).addClass('on');
        }
        return false;
    });
    
    //라디오 기능(css 없음)
    $('.js_raido_on li').on('click',function(){
        $(".js_raido_on li").removeClass('on');
        if($(this).hasClass('on')){
            $(this).removeClass('on');
        }else{
            $(this).addClass('on');
        }
        return false;
    });
    
    //라디오 기능2(css 없음)
    $('.js_raido_on2 li').on('click',function(){
        $(".js_raido_on2 li").removeClass('on');
        if($(this).hasClass('on')){
            $(this).removeClass('on');
        }else{
            $(this).addClass('on');
        }
        return false;
    });
    
    //체크박스
    $('.chk_box').on('click',function(){
        $(this).toggleClass('on');
    });
    
    //체크박스 기능(css 없음)
    $('.js_chk_box').on('click',function(){
        $(this).toggleClass('on');
    });
    
    //클릭시 on toggle (css 없음)
    $('.js_on').on('click',function(){
        $(this).toggleClass('on');
    });
    
	//충전하기 페이지 스크롤시 상단 고정레이어에 보더 생기게
    $('.fix_wrap').each(function(){
		var $win = $(window),
				$header = $(this),
				headerOffsetTop = $header.offset().top;
		
		$win.on('scroll', function(){
			var scrollTop = $win.scrollTop();
			if(headerOffsetTop < scrollTop){
				$('.fix_wrap2 article').addClass('border')
			}else{
				$('.fix_wrap2 article').removeClass('border')
			};			
		});	
    });	     
    
    //리스트 토글(피드백 리스트)
    $('.toggle_list').click(function(){
        if(!$(this).hasClass('on')) {
            $('.toggle_list').removeClass('on');
            $(this).addClass('on');
            $('.cont_line').slideUp();
            $(this).next().slideDown();
        } else {
            $(this).removeClass('on');
            $(this).next().slideUp();
        }	
    });

    //방송하기 카메라버튼 드롭메뉴
    $('.js_toggle_drop').on('click',function(){
        $('.js_drop_nav').slideToggle(20);
    });
    $('.js_toggle_drop_h').on('click',function(){
        $(".js_drop_nav_h .bc_nav2").animate({width:'toggle'},20);
    });
    
    //채팅 영역 전구 버튼 클릭시 채팅창 활성화
    $('.js_chat_on').on('click',function(){
        $(this).parent().parent().find('.mid textarea').toggleClass('on');
    });
    
    //방송하기 페이지 공유하기 레이어 열고 닫기 
    $('.js_open_share').on('click',function(){
        $('.js_bc_share').toggle();
    });
    $('.js_bc_share .js_close').on('click',function(){
        $('.js_bc_share').hide();
        $('.js_open_share').removeClass('on');
    });
    
    //방송하기 페이지) 채팅버튼 누르면 채팅영역 생성되고 화면 누르면 없어짐
    $('.js_open_chat').on('click',function(){
        $('.chat_write').toggle();
        $('.chat_wrap').toggleClass('with_key');
        
    });
    $('.bc_bg').on('click',function(){
        $('.chat_write').hide();
        $('.chat_wrap').removeClass('with_key');
        $('.js_open_chat').removeClass('on');
    });
    
    //방송하기 페이지) 시청자버튼 누르면 시청자목록 영역 생성되고 화면 누르면 없어짐
    $('.js_open_viewer').on('click',function(){
        $('.js_bc_viewer').toggle();
        $('.chat_wrap').toggle();
    });
    $('.bc_bg').on('click',function(){
        $('.js_bc_viewer').hide();
        $('.chat_wrap').show();
        $('.js_open_viewer').removeClass('on');
    });
    
    //방송하기 페이지) 시청자목록에서 시청자 클릭시 해당 시청자 활성, 시청자 컨트롤 레이어 열기
    $('.viewer_tbl .name, .viewer_tbl .combo').on('click',function(){
		if(!$(this).parent().hasClass('on')) {
			$('.viewer_tbl tr').removeClass('on');
			$(this).parent().addClass('on');
            $('.bc_viewer_control').show();
		} else {
			$(this).parent().removeClass('on');
            $('.bc_viewer_control').hide();
		}        
    });
    $('.bc_bg').on('click',function(){
        $('.bc_viewer_control').hide();
    });
       
    //방송하기 페이지) 교재 누르면 교재 영역 생성되고 화면 누르면 없어짐
    $('.js_open_book').on('click',function(){
        $('.js_book').toggle();
        $('.chat_wrap').toggle();
    });
    $('.bc_bg').on('click',function(){
        $('.js_book').hide();
        $('.chat_wrap').show();
        $('.js_open_book').removeClass('on');
    });
    
    //방송하기 페이지) 교재리스트 토글
    $('.js_open_booklist').on('click',function(){
        $('.js_booklist').show();
        $('.js_book').hide();
    });
    $('.js_close_booklist').on('click',function(){
        $('.js_book').show();
        $('.js_booklist').hide();
    });
    $('.bc_bg').on('click',function(){
        $('.js_booklist').hide();
        $('.chat_wrap').show();
        $('.js_open_book').removeClass('on');
    });
    
    //방송하기 페이지) 교재리스트 활성화, 삭제
    $('.book_list li').on('click',function(){
        $(this).toggleClass('on');
        $(this).find('.chk_box_white').toggleClass('on');
    });
    $('.book_list .right .del').on('click',function(){
        $(this).parent().parent().hide();
    });
    
    //클릭시 사라지는 기능
    $('.js_click_hide').on('click',function(){
        $(this).hide();
    });
    
    //시청하기 페이지) 레이어 닫을 때 해당 버튼 비활성화 
    $('.btn_canel').on('click',function(){
        $('.js_open_layer, .js_open_layer2').removeClass('on');
    });
    
    //시청하기 페이지) 교재레이어 리사이즈 버튼 클릭시 사이즈 토글 
    $('.js_book_resize').click(function() {
        $('.js_book').toggleClass('on');
    });
    
    //시청하기 페이지) 팬버튼 누르면 팬영역 생성되고 화면 누르면 없어짐
    $('.js_open_fan').on('click',function(){
        $('.js_fan').toggle();
        $('.chat_wrap').toggle();
    });
    $('.bc_bg').on('click',function(){
        $('.js_fan').hide();
        $('.chat_wrap').show();
        $('.js_open_fan').removeClass('on');
    });    
    
    //탭기능(css 없음)
    $(".js_tab > li").bind('click',function(e){
        e.preventDefault();
        var index = jQuery(this).closest('li').index();
        jQuery(".cont").hide().eq(index).show();
        jQuery('.js_tab > li').removeClass('on');
        jQuery(this).addClass('on');
    });    
    
    //탭기능2(css 없음)
    $(".js_tab2 > li").bind('click',function(e){
        e.preventDefault();
        var index = jQuery(this).closest('li').index();
        jQuery(".js_cont").hide().eq(index).show();
        jQuery('.js_tab2 > li').removeClass('on');
        jQuery(this).addClass('on');
    });    
    
    //시청하기 페이지) 후원버튼 누르면 후원영역 생성되고 화면 누르면 없어짐
    $('.js_open_give').on('click',function(){
        $('.js_give').toggle();
        $('.chat_wrap').toggle();
        $('.give_layer').show();
    });
    $('.bc_bg').on('click',function(){
        $('.js_give').hide();
        $('.chat_wrap').show();
        $('.js_open_give').removeClass('on');
        $('.sticker_wrap').hide();
        $('.give_layer').hide();
    });       
        
    //시청하기 페이지) 후원하기 토큰 선택
	$('.js_toggle_raido li').click(function(){
		if(!$(this).hasClass('on')) {
			$('.js_toggle_raido li').removeClass('on');
			$(this).addClass('on');
            $('.sticker_wrap').show();
		} else {
			$(this).removeClass('on');
            $('.sticker_wrap').hide();
		}	
	});        
    
    //시청하기 페이지) 후원하기 콤보 선택
	$('.js_toggle_raido2 li').click(function(){
		if(!$(this).hasClass('on')) {
			$('.js_toggle_raido2 li').removeClass('on');
			$(this).addClass('on');
            $('.send_combo').show();
		} else {
			$(this).removeClass('on');
            $('.send_combo').hide();
		}	
	});        
    
    //시청하기 페이지) 콤보send 버튼 누르면 콤보쏘기 비주얼 나옴
    $('.js_open_combo').on('click',function(){
        $('.combo_visual').show();
    });

    //VOD시청 페이지) 좋아요버튼 누르면 나오는 효과
    $('.js_open_like').click(function(){
        if($('.js_open_like').hasClass('on')){
           $(".like_layer").show().delay(3000).fadeOut();
        };
    });    
    
    
    
    
});

function selectFn(obj,active){
    obj.parent().find('li').removeClass(active);
    obj.addClass(active);
}