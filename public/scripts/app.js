function createResourceElement(resource) {
  let $title = $('#resource-title');
    $title.text(resource.title);

  // let $object= $('#resource-media');
  //   $object.find(resource.url);
  let $description = $('#description');
    $description.text(resource.description);
  let $date = $('#date');
    $date.text(resource.date_created);
  console.log("description: ", resource.desciption);
}

function renderResource(resource) {
  $('<body>').empty();
  let $currentResource = $('<body>');
  resource.forEach(function (resourceInfo) {
    let $resourceInfo = createResourceElement(resourceInfo)
    $currentResource.append($resourceInfo)
  })
}

function loadResource() {
  $.ajax({
    type:"GET",
    url:'/resource',
    data: JSON,
    success: function (data) {
      renderResource(data)
    }
  })
}
loadResource();

$(document).ready(function() {
  $.ajax({
    type:'GET',
    url: '/resource',
    success: resource => {
      createResourceElement(resource);
    }
  });
})

