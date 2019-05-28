$(document).ready(function() {
  loadThumbnails();

  $("div").on("click", "#thumbnailClick", function() {
    window.location.replace("/resource/id");
  });

  const $grid = $(".grid").masonry({
    itemSelector: ".grid-item",
    columnWidth: 200,
    gutter: 15
  });

  function createMainDisplay(resource) {
    const $link = $("<a>");
    $link.attr("href", `/resource/${resource.id}`);
    let $thumbnail = $("<div>");
    $thumbnail.attr("src", resource.thumbnail).attr("id", "thumbnailClick");
    $thumbnail.addClass("thumbnailImage");
    $thumbnail
      .addClass("thumbnail grid-item")
      .append(`<h2>${resource.title}</h2>`);
    const imageURL = resource.thumbnail;
    $thumbnail.css(
      "background",
      "url(" + imageURL + ")" + "center / cover no-repeat"
    );
    $link.append($thumbnail);
    $grid.masonry("prepended", $link);
    return $link;
  }

  function renderImages(resource) {
    $("#thumbnails").empty();
    let $thumbnails = $("#thumbnails");

    resource.forEach(function(images) {
      let $imageRender = createMainDisplay(images);

      $thumbnails.prepend($imageRender);
    });
  }

  function loadThumbnails() {
    $.ajax({
      type: "GET",
      url: "/resource",
      data: JSON,
      success: function(data) {
        console.log(data);
        renderImages(data);
      }
    });
  }

  $("#drop").change(function() {
    $.ajax({
      type: "GET",
      url: `/resource/category/${$("#drop option:selected").text()}`,
      data: JSON,
      success: function(data) {
        // console.log(data)
        renderImages(data);
        //renderImages(data,id);
      }
    });
  });
});
