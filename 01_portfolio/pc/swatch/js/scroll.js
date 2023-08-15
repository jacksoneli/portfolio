$(function(){
 /*사용자 브라우저의 높이 = section 의 높이*/
 var winHeight = $(window).height();
 $('section').height(winHeight);
 
 /*브라우저의 크기가 변할 때 마다 section 높이값 갱신*/
 $(window).on('resize', function(){
  var winHeight = $(window).height();
  $('section').height(winHeight);
 });
 
 /*메뉴 클릭 시 해당 section 으로 이동*/
 $('#gnb').on('click','li',function(e){
  e.preventDefault();
  var winHeight = $(window).height(),
      i = $(this).index(),
      newTop = winHeight * i;
  $('html, body').stop().animate({
   scrollTop : newTop
  },1500, 'easeOutBounce');
 });
  
 /*위로, 아래로 스크롤 하면 각각 
 이전, 다음 section으로 이동 시키기(플러그인활용)*/
 $('section').on('mousewheel',function(e,delta){
  //위로 스크롤 하면 실행
  if(delta > 0) {
   var before = $(this).prev().offset().top;
   
   $('html, body').stop().animate({
    scrollTop : before
   },1500,'easeOutBounce');
   
  }else if(delta < 0){
  //아래로 스크롤 하면 실행
   var after = $(this).next().offset().top;
   
   $('html, body').stop().animate({
    scrollTop : after
   },1500, 'easeOutBounce');
  }
 });
  
 /*스크롤 된 거리에 해당하는 메뉴 활성화 시키기*/
  
 $(window).on('scroll', function(){
  var wt = $(window).height(),
      scroll = $(window).scrollTop()+wt/2;
  
  /*1번째 방법 조건문(if)
   설명예)
   브라우저의 높이값이 1000 인 경우에는
   0 ~ 999
   1000 ~ 1999
   2000 ~ 2999
   3000 ~ 3999
  */
  /*
  if(scroll >= wt * 0 && scroll < wt * 1) {
    $('#gnb li').removeClass('on');
    $('#gnb li').eq(0).addClass('on');
  }
  if(scroll >= wt * 1 && scroll < wt * 2) {
    $('#gnb li').removeClass('on');
    $('#gnb li').eq(1).addClass('on');
  }
  if(scroll >= wt * 2 && scroll < wt * 3) {
    $('#gnb li').removeClass('on');
    $('#gnb li').eq(2).addClass('on');
  }
  if(scroll >= wt * 3 && scroll < wt * 4) {
    $('#gnb li').removeClass('on');
    $('#gnb li').eq(3).addClass('on');
  }
  */
  
  /*
  2번째 방법 반복문(for)
  for(변수의 초기값; 조건; 증가식) {조건 만큼 반복실행됨}*/
  for(var i=0; i<4; i++){
   if(scroll >= wt * i && scroll < wt * (i+1)){
    $('#gnb li').removeClass('on');
    $('#gnb li').eq(i).addClass('on');
   }
  }
  
 });
  
 
 /*마우스가 움직일 때 이미지 위치값 연동 시키기 */
 $('section').on('mousemove', function(e){
  //마우스의 x, y 좌표값 저장하기
  var posX = e.pageX,
      posY = e.pageY;
  
  $('.pic11').css({
   right: 20 - (posX/30) ,
   bottom: 20 - (posY/10)
  });
  $('.pic12').css({
   right: 150 + (posX/30),
   bottom: 200 - (posY/20)
  });
  
  //section 2
  $('.pic21').css({
   right: -200-(posX/25),
   bottom: -500-(posY/25)
  });
  $('.pic22').css({
   right: 150+(posX/50),
   bottom: -50+(posY/50)
  });
 
 //section 3
  $('.pic31').css({
   right: 200-(posX/30),
   bottom: 30-(posY/30)
  });
  $('.pic32').css({
   right: 110+(posX/10),
   bottom: -300+(posY/20)
  });
 
 //section 4
  $('.pic41').css({
   right: 20-(posX/30),
   bottom: -120-(posY/30)
  });
  $('.pic42').css({
   right: 0+(posX/20),
   bottom: -200+(posY/20)
  });
 });
 
 
 /*시작하면 첫번째 메뉴 활성화 시키기*/
 $('#gnb li').eq(0).addClass('on');
 
});








