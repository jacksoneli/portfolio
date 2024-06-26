require(['$'], function() {
	$(function() {
		var now = new Date();
	    var c_year= now.getFullYear();
	    var c_mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
	    var c_day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
	              
	    var chan_val = c_year + c_mon  + c_day;
	    
	    var pvarIsLogin = $("#loginYN").val();
	    var evtId = $("#evtId").val();
	    
	    if(pvarIsLogin == "true"){
	    	var dataURL ="/kr/ko/life/event/evt20180601/checkTime";
			var data = "today=0&seq="+evtId+"&method=countDay";
	    	$.ajax({
					type : "POST",
					url : dataURL,
					cache : false,
					data : data,
					dataType : "json",
					success : function(data) {
						var cnt = 0;
						$('.calc_area .calTd').each(function(index,value) {
				            var me = $(this);
				            var day = parseInt(me.find('em').text());
				            day = (day < 10) ? '0' + day : day;
				            if (data.list.indexOf('2018' +'06'+ day+'') >= 0) {
				            	me.addClass("ok");
				            	cnt +=1;
				            }
				        });
						$(".cal_number").find('span').text(cnt);
						
						if(data.couponList.length != 0){
							for(var z=0; z<data.couponList.length; z++){
								var couponArray = data.couponList[z] + "";
								var couponVal = couponArray.split(",");
								
								$('#btn'+couponVal[1]).addClass("ok");
							}
						}
						
						
					},
					error : function(xhr, status, error) {
						popupNotification({
							msg: '시스템 에러가 발생하였습니다. 잠시 후 다시 시도해 주십시오. 문제가 계속 발생하면 관리자에게 문의해주십시오.',
							type: 'error',
							timer: 3000
						});
					}
				});
	    }
	    
	    $(".btn_checkcal").click(function(a){
	    	a.preventDefault();
			if(pvarIsLogin == "true"){
			var dataURL ="/kr/ko/life/event/evt20180601/checkTime";
			var data = "today="+chan_val+"&seq="+evtId+"&method=evtApply";

				$.ajax({
					type : "POST",
					url : dataURL,
					cache : false,
					data : data,
					dataType : "json",
					success : function(response) {
						if(response.result == "1"){
							$('.calc_area .calTd').each(function(index,value) {
					            var me = $(this);
					            var day = parseInt(me.find('em').text());
					            var cnt = 0;
					            day = (day < 10) ? '0' + day : day;
					            if (day == c_day) {
					               me.addClass("ok");
					               alert("출석체크 완료!");
					            }
					        });							
						$(".cal_number").find('span').text(parseInt(response.count)+1);
						
						//appBoy 통계
						appboy.logCustomEvent("event_20180601_ok");
						
						}else if(response.result == "timeEnd"){
							alert('이벤트 기간이 아닙니다.');
						}else if(response.result == "timeBefore"){
							alert('이벤트 기간이 아닙니다.');
						}else if(response.result == "applied"){
							alert('오늘 출석체크를 이미 하셨습니다.\n 내일 출석체크도 잊지마세요~');
						}else{
							popupNotification({
							msg: '시스템 에러가 발생하였습니다. 잠시 후 다시 시도해 주십시오. 문제가 계속 발생하면 관리자에게 문의해주십시오.',
							type: 'error',
							timer: 3000
							});
						}
					},
					error : function(xhr, status, error) {
						popupNotification({
							msg: '시스템 에러가 발생하였습니다. 잠시 후 다시 시도해 주십시오. 문제가 계속 발생하면 관리자에게 문의해주십시오.',
							type: 'error',
							timer: 3000
						});
					}
				});
			}else{
				if ( confirm("로그인 하시겠습니까?")){
					  var url = "/kr/ko/login?r=/kr/ko/life/event/apply/"+evtId+"/check";
					  location.href=url;
				  } else{
					  return false;
				  }
			}
		}); 
	    $(".btn_1").click(function(a){
	    	a.preventDefault();
	    	if(pvarIsLogin == "true"){
	    		var totDay = $(".cal_number").find('span').text();
	    		if(parseInt(totDay) >= 3){
	    			var data = "1";
	    			var couponMsg = "5,000원 할인쿠폰이 지급되었습니다.\n마이페이지 > 할인쿠폰 내역";
	    			callAjax(data,couponMsg);
	    		}else{
	    			alert('해당 이벤트는 총 출석 일수가 충족되어야 응모 가능합니다. \n다시 한 번 확인해주시기 바랍니다.');
	    		}

			}else{
				if ( confirm("로그인 하시겠습니까?")){
					  var url = "/kr/ko/login?r=/kr/ko/life/event/apply/"+evtId+"/check";
					  location.href=url;
				  } else{
					  return false;
				  }
			}
	    });
	    $(".btn_2").click(function(a){
	    	a.preventDefault();
	    	if(pvarIsLogin == "true"){
	    		var totDay = $(".cal_number").find('span').text();
	    		if(parseInt(totDay) >= 7){
	    			var data = "2";
	    			var couponMsg = "15% 할인쿠폰이 지급되었습니다.\n마이페이지 > 할인쿠폰 내역";
	    			callAjax(data,couponMsg);
	    			
	    		}else{
	    			alert('해당 이벤트는 총 출석 일수가 충족되어야 응모 가능합니다. \n다시 한 번 확인해주시기 바랍니다.');
	    		}

			}else{
				if ( confirm("로그인 하시겠습니까?")){
					  var url = "/kr/ko/login?r=/kr/ko/life/event/apply/"+evtId+"/check";
					  location.href=url;
				  } else{
					  return false;
				  }
			}
	    });
	    $(".btn_3").click(function(a){
	    	a.preventDefault();
	    	if(pvarIsLogin == "true"){
	    		var totDay = $(".cal_number").find('span').text();
	    		if(parseInt(totDay) >= 12){
	    			var data = "3";
	    			var couponMsg = "10,000원 할인쿠폰이 지급되었습니다.\n마이페이지 > 할인쿠폰 내역";
	    			callAjax(data,couponMsg);
	    		}else{
	    			alert('해당 이벤트는 총 출석 일수가 충족되어야 응모 가능합니다. \n다시 한 번 확인해주시기 바랍니다.');
	    		}

			}else{
				if ( confirm("로그인 하시겠습니까?")){
					  var url = "/kr/ko/login?r=/kr/ko/life/event/apply/"+evtId+"/check";
					  location.href=url;
				  } else{
					  return false;
				  }
			}
	    });
	    $(".btn_4").click(function(a){
	    	a.preventDefault();
	    	if(pvarIsLogin == "true"){
	    		var totDay = $(".cal_number").find('span').text();
	    		if(parseInt(totDay) >= 18){
	    			var data = "4";
	    			var couponMsg = "20% 할인쿠폰이 지급되었습니다.\n마이페이지 > 할인쿠폰 내역";
	    			callAjax(data,couponMsg);
	    		}else{
	    			alert('해당 이벤트는 총 출석 일수가 충족되어야 응모 가능합니다. \n다시 한 번 확인해주시기 바랍니다.');
	    		}

			}else{
				if ( confirm("로그인 하시겠습니까?")){
					  var url = "/kr/ko/login?r=/kr/ko/life/event/apply/"+evtId+"/check";
					  location.href=url;
				  } else{
					  return false;
				  }
			}
	    });
	    $(".btn_5").click(function(a){
	    	a.preventDefault();
	    	if(pvarIsLogin == "true"){
	    		var totDay = $(".cal_number").find('span').text();
	    		if(parseInt(totDay) >= 25){
	    			var data = "5";
	    			var couponMsg = "20,000원 할인쿠폰이 지급되었습니다.\n마이페이지 > 할인쿠폰 내역";
	    			callAjax(data,couponMsg);
	    		}else{
	    			alert('해당 이벤트는 총 출석 일수가 충족되어야 응모 가능합니다. \n다시 한 번 확인해주시기 바랍니다.');
	    		}

			}else{
				if ( confirm("로그인 하시겠습니까?")){
					  var url = "/kr/ko/login?r=/kr/ko/life/event/apply/"+evtId+"/check";
					  location.href=url;
				  } else{
					  return false;
				  }
			}
	    });
	    $(".btn_6").click(function(a){
	    	a.preventDefault();
	    	if(pvarIsLogin == "true"){
	    		var totDay = $(".cal_number").find('span').text();
	    		if(parseInt(totDay) >= 30){
	    			var data = "6";
	    			var couponMsg = "30% 할인쿠폰이 지급되었습니다.\n마이페이지 > 할인쿠폰 내역";
	    			callAjax(data,couponMsg);
	    		}else{
	    			alert('해당 이벤트는 총 출석 일수가 충족되어야 응모 가능합니다. \n다시 한 번 확인해주시기 바랍니다.');
	    		}

			}else{
				if ( confirm("로그인 하시겠습니까?")){
					  var url = "/kr/ko/login?r=/kr/ko/life/event/apply/"+evtId+"/check";
					  location.href=url;
				  } else{
					  return false;
				  }
			}
	    });
		
	});
});

function callAjax(data,couponMsg){
	$.ajax({
		type : "POST",
		url : "/kr/ko/life/event/evt20180601/coupon",
		cache : false,
		data : "couponSeq="+data,
		dataType : "json",
		success : function(response) {
			if(response.result == "1"){
				alert(couponMsg);
				$('#btn'+data).addClass("ok");
			}else if(response.result == "timeEnd"){
				alert('이벤트 기간이 아닙니다.');
			
			}else if(response.result == "timeBefore"){
				alert('이벤트 기간이 아닙니다.');
			
			}else if(response.result == "countLess"){
				alert('해당 이벤트는 총 출석 일수가 충족되어야 응모 가능합니다. \n다시 한 번 확인해주시기 바랍니다.');
			
			}else if(response.result == "duplication"){
				alert('이미 쿠폰이 발급되었습니다. \n본 이벤트는 중복 응모가 불가능합니다.');
				
			}else{
				popupNotification({
				msg: '시스템 에러가 발생하였습니다. 잠시 후 다시 시도해 주십시오. 문제가 계속 발생하면 관리자에게 문의해주십시오.',
				type: 'error',
				timer: 3000
				});
			}
		},
		error : function(xhr, status, error) {
			popupNotification({
				msg: '시스템 에러가 발생하였습니다. 잠시 후 다시 시도해 주십시오. 문제가 계속 발생하면 관리자에게 문의해주십시오.',
				type: 'error',
				timer: 3000
			});
		}
	});
}
