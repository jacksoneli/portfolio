function BannerSlider()
{
	this.BANNER_WIDTH = 0;
	this.BANNER_HEIGHT = 0;
	this.SHOW_DURATION = 500; 
	this.AUTO_PLAY_TIME = 2000;
	
	this.$banner = null
	this.$banner_slider = null;
	this.$banner_content = null;
	this.$IMG = null; 
	this.nBannerLength = 0;
	this.nCurrentBannerIndex = 0;
	this.$banner_dots=null;
	this.autoTImerID=0;
}




BannerSlider.prototype.initMenu=function(){
	this.$banner = $("#banner");
	this.$banner_slider=$(".banner_slider");
	this.$banner_content = $("#banner_content");	
	this.$IMG = $("#banner_content > img");
	
	//초기 배너슬라이더 크기수정
	this.BANNER_WIDTH = this.$banner_slider.width();	
	this.$IMG.attr("width",this.BANNER_WIDTH);
	
	this.BANNER_HEIGHT = this.$IMG.height();
	this.$banner.css("height",this.BANNER_HEIGHT);
	//	
	
	this.nBannerLength = this.$banner_content.children("img").length;
	this.$banner_content.width(this.BANNER_WIDTH * this.nBannerLength);
	this.$banner_dots = $("#banner_nav li a");
	

	
	this.showBannerDotAt(0);

	this.autoTImerID = 0;
}


BannerSlider.prototype.initEventListener=function(){
	var objThis = this;

	$("#btn_prev_banner").bind("click", function(){
		objThis.prevBanner();
	});

	$("#btn_next_banner").bind("click", function(){
		objThis.nextBanner();
	});
	
	this.$banner_dots.bind("mouseenter",function(){
		var nIndex = objThis.$banner_dots.index(this);
		objThis.showBannerAt(nIndex);
	})
	
	var $banner_slider = $("div.banner_slider");
	$banner_slider.bind("mouseenter",function(){
		objThis.stopAutoPlay();	
	});
	$banner_slider.bind("mouseleave",function(){
		objThis.startAutoPlay();	
	});
}
	

BannerSlider.prototype.prevBanner=function(){
	var nIndex = this.nCurrentBannerIndex-1;
	if(nIndex<0)
		nIndex = this.nBannerLength-1;
		
	this.showBannerAt(nIndex);			
}

BannerSlider.prototype.nextBanner=function()
{
	//배너슬라이더 크기수정
	this.BANNER_WIDTH = this.$banner_slider.width();	
	this.$IMG.attr("width",this.BANNER_WIDTH);
	
	this.BANNER_HEIGHT = this.$IMG.height();
	this.$banner.css("height",this.BANNER_HEIGHT);
	//	

	
	var nIndex = this.nCurrentBannerIndex+1;
	if(nIndex>=this.nBannerLength)
		nIndex = 0;
	
	this.showBannerAt(nIndex);	
}

BannerSlider.prototype.showBannerAt=function(nIndex){
	if (nIndex != this.nCurrentBannerIndex) {
		var nPosition = -this.BANNER_WIDTH * nIndex;
		
		this.showBannerDotAt(nIndex);
		
		this.$banner_content.stop();
		this.$banner_content.animate({
			left: nPosition
		}, this.SHOW_DURATION, "easeOutQuint");
		this.nCurrentBannerIndex = nIndex;
	}
}

BannerSlider.prototype.showBannerDotAt=function(nIndex){
	this.$banner_dots.eq(this.nCurrentBannerIndex).removeClass("select");
	this.$banner_dots.eq(nIndex).addClass("select");
}


BannerSlider.prototype.startAutoPlay=function(){
	
	if(this.autoTimerID!=0)
		clearInterval(this.autoTimerID);
	
	var objThis = this;	
	this.autoTimerID = setInterval(function(){
		objThis.nextBanner();
	},this.AUTO_PLAY_TIME);
}

BannerSlider.prototype.stopAutoPlay=function(){
	if(this.autoTimerID!=0)
		clearInterval(this.autoTimerID);
		
	this.autoTimerID = 0;
}