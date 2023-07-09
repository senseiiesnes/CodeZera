{
  // Method to submit the form data for new post using AJAX
  createPost = () => {
    let newPostForm = $("#new-post-form");
    newPostForm.submit((e) => {
      e.preventDefault();
      $.ajax({
        type: "post",
        url: "/posts/create/",
        data: newPostForm.serialize(),
        success: (data) => {
          let newPost = newPostDom(data.data.post);
          $("#posts-list-container>ul").prepend(newPost);
        },
        error: (err) => {
          console.log(err.responseText);
        },
      });
    });
  };
  //   Method to create a post in DOM
  let newPostDom = (post) => {
    return $(`<li id="post-${post._id}">
                <p>
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post.id}"
                    >Delete</a
                    > </small
                ><br />
                 ${post.content}
                <br />
                <strong> ${post.user.name} </strong>
                </p>
                <div class="post-comments">
                <form action="/comments/create" method="post">
                    <input
                    type="text"
                    name="content"
                    placeholder="Type Here to add comment..."
                    required
                    />
                    <input type="hidden" name="post" value="${post._id}" />
                    <input type="submit" value="Add Comment" />
                </form>
                <div class="post-comments-list">
                    <ul id="post-comments-${post._id}">
                    
                    </ul>
                </div>
                </div>
            </li>
  `);
  };

  createPost();
}
