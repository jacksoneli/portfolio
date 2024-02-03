$(function() {
 var pics = '';
 
 for(var i=0; i<200; i++){
  pics += '<img src="img/v_' + i + '.jpg">'
         // <img src = "img/v_0.jpg">
 }
 
 $('.bg').html(pics);
 
 $('body').on('mousemove',function(e){
  //현재 브라우저의 폭 저장(실시간으로)
  //마우스커서의 위치값 저장(실시간으로)
  //200까지의 백분율 수치 저장
  //해당 백분율 값을 <h3>태그에 출력
  var wid = $(window).width(),
      posX = e.pageX,
      percent = Math.floor((posX/wid)*200);  
  
  //모든 이미지를 숨김처리
  $('.bg').find('img').hide();
  //현재 마우스위치에 해당하는 이미지만 보임처리
  $('.bg').find('img').eq(percent).show();
 });
 
 
 
});