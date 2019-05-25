$(document).ready(function() {
	loadThumbnails();
	// $.ajax({
	// 	type: "GET",
	// 	url: "/resource",
	// 	success: resource => {
	// 		createMainDisplay(resource);
	// 	}
	// });

	$("div").on("click", "#thumbnailClick", function() {
		window.location.replace("/info");
	});

	function createMainDisplay(resource) {
		let $thumbnail = $("<img>");
		$thumbnail.attr("src", resource.thumbnail).attr("id", "thumbnailClick");
		$thumbnail.addClass("thumbnailImage");
		return $thumbnail;
	}

	function renderImages(resource) {
		let $thumbnails = $("#thumbnails");
		resource.forEach(function(images) {
			let $imageRender = createMainDisplay(images);
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
