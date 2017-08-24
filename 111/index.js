var mobile_timeout;
var mobile_count = 100;
var mobile_lock = 0;
 //根据IP获取城市

$(function () {
    function getCityByIP(rs) {
    var cityName = rs.name;
    localStorage.setItem('city',cityName);
}
    var myCity = new BMap.LocalCity();
    myCity.get(getCityByIP);

	$("#m_zcyz").click(function () {
		if (!$("#mobile").val()) {
			alert("请输入手机号")
		}
		else if (mobile_lock == 0) {
			mobile_lock = 1;
			$.ajax({
				url: '/api/v2/vcode',
				data: 'type=1&to=' + $("#mobile").val(),
				type: 'post',
				success: function (data) {
					if (data.response.success == 1) {
						mobile_count = 60;
						$(".m_zcyz").addClass("on");
						$('#m_zcyz').attr("disabled", "disabled");
						BtnCount();
					} else {
						mobile_lock = 0;
						alert(data.response.return_code);
					}
				}
			});
		}
	});

	$("#sub_reg").click(function () {
	    var city = localStorage.getItem("city");
	    if (!city) {
			city = ""
		}
		if (!$("#login_name").val()|| $("#mobile").val().length!=11) {
			alert("用户名为手机号")
		}
		else if (!$("#mobile").val()|| $("#mobile").val().length!=11) {
			alert("请输入正确的手机号")
		}
		else if (!$("#nick_name").val()) {
			$("#nick_name").val($("#mobile").val())
		}
		else if (!$("#vcode").val()) {
			alert("请获取验证码")
		}
		else if (!$("#password").val()) {
			alert("请输入密码")
		}
		else if ($("#password2").val()!=$("#password").val()) {
			alert("两次密码不一致")
		}
		else{
			$.ajax({
				url: '/api/v2/user/register',
				data: 'login_name=' + encodeURIComponent($("#login_name").val())+
					"&password=" + $("#password").val()+
					"&vcode=" + $("#vcode").val()+
					"&nick_name=" + encodeURIComponent($("#nick_name").val())+
					"&mobile=" + $("#mobile").val()+
                    "&city=" + encodeURIComponent(city)+
					"&user_type=" + $("#user_type").find("option:selected").val()+
					"&inviter=" + $("#inviter").val(),
				type: 'post',
				success: function (data) {
					if (data.response.success == 1) {
						alert("注册成功");
						if ($("#user_type").find("option:selected").val() == 100){
							window.location.href = "https://www.pgyer.com/elN3"
						}else{
							window.location.href = "http://shengyijiecn.com/syj_manager/app/index.html"
						}

					} else {
						alert(data.response.return_code);
					}
				}
			});
		}
	});



$('.as').click(function(){
	$(".box").css({'display':'block'})

});
$(".back").click(function(){
	$(".box").css({'display':'none'})
	    
});
$("#agrees").click(function(){
	$(".box").css({'display':'none'})
	
});




});
BtnCount = function () {
	if (mobile_count == 0) {
		$(".m_zcyz").removeClass("on");
		$('#m_zcyz').removeAttr("disabled");
		$('#m_zcyz').html("重新发送");
		mobile_lock = 0;
		clearTimeout(mobile_timeout);
	}
	else {
		mobile_count--;
		$('#m_zcyz').html("获取(" + mobile_count.toString() + ")秒");
		mobile_timeout = setTimeout(BtnCount, 1000);
	}
};


Checkbox = function () {
	if ($("#checkbox").is(':checked')) {
			$('#sub_reg').removeAttr("disabled");
				$('.as').css({"color": "#333333"})
		}else{
			$('#sub_reg').attr("disabled", "disabled");
			 $('.as').css({"color": "red"});
	
		
		}
	
};
