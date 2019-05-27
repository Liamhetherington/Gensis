function createComment(comments) {
  let $comment = $("<p>");
  $comment.text(comments.comment);
  return $comment;
}

function renderComments(comments) {
  $(".existing-comments").empty();
  let $newComment = $(".existing-comments");
  comments.forEach(function(comment) {
    let $post = createComment(comment);
    $newComment.prepend($post);
  });
}

function loadComments() {
  $.ajax({
    type: "GET",
    url: "/comments",
    data: JSON,
    success: function(data) {
      renderComments(data);
    }
  });
}
