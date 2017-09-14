	var id = location.href.split("?")[1].split("=")[1];
	$.get("json/index.json", function(data) {
		var item = matchId(data, id);
		var html = template("detailData", item);
		$(".productionDetail").html(html);
		$(".productionDetai-l").magnifier();

		//点击减号
		$(".reduce").click(function() {
			var value = $(".sell_content").children("input").val();
			if(value <= 1) {
				alert("数量不能小于1");
			} else {
				value--;
				$(".sell_content").children("input").val(value);
			}
		})
		//点击加号
		$(".add").click(function() {
			var value = $(".sell_content").children("input").val();
			value++;
			$(".sell_content").children("input").val(value);
		})
		//点击加入购物车
		$(".cart_btn").click(function() {
			//	 		alert("加入购物车成功");
			var value = parseInt($(".sell_content").children("input").val());
			var nowValue = parseInt($(".add_cart").children("span").html());
			nowValue += value;
			$(".add_cart").children("span").html(nowValue);
			addToCart(value);
			init(".menu_cart a span"); //初始化购物车
		})
		//二维码扫描
		$(".code_btn").hover(function() {
			$(this).find(".codebox").slideToggle("slow")
		})

	})

	//初始化购物车

	function init(ele) {
		//获取购物车商品的数量
		var num = 0;
		var cartStr = $.cookie("cart");
		cartStr = cartStr ? cartStr : "[]";
		var cartObj = JSON.parse(cartStr);
		for(var i in cartObj) {
			num += parseInt(cartObj[i].num);
		}
		$(ele).html(num);
	}

	//找到匹配的ID
	function matchId(res, id) {
		// 获取json中匹配当前id的那个商品记录
		for(var item in res) {
			var obj = res[item];
			if(obj.id == id) {
				return obj; //$.each,不能使用返回值终止遍历，常用来遍历jquery对象
			}

		}
	}

	//加入购物车
	function addToCart(num) {
		//获取购物车cookie信息
		var cartStr = $.cookie("cart");
		cartStr = cartStr ? cartStr : "[]";
		var cartObj = JSON.parse(cartStr);

		//遍历是否存在该id，找出修改num

		var isExit = false; //假设不存在
		for(var i in cartObj) {
			if(id == cartObj[i].id) {
				cartObj[i].num += num;
				isExit = true;
			}
		}
		if(!isExit) {
			cartObj.push({ "id": id, "num": num });
		}
		//存cookie
		var str = JSON.stringify(cartObj);
		$.cookie("cart", str, { "expires": 7, "path": "/" });
	}

});
$(function(){
	var $pos = $('.scrollNav').offset().top - 0;

	$(window).on('scroll', function(){
		if($(window).scrollTop() >= $pos) {
			$('.scrollNav').addClass('scrollNav-fixed');
		} else {
			$('.scrollNav').removeClass('scrollNav-fixed');
		}
	});
});
$(function(){
	var shops = $.parseJSON($("#mapContainer").attr("data-map")).shops;
	var center = null;
	var map = null;
	var marker = null;
	var markers = [];
	
	center = new soso.maps.LatLng(shops[0].latitude, shops[0].longitude);
    map = new soso.maps.Map(document.getElementById('mapContainer'), {
        center:center,
        keyboardShortcuts : false,
        scrollwheel : false,
        zoom: 11
    });
    new soso.maps.NavigationControl({
        margin: new soso.maps.Size(-10, 10),
        map: map,
        style: soso.maps.NavigationControlStyle.SMALL
    });
    for (var i = 0; i < shops.length; i++) {
    	marker = new soso.maps.Marker({
            position: new soso.maps.LatLng(shops[i].latitude, shops[i].longitude),
            map: map,
            title:shops[i].name
        });
    	markers[shops[i].id] = marker;
    	marker.html = '<div style="width:200px;padding-top:10px;">' + 
		'<h2 class="f14">'+shops[i].name+'</h2>' +
		'<p>' + shops[i].address + '</p>' +
		'<p>' + shops[i].phone + '</p>' + 
		'</div>';
        soso.maps.event.addListener(marker, 'click', function() {
        	$("#bigMapContainer").show();
        	infoWin.open();
        	infoWin.setContent(this.html);
        	infoWin.setPosition(this.getPosition());
        	map.flyTo(this.getPosition(), 14);
        	$.layer({
        		type : 1,
        		title : ['',false],
        		fix : false,
        		offset:['50%' , '50%'],
        		area : ['auto','auto'],
        		shadeClose : true,
        		page : {dom : '#showBigMapContainer'}
        	});
        });
    }
    
    // 大图
    $("#bigMapContainer").width(750).height(500);
    center = new soso.maps.LatLng(shops[0].latitude, shops[0].longitude);
    map = new soso.maps.Map(document.getElementById('bigMapContainer'), {
        center:center,
        zoomLevel:15,
        zoom: 10
    });
    new soso.maps.MapTypeControl({map:map});
    new soso.maps.NavigationControl({
        align: soso.maps.ALIGN.TOP_LEFT,
        margin: new soso.maps.Size(5, 15),
        map: map
    });
    new soso.maps.ScaleControl({
        align: soso.maps.ALIGN.BOTTOM_RIGHT,
        margin: new soso.maps.Size(30, 15),
        map: map
    });
    var infoWin = new soso.maps.InfoWindow({
        map: map
    });
    for (var i = 0; i < shops.length; i++) {
    	marker = new soso.maps.Marker({
            position: new soso.maps.LatLng(shops[i].latitude, shops[i].longitude),
            map: map,
            title:shops[i].name
        });
    	marker.html = '<div style="width:200px;padding-top:10px;">' + 
    					'<h2 class="f14">'+shops[i].name+'</h2>' +
    					'<p class="f12 text333">' + shops[i].address + '</p>' +
    					'<p class="f12 text333">' + shops[i].phone + '</p>' +
    					'</div>';
        soso.maps.event.addListener(marker, 'click', function() {
        	infoWin.open();
        	infoWin.setContent(this.html);
        	infoWin.setPosition(this.getPosition());
        	map.panTo(this.getPosition());
        });
    }
    $("#viewBigMap").click(function(){
    	$.layer({
    		type : 1,
    		title : ['',false],
    		fix : false,
    		offset:['50%' , '50%'],
    		area : ['auto','auto'],
    		shadeClose : true,
    		page : {dom : '#showBigMapContainer'}
    	});
    });
    $(".shopShowMap").click(function(){
    	var self =  $(this);
    	var dataId = self.attr("data-id");
    	var marker = markers[dataId];
    	$("#bigMapContainer").show();
    	infoWin.open();
    	infoWin.setContent(marker.html);
    	infoWin.setPosition(marker.getPosition());
    	map.flyTo(marker.getPosition(), 14);
    	$.layer({
    		type : 1,
    		title : ['',false],
    		fix : false,
    		offset:['50%' , '50%'],
    		area : ['auto','auto'],
    		shadeClose : true,
    		page : {dom : '#showBigMapContainer'}
    	});
    });
    $(".shopShowRoute").attr("href", "http://map.soso.com/").attr("target", "_blank");
});


// 图片展示
$(function(){
	$("#detailImages li").mouseover(function(){
		$("#detailImages li").removeClass("selected");
		var self = $(this);
		self.addClass("selected");
		$("#detailBigImage").attr("src", $("img", self).attr("src"));
	}).eq(0).mouseover();
});

$(function(){
	/* $("#denominations strong").mouseover(function(){
		$("#denominations strong").removeClass("selected");
		var self = $(this);
		self.addClass("selected");
		var link = $("a", self);
		$("#denominationCondition").html(link.attr("data-condition"));
		$("#denominationRebates").html(link.attr("data-rebates")+" 元 ");
		
		$("#denominations").attr("data-selected", self.attr("data-denomination-id"));
		
	}).eq(0).mouseover(); */
	
	$("#addOne").click(function(){
		var howMany = $("#howMany");
		howMany.val(howMany.val()*1+1);
	});
	$("#subOne").click(function(){
		var howMany = $("#howMany");
		var val = howMany.val();
		if (val < 2) {
			howMany.val(1);
		} else {
			howMany.val(val*1-1);
		}
	});
	$("#howMany").keyup(function(event){
		var self = $(this);
		// Allow: backspace, delete, tab, escape, and enter
		if (event.keyCode == 8) {
			if (self.val() == "") {
				self.val(1);
				return ;
			}
		}
		if (event.ctrlKey == true || event.keyCode == 65 && event.ctrlKey === true) {
			self.select();
			return;
		}
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || 
             // Allow: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) || 
             // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39) || event.ctrlKey == true) {
                 // let it happen, don't do anything
            return;
        }
		
		var val = parseInt(self.val().replace(/[^\d]/g), '');
		if (val < 1) val = 1;
		self.val(val);
	});
});
/* $(document).ready(function(){
	var lis = $("#detailTop_roll li").bind("click", function(){
		var self = $(this);
		
		$("#denominationRebates").html(self.attr("data-rebates"));
		$("#denominationSold").html(self.attr("data-sold"));
		$("#denominationOver").html(self.attr("data-over"));
		$("#longTitle").html(self.attr("data-title"));
		
		var hNow = self.height();
		var roll = $("#detailTop_roll");
		var top = roll.css("top");
		top = top.substring(0, top.indexOf("px")) * 1;
		if(self.hasClass("active")){
			
		}else{
			if (self.prev().hasClass("active")) {
				roll.children("li.clearfix").removeClass("active");
				self.addClass("active");
				roll.animate({"top":top - hNow+"px"});
			} else if (self.next().hasClass("active")){
				roll.children("li.clearfix").removeClass("active");
				self.addClass("active");
				roll.animate({"top":top + hNow+"px"});
			}
			
		};
	});
	var size = lis.size();
	for (var i = 0; i < size; i++) {
		var li = lis.eq(i);
		var hNow = li.height();
		if (li.hasClass("active")) {
			var roll = $("#detailTop_roll");
			var top = roll.css("top");
			top = top.substring(0, top.indexOf("px")) * 1;
			roll.css("top", top + hNow+"px");
			break;
		} else {
			var roll = $("#detailTop_roll");
			var top = roll.css("top");
			top = top.substring(0, top.indexOf("px")) * 1;
			roll.css("top", top - hNow+"px");
		}
	}
}); */

$(function(){
	$('.carousel').carousel({interval:false}).bind("slid", function(){
		var next = $("#denominations strong.active");
		$("#denominationRebates").html(next.attr("data-rebates"));
		$("#denominationSold").html(next.attr("data-sold"));
		$("#denominationOver").html(next.attr("data-over"));
		$("#longTitle").html(next.attr("data-title"));
	});/* 
	$("[data-slide='next']").click(function(){
		var next = null;
		if (typeof($("#denominations strong.active").next().html()) != "undefined") {
			next = $("#denominations strong.active").next();
		} else {
			next = denominations.first();
		}
		$("#denominationRebates").html(next.attr("data-rebates"));
		$("#denominationSold").html(next.attr("data-sold"));
		$("#denominationOver").html(next.attr("data-over"));
		$("#longTitle").html(next.attr("data-title"));
	});
	$("[data-slide='prev']").click(function(){
		var prev = null;
		if (typeof($("#denominations strong.active").prev().html()) != "undefined") {
			prev = $("#denominations strong.active").prev();
		} else {
			prev = denominations.last();
		}
		$("#denominationRebates").html(prev.attr("data-rebates"));
		$("#denominationSold").html(prev.attr("data-sold"));
		$("#denominationOver").html(prev.attr("data-over"));
		$("#longTitle").html(prev.attr("data-title"));
	}); */
});

$(function(){
	var contentLength = 255;
	var commentsForm = $("#commentsForm");
	var commentContent = $("#commentContent");
	var errorInfo = $("#errorInfo");
	var validCode = $("#validCode");
	var commentSuggest = $("#commentSuggest");
	var submiting = false;
	commentsForm.submit(function(){return false;});
	$("#commentBtn").click(function(){
		var len = -1;
		len = commentContent.val().length;
		if (len == 0) {
			showError("多写点哟！");
			return;
		}
		if (len > contentLength) {
			showError("你想说的太多了噢，慢慢来重新组织下语言吧^_^");
			return;
		}
		var len = $.trim(validCode.val()).length;
		if (len == 0) {
			showError("验证码还没有输入哦^_^");
			return;
		}
		if (len != 4) {
			showError("验证码长度不对^_^");
			return;
		}
		if (submiting) {
			showError("你已经提交了哦。");
			return;
		}
		submiting = true;
		$.get(rootPath+"/check.oo", function(data){
			if (data && data.status != undefined) {
				if (data.status == true) {
					$.post(commentsForm.attr("action"),commentsForm.serialize(),function(data) {
						submiting = false;
						if (data) {
							if (data.status && data.status == "success") {
								commentContent.val("").keyup();
								validCode.val("");
								commentSuggest.val("");
								$(".validCodeImg").click();
								$("#loadComments").load(rootPath+"/comment/load.jhtml?cash.id="+$("#commentCashId").val());
							} else {
								if (data.fieldErrors) {
									var results = data.fieldErrors[0];
									showError(results);
								} else {
									showError("系统繁忙，请稍后再试。");
								}
							}
						} else {
							showError("系统繁忙，请稍后再试。");
						}
					});
				} else {
					alert("您还没有登录，请先登录");
					location.href = rootPath + "/login.jhtml";
				}
			} else {
				alert("系统升级中");
			}
		});
	});
	var wordCount = $("#wordCount");
	$("#commentContent").keyup(function(){
		wordCount.html(contentLength-$(this).val().length);
	});
	wordCount.html(contentLength);
	errorInfo.click(function(){
		$(this).hide();
	});
	function showError(info) {
		errorInfo.html(info).fadeIn(800).delay(1000).fadeOut(800);
	}
});

// 收藏代金券
$(function(){
	$("#addFavorite").click(function(){
		var self = $(this);
		$.get(rootPath+"/check.oo", function(data){
			if (data && data.status != undefined) {
				if (data.status == true) {
					var id = self.attr("data-id");
					$.post(rootPath + "/user/favorite/add.jhtml", {"cash.id":id}, function(data){
						if (data && data.status != undefined) {
							if (data.status == "success") {
								alert("已收藏");
							} else {
								alert("收藏失败了。");
							}
						}
					});
				} else {
					alert("您还没有登录，请先登录");
					location.href = rootPath + "/login.jhtml";
				}
			} else {
				alert("系统升级中");
			}
		});
	});
});
// 加入购物车
$(function(){
	$("#add2Cart").click(function(){
		var url = rootPath + (logined == true ? "/user/shopping/add.jhtml" : "/member/shopping.jhtml");
		var amount = $("#howMany").val();
		var denomination = $("#denominations strong").filter(".active").attr("data-denomination-id");
		$.post(url, { "shoppingItem.amount":amount, "shoppingItem.denomination.id":denomination}, function(data){
			if (!data) {
				jError('系统繁忙，请稍后再试',{autoHide : true,TimeShown : 2000, HorizontalPosition : 'center', VerticalPosition : 'center'});
				return;
			}
			if (data.status == "success") {
				//jSuccess('代金券已成功加入购物车！',{autoHide : true,TimeShown : 2000, HorizontalPosition : 'center', VerticalPosition : 'center'});
				$.layer({
					type : 2,
					title : '温馨提示',
					iframe : {src : rootPath + '/member/cart.jhtml?logined='+logined},
					shade : [0.1 , '#000' , true],
				    area : ['400px' , '186px'],
					offset : ['150px', ''],
					border : [6 , 0.3 , '#000', true],
					closeBtn : [1 , true],
					shadeClose :true,
					close : function(index){
						//layer.msg('您获得了子窗口标记：' + layer.getChildFrame('#name').val(),3,1);
						layer.close(index);
					}
				});
				return;
			}
			jError('系统繁忙，请稍后再试',{autoHide : true,TimeShown : 2000, HorizontalPosition : 'center', VerticalPosition : 'center'});
		});
	});
});
// 立即购买
$(function(){
	$("#buyNow").click(function(){
		var amount = $("#howMany").val();
		var denominationId =  $("#denominations strong").filter(".active").attr("data-denomination-id");
		buy(amount, denominationId);
		
	});
	$("#buyFast").click(function(){
		var amount = $("#howMany").val();
		var denominationId = $("#parValue").val();
		buy(amount, denominationId);
	});
	function buy(amount, denominationId) {
		var url = rootPath + (logined == true ? "/user/shopping/now.jhtml" : "/login.jhtml?referer=/user/shopping/now.jhtml");
		window.location.href = url + "?shoppingItem.denomination.id=" + denominationId + "&shoppingItem.amount=" + amount;
	}
});