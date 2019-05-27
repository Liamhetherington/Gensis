$(document).ready(function() {
	// loadThumbnails();

 const $grid =$('.grid').masonry ({
    itemSelector: '.grid-item',
    columnWidth:200,
    gutter:15
  })

	function createMainDisplay(resource) {
		let $thumbnail = $("<div>");
		$thumbnail.addClass("thumbnail grid-item").append(`<h2>${resource.title}</h2>`);
    // let $title = $("<div>");
    // $title.addClass("title grid-item")
    const imageURL = resource.thumbnail;
    $thumbnail.css("background", "url(" + imageURL + ")" + "center / cover no-repeat");
    let $link = $('<a>').attr("href", `resource/${resource.id}`);
    $thumbnail.appendTo($link);
		$link.prependTo($('.container'));
		$grid.masonry( 'prepended', $link)
	}

$(() => {
  $.ajax({
    type: "GET",
    url: "/resource",
    }).done((resources) => {
      for(let resource of resources) {
        createMainDisplay(resource)
      }
    })
  })
});
