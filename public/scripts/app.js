// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

function createResourceElement(resource) {
	let $title = $("#resource-title");
	$title.text(resource.title);
	let $object = $("<object>");
	let $footer = $("<footer>");
	let $content = $("<div>").attr("src", resource.url);
	console.log(resource.url);
	return $content;
}

function likeResource(user_id, resource_id) {
	$.ajax({
		type: "POST",
		url: "/likes",
		data: { user: "user_id", resource: "resource_id" },
		success: resource => {
			createResourceElement(resource);
		}
	});
}

$(document).ready(function() {
	$.ajax({
		type: "GET",
		url: "/resource",
		success: resource => {
			createResourceElement(resource);
		}
	});
});
