// loadThumbnails();

$(document).ready(function() {
	loadThumbnails();
	// $.ajax({
	// 	type: "GET",
	// 	url: "/resource",
	// 	success: resource => {
	// 		createMainDisplay(resource);
	// 	}
	// });

	function createMainDisplay(resource) {
		let $thumbnail = $("<img>");
		$thumbnail.attr("src", resource.thumbnail);
		$thumbnail.addClass("thumbnailImage");
		return $thumbnail;
	}

	function renderImages(resource) {
		let $thumbnails = $("#thumbnails");
		console.log($thumbnails);
		console.log(resource);
		resource.forEach(function(images) {
			let $imageRender = createMainDisplay(images);
			console.log($imageRender);
			$thumbnails.append($imageRender);
		});
	}

	function loadThumbnails() {
		$.ajax({
			type: "GET",
			url: "/resource",
			data: JSON,
			success: function(data) {
				renderImages(data);
			}
		});
	}
});
