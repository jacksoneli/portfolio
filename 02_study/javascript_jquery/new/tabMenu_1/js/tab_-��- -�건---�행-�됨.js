$(function(){
	$('#tabMenu').each(function(){
		var $gnb = (this).find('#gnb'),
				$menu = $gnb.find('a'),
				$article = $(this).find('article')
		
		//gnb.on('click','a', function(e)를 써도 됨
		$menu.on('click', function(e){
			e.preventDefault();
			
			//클릭된 a 요소만 jQuery요소로 변환(객체화)
			var $this = $(this),
					i = $this.index();
			
			//이미 활성돼 있는 a요소는 아무것도 하지말고 그냥 값을 반환해라 (아무것도 하지 마라)
			if($this.hasClass('on')){
				return
			}

			
			//모든 a에 'on'클래스 숨기고 클릭된 a만 on
			$menu.removeClass('on');
			$this.addClass('on');


			//모든 article을 숨기고, 클릭된 a에 해당하는 article만 보여줌
			$article.hide();
			$($this.attr('href')).fadeIn();
		});	
		
		//첫번째 a요소를 강제로 클릭
		$menu.eq(0).trigger('click');		
	});	
});