$(document).ready(function() {
  loadThumbnails();


  function createMainDisplay(resource) {
    let $thumbnail = $("<img>");
    $thumbnail.attr("src", resource.thumbnail);
    $thumbnail.addClass("thumbnailImage");
    return $thumbnail;
  }

  function renderImages(resource) {
    $('#thumbnails').empty()
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
        console.log(data)
        renderImages(data);
      }
    });
  }

$("#drop").change(function () {
        //event.preventDefault();
         // $("input[value='category']").hide();
         // var id = $(this).attr('data-id');
         // $('#' + id).show(500);
//loadThumbnails($(`#dropdown`).val())
//  console.log("in dropdown")
//  console.log($( "#drop option:selected" ).text());
//  //console.log(1,$(this).text())
// // console.log(2,$(this).val())
//  //console.log(3,$(this).children(`.dropdown`).val())
// })
  $.ajax({
      type: "GET",
      url: `/resource/${$( "#drop option:selected" ).text()}`,
      data: JSON,
      success: function(data) {
        console.log(data)
        renderImages(data);
        //renderImages(data,id);
      }
    });
  })



});
/////////////////
/////////////
////////////////
//$(document).on('change',".drop", function(event) {


////////////////
//////////////
////////////////

// });



    //     var data = $(this).serialize();
    //     if ($('.empty').val() === "") {
    //         $(".error").slideDown()
    //         $(".error").text('tweet is empty')
    //         return false;
    //     } else if (data.length > 140) {
    //         $(".error").slideDown()
    //         $(".error").text('tweet content is too long')
    //          return false;
    //     } else {
    //         $(".error").slideUp()
    //         $.ajax({
    //             url: '/tweets',
    //             method: 'POST',
    //             data: data,
    //             success: loadTweets,
    //             error: function() {
    //                 console.log("error")
    //             }
    //         })
    //     }
    // });










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