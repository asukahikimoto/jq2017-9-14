define(function(){
	return {
		checkName:function(val){
			var reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
			if( reg.test(val) ){
				return true;
			}else {
				return false;
			}
		},
		checkPwd : function(val){
			var reg = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
			if( reg.test(val) ){
				return true;
			}else {
				return false;
			}
		},
		isEqual :  function(val1,val2){
			if( val1 == val2 ){
				return true;
			}else{
				return false;
			}
		}
	}
})
