$("#inputEmail").blur(function() {
	var reg = /^1[3|5|7|8]\d{9}$/; //以13，15，17,18开头的十一位数字
	var str = $(this).val();
	if(str == "") {
		$(this).next(".help-block").html("请输入正确的手机号");
		flag5 = false;
	} else if(!reg.test(str)) {
		$(this).css("border", "1px solid red");
		$(this).next(".help-block").html("手机号格式有误");
		$(this).val("");
		flag5 = false;
	} else {
		$(this).next(".help-block").html("手机号格式正确");
		$(this).css("border", "1px solid green");
		flag5 = true;
	}
});
//密码判断
$("#inputPassword").keyup(function() {
	var val = $(this).val();
	var lv = 0;
	if(val.match(/[a-z]/g)) { lv++; }
	if(val.match(/[0-9]/g)) { lv++; }
	if(val.match(/(.[^a-z0-9])/g)) { lv++; }
	if(val.length < 6) { lv = 0; }
	if(val == "") {
		$(this).next(".help-block").html("密码不能为空");
		flag2 = false;
	} else {
		switch(lv) {
			case 0:
				$(this)//密码判断
$("#inputPassword").keyup(function() {
	var val = $(this).val();
	var lv = 0;
	if(val.match(/[a-z]/g)) { lv++; }
	if(val.match(/[0-9]/g)) { lv++; }
	if(val.match(/(.[^a-z0-9])/g)) { lv++; }
	if(val.length < 6) { lv = 0; }
	if(val == "") {
		$(this).next(".help-block").html("密码不能为空");
		flag2 = false;
	} else {
		switch(lv) {
			case 0:
				$(this)//密码判断
$("#inputPassword").keyup(function() {
	var val = $(this).val();
	var lv = 0;
	if(val.match(/[a-z]/g)) { lv++; }
	if(val.match(/[0-9]/g)) { lv++; }
	if(val.match(/(.[^a-z0-9])/g)) { lv++; }
	if(val.length < 6) { lv = 0; }
	if(val == "") {
		$(this).next(".help-block").html("密码不能为空");
		flag2 = false;
	} else {
		switch(lv) {
			case 0:
				$(this).next(".help-block").html("请输入至少六个字符");
				$(this).css({ "border": "1px solid #f00" });
				flag2 = false;
				break;
			case 1:
				$(this).next(".help-block").html("密码强度弱");
				$(this).css({ "border": "1px solid #f99" });
				flag2 = true;
				break;
			case 2:
				$(this).next(".help-block").html("密码强度中");
				$(this).css({ "border": "1px solid #3bb41a" });
				flag2 = true;
				break;
			case 3:
				$(this).css({ "border": "1px solid green" });
				$(this).next(".help-block").html("密码强度强");
				flag2 = true;
		}
	}

}).html("请输入至少六个字符");
				$(this).css({ "border": "1px solid #f00" });
				flag2 = false;
				break;
			case 1:
				$(this).next(".help-block").html("密码强度弱");
				$(this).css({ "border": "1px solid #f99" });
				flag2 = true;
				break;
			case 2:
				$(this).next(".help-block").html("密码强度中");
				$(this).css({ "border": "1px solid #3bb41a" });
				flag2 = true;
				break;
			case 3:
				$(this).css({ "border": "1px solid green" });
				$(this).next(".help-block").html("密码强度强");
				flag2 = true;
		}
	}

}).html("请输入至少六个字符");
				$(this).css({ "border": "1px solid #f00" });
				flag2 = false;
				break;
			case 1:
				$(this).next(".help-block").html("密码强度弱");
				$(this).css({ "border": "1px solid #f99" });
				flag2 = true;
				break;
			case 2:
				$(this).next(".help-block").html("密码强度中");
				$(this).css({ "border": "1px solid #3bb41a" });
				flag2 = true;
				break;
			case 3:
				$(this).css({ "border": "1px solid green" });
				$(this).next(".help-block").html("密码强度强");
				flag2 = true;
		}
	}

});
$("#inputPassword").next().blur(function() {
	if(flag2) {
		if($(this).val() !== $(this).next(".help-block").val()) {
			$(this).css("border", "1px solid red");
			$(this).next(".help-block").html("两次密码不一致，请重新输入");
			$(this).val("");
			flag3 = false;
		} else {
			$(this).next(".help-block").html("密码输入一致");
			$(this).css("border", "1px solid green");
			$(this).prev().css("border", "1px solid green");
			flag3 = true;
		}
	}
});