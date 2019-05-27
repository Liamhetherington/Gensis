$(document).ready(function() {
	// loadResource();
	// function createResourceElement(resource) {
	// 	let $title = $("#resource-title");
	// 	$title.text(resource.title);
	// 	let $thumbnail = $("#resource-media");
	// 	$thumbnail.attr("src", resource.thumbnail);
	// 	let $description = $("#description");
	// 	$description.text(resource.description);
	// 	let $date = $("#date");


	// 	console.log("resource: ", resource);
	// }

	// function renderResource(resource) {
	// 	$("<body>").empty();
	// 	let $currentResource = $("<body>");
	// 	resource.forEach(function(resourceInfo) {
	// 		let $resourceInfo = createResourceElement(resourceInfo);
	// 		$currentResource.append($resourceInfo);
	// 	});
	// }

	// function loadResource() {
	// 	$.ajax({
	// 		type: "GET",
	// 		url: "/resource",
	// 		data: JSON,
	// 		success: function(data) {
	// 			renderResource(data);
	// 		}
	// 	});
	// }

	// $.ajax({
	// 	type: "GET",
	// 	url: "/resource",
	// 	success: resource => {
	// 		createResourceElement(resource);
	// 	}
	// });
	// star rating function
	$(".rating > span").on("click", e => {
		let rating = $(e.target).attr("data-value");
		$(e.target)
			.parent()
			.attr("data-rating", rating);

		// console.log($(e.target).attr("data-value"));
	});
});
