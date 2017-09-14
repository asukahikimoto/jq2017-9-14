/*引入头部*/
$("#header").load("public.html .header",function(res,type,xhr){
		
});
/*引入尾部*/
$("#footer").load("public.html .footer",function(res,type,xhr){
		
});
/*导航栏切换*/
$(".arrowIcon").click(function(){							
								$(".allClassNav").css({"opacity":.9,"top":0,"z-index":3})
					});
					$(".allClassNav").mouseleave(function(){							
								$(".allClassNav").css({"opacity":0,"top":"-100px","z-index":-1})
					});
