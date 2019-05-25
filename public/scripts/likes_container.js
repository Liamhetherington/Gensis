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
	$(".like").click(function() {
		likeResource;
	});
});
