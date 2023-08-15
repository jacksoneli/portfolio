$(function(){
	$('header').each(function(){ //each문을 쓴다는것!!
		var $win = $(window),
				$header = $(this);
		
		//header 복제
		/*
		$header.clone() => header 자신까지도 복제
		$header.contents().clone() => header 자신을 제외산 자손요소들만 복제
		*/
		var $clone = $header.contents().clone(),
				$cloneHTML = $('<div class="clone"></div>'),
				wrapHeight = $header.offset().top + $header.outerHeight();
				//wrapHeight? header의 상단위치 + 헤더아래까지의 길이
				//wrapHeight < scroll (헤더의 아래보다 스크롤이 내려가면)
		
		//복제한 header 스타일 삽입
		$cloneHTML.append($clone);		
		
		//지정한 html 영역에 삽입
		$cloneHTML.appendTo('body'); 
//		$('body').append($cloneHTML); 이렇게 써도 됨. 이렇게 하면 body요소를 객체로 변환했으므로 메모리 낭비가 발생한다. appendTo를 사용하면 바로 삽입할 수 있음.
		
		/*$win.on('scroll',function(){
			var scroll = $win.scrollTop();
					scrollTop = Math.floor(scroll); //정수. 사실 오늘은 이거 안해도 됨
			
			if(wrapHeight < scrollTop){
				 $cloneHTML.addClass('on')
			}else{
				 $cloneHTML.removeClass('on')				 
			}			
		});*/
		
		/*플러그인을 활용해서 만들기*/
		$win.on('scroll', $.throttle(1000/10, function(){ //1초에 10번 실행.
			var scroll = $win.scrollTop();
					scrollTop = Math.floor(scroll); //정수. 사실 오늘은 이거 안해도 됨			
			if(wrapHeight < scrollTop){
				 $cloneHTML.addClass('on')
			}else{
				 $cloneHTML.removeClass('on')				 
			}				
		}));
		
		
				
		//scroll 이벤트 강제 발생
		$win.trigger('scroll');
	});
});