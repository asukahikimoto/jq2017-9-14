			//向左走  剪切第一张图片放到最后面
	var timer = setInterval(autoPlay,2000);
	function autoPlay(){
		$(".carousel-inner").animate({
			"marginLeft":-990
			},1000,function(){
				$(".carousel-inner").css("marginLeft",0).find("li:first").appendTo($(".carousel-inner"))
				flag = true;
			})
		}
	var flag = true;
	$(".carousel-inner").mouseover(function(){
		clearInterval(timer);
		$("#left,#right").show();
	})
	$(".carousel-inner").mouseout(function(){
		$("#myCarousel .left","#myCarousel .right").hide();
		timer = setInterval(autoPlay,2000);
	})
	$("#myCarousel .left").click(function(){
		if( flag ){
			autoPlay();
			flag = false;
		}
	})
	$("#myCarousel .right").click(function(){
		if( flag ){
			autoPlay();
			flag = false;
		}
	})