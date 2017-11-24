$(document).ready(function() {

	$('[data-slider-nav]').click(function(){
		var $this=$(this),
			$slider=$this.closest('[data-slider]'),
			$sliderWrap=$slider.find('[data-slider-wrap]'),
			direction=$this.attr('data-slider-nav'),
			$sliderPrev=$("[data-slider-nav=prev]"),
			$sliderNext=$("[data-slider-nav=next]"),
			current=$slider.attr("data-slider"); //определяем текущий слайдер


		if (!current) current=0;
		current=parseInt(current);
		if (direction=="next") {
			current+=1;
		} else {
			current-=1;
		}
		$slider.attr("data-slider", current);
		$sliderWrap.css("left",current*-100+"%");

		$sliderPrev.removeAttr("disabled");
		$sliderNext.removeAttr("disabled");

		// конец левого слайда
		if (current==0) $sliderPrev.attr("disabled","disabled");

		// конец правого слайда
		if (current==($sliderWrap.find(".slide").length-1)) $sliderNext.attr("disabled","disabled");
	});
	
});