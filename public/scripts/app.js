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
	let $resource = $("<article>");
	let $footer = $("<footer>");
	let $content = $("<div>").attr("src", resource.url);
	return $content;
}

$(document).ready(function() {
	createResourceElement();
	// console.log("ready")
});
