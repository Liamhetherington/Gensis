$(document).ready(function() {
	loadThumbnails();

	$("div").on("click", "#thumbnailClick", function() {
		window.location.replace("/resource/id");
	});

	function createMainDisplay(resource) {
		const $link = $("<a>");
		$link.attr("href", `/resource/${resource.id}`);
		let $thumbnail = $("<img>");
		$thumbnail.attr("src", resource.thumbnail).attr("id", "thumbnailClick");
		$thumbnail.addClass("thumbnailImage");
		$link.append($thumbnail);
		return $link;
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

// 1. before setting handler, get resource(id), use template string to put it into the url, info page pass the resource data in with the template vars, using req.params.resource id
