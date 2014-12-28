$(window).load(function(){

	var divs = $('#images > .image'),
		urls = [ ];

	var images = { };

	var load_images = function (urls, callback) {
		//console.log('zzz: ', urls);
		if (urls.length > 0) {
			var img = new Image();
			var url = urls.pop();
			img.src = url;

			if ($(img).prop('complete')) {
				var w = $(img).context.width, h = $(img).context.height;
				images[url] = { width: w, height: h, ratio: w/h };
				load_images(urls, callback);
			} else {
				$(img).load(function () {
					var w = $(img).context.width, h = $(img).context.height;
					images[url] = { width: w, height: h, ratio: w/h };

					load_images(urls, callback);
				});
			}
		} else {
			if (callback) {
				callback();
			}
		}
	};

	var resize_div_image_background = function () {
		var window_width = $(window).width();
		var window_heigth = $(window).height();

		divs.each(function (index) {


			
			var url = $(divs[index]).css('background-image').replace('url(','').replace(')','');
			
			var num_id = divs[index].id.replace("image_","");


			$(divs[index]).css({ backgroundSize: window_width + 'px auto', height: (window_width/images[url].ratio) + 'px' });
			
			$('#article_'+num_id).css({height: (window_width/images[url].ratio) + 'px' });

			//console.log(index + '-' +  num_id);


		});
	};

	for (var i = divs.length - 1; i >= 0; i--) {
		urls.push($(divs[i]).css('background-image').replace('url(','').replace(')',''));
	};

	load_images(urls, function () {
		//console.log(images);
		resize_div_image_background();
		$(window).resize(function() {
			resize_div_image_background();
		});

		
	});



$(".scroller").onepage_scroll({
   sectionContainer: "section", // sectionContainer accepts any kind of selector in case you don't want to use section
   easing: "ease", // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in", "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
   animationTime: 1000, // AnimationTime let you define how long each section takes to animate
   pagination: true, // You can either show or hide the pagination. Toggle true for show, false for hide.
   updateURL: false // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
});

});
