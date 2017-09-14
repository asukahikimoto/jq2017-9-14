//动态生成页面数据
	$(window).load(function() {
		$.ajax({
			type: "get",
			url: "json/_json.json",
			success: function(data) {
				var html = "";
				for(var i in data) {
					html += `<li><span class='icons iLabel block mt10 ml10 tl h25 white'>${data[i]}</span><a target='_blank' href='productionDetail.html?id='${data[i].id}><img src=${data[i].src}.jpg ></li>`
					//html += "<li><span class='icons iLabel block mt10 ml10 tl h25 white'>data[i]</span><a target='_blank' href='productionDetail.html?id=" + data[i].id + "'><img src='" + data[i].src +".jpg"+ "' ></a><a target='_blank' href='productionDetail.html?id=" + data[i].id + "' /></a></li>"
				}

				$(".duonaSale_ul").html(html);
			}
		})

	})