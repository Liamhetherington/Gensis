$(document).ready(function() {
  loadThumbnails();


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













// jQuery.fn.filterByText = function(textbox) {
//   return this.each(function() {
//     var select = this;
//     var options = [];
//     $(select).find('option').each(function() {
//       options.push({
//         value: $(this).val(),
//         text: $(this).text()
//       });
//     });
//     $(select).data('options', options);

//     $(textbox).bind('change keyup', function() {
//       var options = $(select).empty().data('options');
//       var search = $.trim($(this).val());
//       var regex = new RegExp(search, "gi");

//       $.each(options, function(i) {
//         var option = options[i];
//         if (option.text.match(regex) !== null) {
//           $(select).append(
//             $('<option>').text(option.text).val(option.value)
//           );
//         }
//       });
//     });
//   });
// };


// $(function() {
//   $('select').filterByText($('input'));
// });


// *every time choose a topic, empty container(twetter)