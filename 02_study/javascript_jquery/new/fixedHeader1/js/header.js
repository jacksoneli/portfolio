$(function(){
	/*고정 header*/
	$('header').each(function(){ //스크롤 할때마다 일어나야 하므로
		var $win = $(window),
				$header = $(this),
				//header의 기본위치 저장
				headerOffsetTop = $header.offset().top;
		
		$win.on('scroll', function(){
			//윈도우 스크롤양을 확인
			var scrollTop = $win.scrollTop(),
					$section = $('section'); //section을 $객체화함
					
					//스크롤된 값을 정수로 처리(브라우저를 확대한 경우 px값이 소수점으로도 나오게 되므로)
			var scroll = Math.floor(scrollTop),
					offset = Math.floor(headerOffsetTop);			
			
			//section에 txt 출력하기
			$section.find('.scrollTop span').text(scroll);
			$section.find('.offset span').text(offset);
			
			//(조건문)헤더기본위치 < 스크롤양 ==> class 변경
			//기본위치로 돌아오면 ==> class 변경
						
			if(offset < scroll){
				$header.addClass('on')
			}else{
				$header.removeClass('on')
			};			
			
		});	
		
		$header
			.on('mouseenter',function(){
			$(this).stop().animate({
				backgroundColor: 'rgba(0,170,255,1)'
			},100);
		})
			.on('mouseleave',function(){
			$(this).stop().animate({	
				backgroundColor: 'rgba(0,170,255,0.9)'
			},100);			
		});
		//-> 이렇게 하면 마우스 mouseleave후에 원래 색깔로 안돌아옴. 수정된 것이 선생님 버전에 있음. (js와 css에 내용추가)
		
		$win.trigger('scroll'); //맨 처음에 이벤트를 강제로 발생시킴
				
	});	
	
});
