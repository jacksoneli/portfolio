/**************************************************************************************************
* 시  스  템 	: 
* 메  뉴  명 	: 표준 주소검색 팝업
* 프로그램명	: newRoadZipCode.js
* 설     명  : 표준주소 검색 팝업 Java Script
* 이력  사항 	: 2014-07-02 신규작성 // 2016-01 이롭게 수령, 2016-03 우편번호 자리수 및 오설록 몰에 맞게 커스터마이징
*     
* 
***************************************************************************************************/

var gv_addrList;
var gv_zipcd;
var gv_addr1;
var gv_addr2;
var gv_zipCodeList;

function zipcodeInit() {
	gv_addrList = null;
	gv_zipcd = null;
	gv_addr1 = null;
	gv_addr2 = null;
	gv_zipCodeList = null;
}

//1. 주소 검색
function getAddrList(){
	var searchFl = $('#zipcode-tabs li.is-current a').data('mode');
	
	var keyword1 = (searchFl == "J" ? $("#search_old").val()    : $("#siDo").val());
	var keyword2 = (searchFl == "J" ? ""                        : $("#siGun").val());
	var keyword3 = (searchFl == "J" ? ""                        : $("#road").val());
	var keyword4 = "";
	var keyword5 = (searchFl == "J" ? ""                        : $("#buildingName").val());
	var keyword6 = "";
	var buildingNum = (searchFl == "J" ? ""                        : $("#buildingNum").val());
	
	var buildingNumArr = buildingNum.split("-");
	if(buildingNumArr.length == 2 && searchFl != "J"){
		keyword4 = buildingNumArr[0];
		keyword6 = buildingNumArr[1];
	}else if(buildingNumArr.length == 1 && searchFl != "J"){
		keyword4 = buildingNum;
	}else{
		keyword4 = "";
		keyword6 = "";
	}
	
	//var keyword6 = (searchFl == "J" ? ""                        : $("#buildingNumSub").val());
	if(searchFl == 'J') {
	    $('#old-s1').find('.zip-list').empty();
	} else {
	    $('#new-s1').find('.zip-list').empty();
	}
	
	gv_zipCodeList = null;
	
    $.ajax({
        type : "POST",
        url : "/kr/ko/zipcode/search",
        data : {
                    "searchMode":searchFl,
                    "keyword1":encodeURI(keyword1),  
                    "keyword2":encodeURI(keyword2),  
                    "keyword3":encodeURI(keyword3),  
                    "keyword4":encodeURI(keyword4),  
                    "keyword5":encodeURI(keyword5),
                    "keyword6":encodeURI(keyword6)
        },
        success : function callbackGetAddrList(data){
        	
        	var addrList = JSON.parse(data);
        	var searchFl = $('#zipcode-tabs li.is-current a').data('mode');
        	var listCount = addrList.zipList.length;
        	
        	gv_zipCodeList = addrList.zipList; 
        	
        	if (listCount >= 1) {
        		
        		$.each(addrList.zipList, function(idx, zipCodeList){
        			
        			if(searchFl == 'J'){
        				var addrList = '';
        				var zipcd    = zipCodeList.zipcd.replace("-","");
        				var addr     = zipCodeList.sido+" "+
        				zipCodeList.gugun+" "+    
        				zipCodeList.dong+" "+
        				zipCodeList.detaladdr+" "+
        				zipCodeList.bunji;
        				addrList += '<li data-idx="'+ idx +'">';
        				addrList += '<a href="#" class="btn-add">';
        				//addrList += '(<span class="st">' + zipcd +'</span>) ';
        				addrList += '<span class="st">' + addr + '</span>';
        				addrList += '<i class="icon-arr-right"></i>';
        				addrList += '</a>';
        				addrList += '</li>';
        				
        				$("#old-s1 .zip-result ul.zip-list").append(addrList);
        				
        			}else{
        				var addrList = '';
        				var zipcd =  zipCodeList.zipcd.replace("-","");
        				
        				var tempSubBldNo = zipCodeList.bldsubno;
        				if(tempSubBldNo != null && tempSubBldNo != "" && tempSubBldNo != undefined && tempSubBldNo != 0){
        					tempSubBldNo = zipCodeList.bldmainno+"-"+tempSubBldNo;
        				}else{
        					tempSubBldNo = zipCodeList.bldmainno;
        				}
        				
        				var addr =  zipCodeList.sidonm+" "+             
        				zipCodeList.sigungunm+" "+          
        				zipCodeList.umnm+" "+               
        				zipCodeList.rdnm+" "+                   
        				zipCodeList.undergubun+" "+            
        				tempSubBldNo+", "+              
        				zipCodeList.bldnm;
        				
        				addrList += '<li data-idx="'+ idx +'">';
        				addrList += '<a href="#" class="btn-add">';
        				addrList += '(<span class="st">' + zipcd +'</span>) ';
        				addrList += '<span class="st">' + addr + '</span>';
        				addrList += '<i class="icon-arr-right"></i>';
        				addrList += '</a>';
        				addrList += '</li>';
        				
        				$("#new-s1 .zip-result ul.zip-list").append(addrList);
        			}
        			
        		});
        		
        	} else {
    			var noDataMsg = '<li><span class="st">조회된 데이터가 없습니다.</span></li>';	
    			if(searchFl == 'J'){
    				$("#old-s1 .zip-result ul.zip-list").append(noDataMsg);
    			} else {
    				$("#new-s1 .zip-result ul.zip-list").append(noDataMsg);
    			}
        	}
        }
    });
}

//2. 리스트에서 주소 선택
function selectAddr( idx ){	
	
	var searchFl = $('#zipcode-tabs li.is-current a').data('mode');
	
	var zipcd = "";
	var addr1 = "";
	
	if(searchFl == "J"){
		//zipcd = $('#old-s1 ul.zip-list li:eq(' + idx + ') .st:eq(0)').text();
		zipcd = gv_zipCodeList[idx].zipcd;
		//지번주소 검색시 번지범위 미표시 요건
		addr1 =  gv_zipCodeList[idx].sido+" "+
				 gv_zipCodeList[idx].gugun+" "+    
				 gv_zipCodeList[idx].dong+" "+
				 gv_zipCodeList[idx].detaladdr+" ";
		//$('#old-s2 .zip-detail td.select-addr').text('(' + zipcd+ ') ' + addr1);
		$('#old-s2 .zip-detail td.select-addr').text(addr1);
		$("#detail_old").val("");
		$("#detail_old").focus();
		
	}else{
		//zipcd = $('#new-s1 ul.zip-list li:eq(' + idx + ') .st:eq(0)').text();
		zipcd = gv_zipCodeList[idx].zipcd;
		addr1 = $('#new-s1 ul.zip-list li:eq(' + idx + ') .st:eq(1)').text();
		$('#new-s2 .zip-detail td.select-addr').text('(' + zipcd.replace("-","") + ') ' + addr1);
		$("#detail_new").val("");
		$("#detail_new").focus();
	}
	
	gv_zipcd =  zipcd.replace("-","");
	//alert("gv_zipcd : " + gv_zipcd + " / zipcd : " + zipcd);
	gv_addr1 = addr1;
	
}

//EAI 호출 주소 번역
function getStdAddrList(){
	var searchFl = $('#zipcode-tabs li.is-current a').data('mode');
	var keyword1 = gv_zipcd;
	var keyword2 = gv_addr1;
	
	var keyword3 = $("#detail_old").val();
	if(searchFl != "J"){
		keyword3 = $("#detail_new").val();
	}
	gv_addr2=keyword3;
	
	$("#address_old_last1").attr("checked", false);
	$("#address_old_last2").attr("checked", false);
	$("#address_old_last3").attr("checked", false);
	
	$("#address_new_last1").attr("checked", false);
	$("#address_new_last2").attr("checked", false);
	$("#address_new_last3").attr("checked", false);
	
    $.ajax({
        type : "POST",
        url : "/kr/ko/zipcode/searchEAI",
        data : {    
    				"searchMode":searchFl, 	// 검색모드                    
                    "zipcode":encodeURI(keyword1),	 // 우편번호
                    "addr1":encodeURI(keyword2),    // 주소1
                    "addr2":encodeURI(keyword3)    // 주소2
        },
        success : function callbackGetStdAddrList(data){

        	var addrList = JSON.parse(data);
        	gv_addrList = addrList;
        	
        	var zipCodeList = addrList.Data;
        	var addrData;
        	
        	//EAI 메시지 테트스용
        	
        	if(addrList.Header.IF_RESULT == "S"){
        		if(addrList.Header.RCD3 == 'I' || addrList.Header.RCD3 == 'H'){
        			//표준주소 정제 성공
        			addrList.Header.DATA_CNT        			
        			for(var i=0; i<addrList.Header.DATA_CNT; i++){
        				var node = zipCodeList[i].NODE;        		
        				if(node == 'P'){
        					addrData = zipCodeList[i];
        				}
        			}
        			//표준 지번 주소
        			var zipcd = addrData.ZIP1+addrData.ZIP2;   
        			var addr  = addrData.ADDR1H+" "+addrData.STDADDR;
        			
        			//표준 도로명 주소
        			var zipcdR = addrData.ZIPR1+addrData.ZIPR2;   
        			var addrR  = addrData.NADR1S+", "+ 
			        			 addrData.NADR3S+" "+
			        			 addrData.NADREHU;
        			if(searchFl == "J"){
        				//입력한 주소
        				$('#old-s3 .zip-list .b:eq(0)').text( "("+gv_zipcd+") "+ gv_addr1+" "+keyword3);
        				$("#old-s3 .zip-list .b:eq(1)").text( "("+zipcd+") "+ addr);
        				$("#old-s3 .zip-list .b:eq(2)").text( "("+zipcdR+") "+ addrR);
        				
        				$('#old-s3 .zip-list label[for="address_old_last3"]').click();
        			}else{
        				$('#new-s3 .zip-list .b:eq(0)').text( "("+gv_zipcd+") "+ gv_addr1+" "+keyword3);
        				$('#new-s3 .zip-list .b:eq(1)').text( "("+zipcd+") "+ addr);
        				$('#new-s3 .zip-list .b:eq(2)').text( "("+zipcdR+") "+ addrR);
        				
        				$('#new-s3 .zip-list label[for="address_new_last3"]').click();
        			}
        			
        		}else{
        			if(searchFl == "J"){
	        			//매칭 실패
        				setErrorData();
	        			$('#old-s3 .zip-list .b:eq(0)').text( "("+gv_zipcd+") "+ gv_addr1+" "+keyword3);
	        			$('#old-s3 .zip-list .b:eq(1)').text( "표준 지번주소를 찾을 수 없습니다. "+"주소를 수정하시거나, 입력주소를 선택해 주세요");
	        			$('#old-s3 .zip-list .b:eq(2)').text( "표준 도로명 주소를 찾을 수 없습니다. "+"주소를 수정하시거나, 입력주소를 선택해 주세요");
	        			
        				$('#old-s3 .zip-list label[for="address_old_last1"]').click();
        			}else{
        				setErrorData();
        				$('#new-s3 .zip-list .b:eq(0)').text( "("+gv_zipcd+") "+ gv_addr1+" "+keyword3);
        				$('#new-s3 .zip-list .b:eq(1)').text( "표준 지번주소를 찾을 수 없습니다. "+"주소를 수정하시거나, 입력주소를 선택해 주세요");
        				$('#new-s3 .zip-list .b:eq(2)').text( "표준 도로명 주소를 찾을 수 없습니다. "+"주소를 수정하시거나, 입력주소를 선택해 주세요");
        				
        				$('#new-s3 .zip-list label[for="address_new_last1"]').click();
        			}
        			
        		}
        	}else{
        		if(searchFl == "J"){
	        		//EAI 인터페이스 실패 및 수지원넷 통신 에러
        			setErrorData();
	        		$('#old-s3 .zip-list .b:eq(0)').text( "("+gv_zipcd+") "+ gv_addr1+" "+keyword3);
	        		$('#old-s3 .zip-list .b:eq(1)').text( "표준화 지번주소를 찾을 수 없습니다. "+"주소를 수정하시거나, 입력주소를 선택해 주세요");
	        		$('#old-s3 .zip-list .b:eq(2)').text( "표준 도로명 주소를 찾을수 없습니다. "+"주소를 수정하시거나, 입력주소를 선택해 주세요");
	    			
    				$('#old-s3 .zip-list label[for="address_old_last1"]').click();
				}else{
					setErrorData();
					$('#new-s3 .zip-list .b:eq(0)').text( "("+gv_zipcd+") "+ gv_addr1+" "+keyword3);
					$('#new-s3 .zip-list .b:eq(1)').text( "표준화 지번주소를 찾을 수 없습니다. "+"주소를 수정하시거나, 입력주소를 선택해 주세요");
					$('#new-s3 .zip-list .b:eq(2)').text( "표준 도로명 주소를 찾을수 없습니다. "+"주소를 수정하시거나, 입력주소를 선택해 주세요");
					
    				$('#new-s3 .zip-list label[for="address_new_last1"]').click();
				}
        	}
        },//success
        error : function errorProcess( jqXHR, textStatus, errorThrown ){
        	if(searchFl == "J"){
        		//EAI 인터페이스 실패
        		$('#old-s3 .zip-list .b:eq(0)').text( "("+gv_zipcd+") "+ gv_addr1+" "+keyword3);
        		$('#old-s3 .zip-list .b:eq(1)').text( "표준화 지번주소를 찾을 수 없습니다. "+"주소를 수정하시거나, 입력주소를 선택해 주세요");
        		$('#old-s3 .zip-list .b:eq(2)').text( "표준 도로명 주소를 찾을수 없습니다. "+"주소를 수정하시거나, 입력주소를 선택해 주세요");
        		
				$('#old-s3 .zip-list label[for="address_old_last1"]').click();
        	}else{
        		$('#new-s3 .zip-list .b:eq(0)').text( "("+gv_zipcd+") "+ gv_addr1+" "+keyword3);
        		$('#new-s3 .zip-list .b:eq(1)').text( "표준화 지번주소를 찾을 수 없습니다. "+"주소를 수정하시거나, 입력주소를 선택해 주세요");
        		$('#new-s3 .zip-list .b:eq(2)').text( "표준 도로명 주소를 찾을수 없습니다. "+"주소를 수정하시거나, 입력주소를 선택해 주세요");
        		
				$('#new-s3 .zip-list label[for="address_new_last1"]').click();
        	}
        }
    });//ajax
}

//부모창에 전송
function sendParent(parentId) {
	
    //입력한 주소
    $("#SendAddress0 input:eq(0)").val(String(gv_addrList.Header.RCD1).replace(/^\s+|\s+$/g,'')   );
    $("#SendAddress0 input:eq(1)").val(String(gv_addrList.Header.RMG1).replace(/^\s+|\s+$/g,'')   );
    $("#SendAddress0 input:eq(2)").val(String(gv_addrList.Header.RCD2).replace(/^\s+|\s+$/g,'')   );
    $("#SendAddress0 input:eq(3)").val(String(gv_addrList.Header.RMG2).replace(/^\s+|\s+$/g,'')   );
    $("#SendAddress0 input:eq(4)").val(String(gv_addrList.Header.RCD3).replace(/^\s+|\s+$/g,'')   );
    $("#SendAddress0 input:eq(5)").val(String(gv_addrList.Header.RMG3).replace(/^\s+|\s+$/g,'')   );
    
    var searchMode = $('#zipcode-tabs li.is-current a').data('mode');
    
    var amode =""; //1 : 입력지번, 2 : 입력도로명, 3 : 표준지번, 4 : 표준도로명
    if(searchMode == "J"){
        amode = '1';
    }else{
        amode = '2';            
    }
    $("#SendAddress0 input:eq(6)").val(amode);
    $("#SendAddress0 input:eq(7)").val(gv_zipcd);
    $("#SendAddress0 input:eq(8)").val(gv_addr1);//addr1
    $("#SendAddress0 input:eq(9)").val(gv_addr2);//addr2
    
    var radioNum = "";
    if(searchMode == "J"){
        radioNum = $("input[name=address_old_last]:checked").val();
    }else{
        radioNum = $("input[name=address_new_last]:checked").val();
    }
    $("#SendAddress0 input:eq(10)").val(radioNum);//NUM
    
    //통신 에러시 Data가 null로 온다
    if(gv_addrList.Data == null || gv_addrList.Data == "" ){
    	
        //에러 났는데 입력한 주소를 선택 하지 않음
        if(radioNum != '0'){
            alert("정상 변환된 주소가 아닙니다. \n입력주소를 선택 하시길 바랍니다.");
            return;
        }
    
        var obj = document.SendAddress0;
        var obj1 = document.SendAddress1;
        var obj2 = document.SendAddress2;
        
        obj.RCD3.value = "";
        obj1.RCD3.value = "";
        obj2.RCD3.value = "";
        
        obj1.ZIP1 = "000";
        obj1.ZIP2 = "000";
        obj1.ADDR1H = "표준 지번주소를 찾을 수 없습니다.";
        obj1.STDADDR= "";
        obj1.NADR1S  =""; 
        obj1.NADR3S  ="";
        obj1.NADREHU ="";
        
        obj2.ZIPR1 = "000";                     
        obj2.ZIPR2 = "000";
        obj2.ADDR1H = "";
        obj2.STDADDR= "";
        obj2.NADR1S  ="표준 도로명 주소를 찾을 수 없습니다."; 
        obj2.NADR3S  ="";
        obj2.NADREHU ="";
        
        setAddress( obj, obj1, obj2, parentId);
         
        return;
    }
    
    //에러 났는데 입력한 주소를 선택 하지 않음
    if((gv_addrList.Data[0].ZIP1 == '000' || gv_addrList.Data[0].ZIPR1 == '000') && (radioNum == '1' || radioNum == '2')) {
        alert("정상 변환된 주소가 아닙니다. \n입력주소를 선택 하시길 바랍니다.");
        return;
    }
    
    //data
    //표준지번
    amode="3";
    $("#SendAddress1 input:eq(4)").val(gv_addrList.Header.RCD3);
    $("#SendAddress1 input:eq(6)").val(amode);
    $("#SendAddress1 input:eq(11)").val(String(gv_addrList.Data[0].NODE   ).replace(/^\s+|\s+$/g,''));
    $("#SendAddress1 input:eq(12)").val(String(gv_addrList.Data[0].ZIP1   ).replace(/^\s+|\s+$/g,''));
    $("#SendAddress1 input:eq(13)").val(String(gv_addrList.Data[0].ZIP2   ).replace(/^\s+|\s+$/g,''));
    $("#SendAddress1 input:eq(14)").val(String(gv_addrList.Data[0].ADDR1H ).replace(/^\s+|\s+$/g,''));
    $("#SendAddress1 input:eq(15)").val(String(gv_addrList.Data[0].STDADDR).replace(/^\s+|\s+$/g,''));
    $("#SendAddress1 input:eq(16)").val(String(gv_addrList.Data[0].GISX   ).replace(/^\s+|\s+$/g,''));
    $("#SendAddress1 input:eq(17)").val(String(gv_addrList.Data[0].GISY   ).replace(/^\s+|\s+$/g,''));
    $("#SendAddress1 input:eq(26)").val(String(gv_addrList.Data[0].NNMZ   ).replace(/^\s+|\s+$/g,''));
    
    //표준도로명
    amode="4";
    $("#SendAddress2 input:eq(4)").val(gv_addrList.Header.RCD3);
    $("#SendAddress2 input:eq(6)").val(amode);
    $("#SendAddress2 input:eq(18)").val(String(gv_addrList.Data[0].ZIPR1  ).replace(/^\s+|\s+$/g,''));
    $("#SendAddress2 input:eq(19)").val(String(gv_addrList.Data[0].ZIPR2  ).replace(/^\s+|\s+$/g,''));
    $("#SendAddress2 input:eq(20)").val(String(gv_addrList.Data[0].NADR1S ).replace(/^\s+|\s+$/g,''));
    $("#SendAddress2 input:eq(21)").val(String(gv_addrList.Data[0].NADR3S ).replace(/^\s+|\s+$/g,''));
    $("#SendAddress2 input:eq(22)").val(String(gv_addrList.Data[0].NADREJ ).replace(/^\s+|\s+$/g,''));
    $("#SendAddress2 input:eq(23)").val(String(gv_addrList.Data[0].NADREHU).replace(/^\s+|\s+$/g,''));
    $("#SendAddress2 input:eq(24)").val(String(gv_addrList.Data[0].NNMX   ).replace(/^\s+|\s+$/g,''));
    $("#SendAddress2 input:eq(25)").val(String(gv_addrList.Data[0].NNMY   ).replace(/^\s+|\s+$/g,''));
    $("#SendAddress2 input:eq(26)").val(String(gv_addrList.Data[0].NNMZ   ).replace(/^\s+|\s+$/g,''));
    
    var obj     =   document.SendAddress0;
    var obj1    =   document.SendAddress1;
    var obj2    =   document.SendAddress2;
    
    setAddress( obj, obj1, obj2, parentId);
    
}

// 표준주소검색팝업값셋팅
function setAddress(obj, h1, h2, parentId) {
    // 주소입력 폼의 name
	
    var destShow = $('#'+parentId + ' input[name=addressView]');
    var destTitle = $('#'+parentId + ' a');
    var destZip = $('#'+parentId + ' input[name=zip]');
    var destAddr = $('#'+parentId + ' input[name=address]');
    var destAddrDetail = $('#'+parentId + ' input[name=addressDetail ]');
    
    var zipcode, address, addressDetail;
    var addr = '';
    
    //선택된값에따라서주소셋팅해줌
    switch(obj.NUM.value){
        case'0':
        	zipcode = String(obj.zipcode.value).replace("-","");
        	address = obj.addr1.value;
        	addressDetail = obj.addr2.value;
        break;
        case'1':
        	zipcode = h1.ZIP1.value + h1.ZIP2.value;
        	address = h1.ADDR1H.value;
        	addressDetail = h1.STDADDR.value;
        break;
        case'2':
        	zipcode = h2.ZIPR1.value + h2.ZIPR2.value;
        	address = h2.NADR1S.value;
        	addressDetail = h2.NADR3S.value + ' ' + h2.NADREHU.value;
        break;
    }
    destZip.val(zipcode);
    destAddr.val(address);
    destAddrDetail.val(addressDetail);
    addr = '(' + zipcode +') ' + address + ' ' + addressDetail; 
    destShow.val(addr);
    destTitle.attr('title', addr);
}

function setErrorData(){
	gv_addrList.Data[0].ZIP1 = "000";
	gv_addrList.Data[0].ZIP2 = "000";
	gv_addrList.Data[0].ZIPR1 = "000";    					
	gv_addrList.Data[0].ZIPR2 = "000";
	
	gv_addrList.Data[0].ADDR1H = "표준 지번주소를 찾을 수 없습니다.";
	gv_addrList.Data[0].STDADDR= "";
	
	gv_addrList.Data[0].NADR1S  ="표준 도로명 주소를 찾을 수 없습니다."; 
    gv_addrList.Data[0].NADR3S  ="";
    gv_addrList.Data[0].NADREHU ="";
}

function isEnterKeyPressed(){
	if(event.keyCode==13){
	   return true;
	}else{
	   return false;	
	}
}

function validateInput(obj) {
	var objElement = $('#' + obj);
	var objVal = $.trim(objElement.val());
	var errorMsg = objElement.data('validationErrorMsg');
	if(objVal == null || objVal == "") {
		objElement.addClass('error');
		objElement.parent().addClass('has-error');
		if(objElement.parent().find('.error-msg').length <= 0) { 
			objElement.parent().append('<span class="help-block error-msg">'+errorMsg+'</span>');
		}
		objElement.focus();
		return false;
	} else {
		removeError(obj)
		return true;
	}
}

function validateInput2(obj) {
	var objElement = $('#' + obj);
	var objVal = $.trim(objElement.val());
	var errorMsg = objElement.data('validationErrorMsg');
	if(objVal.length <= 1) {
		objElement.addClass('error');
		objElement.parent().addClass('has-error');
		if(objElement.parent().find('.error-msg').length <= 0) { 
			objElement.parent().append('<span class="help-block error-msg">'+errorMsg+'</span>');
		}
		objElement.focus();
		return false;
	} else {
		removeError(obj)
		return true;
	}
}


function removeError(obj) {
	var objElement = $('#' + obj);
	objElement.parent().removeClass('has-error');
	objElement.removeClass('error');
	objElement.parent().find('.error-msg').remove();
}