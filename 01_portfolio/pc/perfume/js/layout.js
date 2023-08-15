$(function(){
	var $btn = $('.btn'),
			$nav = $('nav'),
			$li = $nav.find('#gnb li'),
			$section = $('section'),
			$div = $section.find('div');	

	$btn.on('click',function(){
		$(this).fadeOut(400);
		$nav.addClass('on');	
		$section.addClass('on');			
	});
	
	$li.on('click',function(){
		var i =$(this).index();
		$li.removeClass('on');
		$li.eq(i).addClass('on');		
		
		$btn.fadeIn();
		$nav.removeClass('on');
		$section.removeClass('on');
		
		$div.removeClass('on');		
		$div.eq(i).addClass('on');	
	});

	$section.on('click',function(){
		$btn.fadeIn();
		$nav.removeClass('on');
		$section.removeClass('on');
	});	
	
});