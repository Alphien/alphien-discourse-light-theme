window.addEventListener("DOMContentLoaded", (event) => {
  var $blog = $("body.blog, body.blog-post, body.blog-sub-category");
  var $subscribeModal = $blog.find(".modal.subscribe");
  var $subscribeBtn = $blog.find(".btn-subscribe");
  var $blogSearch = $blog.find("#blog-search");
  var $blogLikeBtn = $blog.find(".btn-like").not('.liked');
  var prod = window.location.host === "forum.alphien.com";

  $blog.find($subscribeBtn).on("click", function(e) {
    if ($(this).hasClass("user")) {
      $subscribeModal.addClass("active");
    } else {
      if (prod) {
        window.location.href = "https://auth.alphien.com/?s=" + encodeURIComponent(window.location.href);
      } else {
        window.location.href = "https://beta-auth.alphien.com/?s=" + encodeURIComponent(window.location.href);
      }
    }
  });

  $subscribeModal.find(".modal.subscribe .modal-close").on("click", function(e) {
    $subscribeModal.removeClass("active");
  });

  $blog.on("click", function(e) {
    if ($(e.target).closest(".modal.subscribe .modal-content, .btn-subscribe").length == 0) {
      $subscribeModal.removeClass("active");
    }
  });

  $blog.find(".canvas p").each(function() {
    let $this = $(this);
    if ($this.html().replace(/\s|&nbsp;/g, "").length == 0) {
      $this.remove();
    }
  });

  $blogSearch.submit(function(e){
    e.preventDefault()
    var searchValue = $blogSearch.find("input").val();
    if (searchValue !== "") {
      var url = new URL(location.href);
      var search_params = url.searchParams;
      search_params.set("q", searchValue);
      url.search = search_params.toString();
      location.href = url.toString();
    }
  });

  $blog.find(".header-buttons a").each(function() {
    var linkHeader = $(this).attr("href");
    if (linkHeader && window.location.pathname.search(linkHeader) > -1 && linkHeader !== "/"){
       $(this).addClass("active");
    }
  });

  $blog.find(".tag-container .tag-list li a").each(function() {
    var linkTag = $(this).attr("href").substring(1);
    if (window.location.search.substring(1).search(linkTag) > -1){
      $(this).addClass("active");
    }
  });

  $blog.find($blogLikeBtn).on("click", function(e) {
    if ($(this).hasClass("user")) {
      const data = {
        "id": $(this).attr("post-id"),
        "post_action_type_id": 2,
        "flag_topic: false": false
      }
      $.ajax({
        type: "POST",
        url: "/post_actions",
        data,
        headers: {
          "X-CSRF-Token": $("meta[name=csrf-token]").attr("content")
        },
        returnXHR: true
      })
      .done(function() {
        $blogLikeBtn.addClass("liked");
        $blogLikeBtn.removeClass("user");
        $blogLikeBtn.attr("title", "you already liked this post");
        $blogLikeBtn.find("span").text("Liked");
        $blog.find($blogLikeBtn).off('click');
        const $likeValue = $blog.find(".like-meta-value");
        if ($likeValue) {
          const currentValue = parseInt($likeValue.text());
          const newValue = currentValue + 1;
          $likeValue.text(newValue);
        }
      })
      .fail(function() {
        $(".comment-button").after("<div style='color: #dd1144; margin-top: 5px;'>failed to like post</div>")
      })
    } else {
      if (prod) {
        window.location.href = "https://auth.alphien.com/?s=" + encodeURIComponent(window.location.href)
      } else {
        window.location.href = "https://beta-auth.alphien.com/?s=" + encodeURIComponent(window.location.href)
      }
    }
  });
});