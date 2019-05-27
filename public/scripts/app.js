$(document).ready(function() {
	$(".rating > span").on("click", e => {
		let rating = $(e.target).attr("data-value");
		$(e.target)
			.parent()
			.attr("data-rating", rating);
	});

	let unformatedDate = $("#date").text();
	$("#date").text(moment(unformatedDate).format("MMMM DD, YYYY"));
});
