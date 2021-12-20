window.addEventListener("DOMContentLoaded", (event) => {
  var $blog = $("body.blog, body.blog-post, body.blog-sub-category");
  var $subscribeModal = $blog.find(".modal.subscribe");
  var $subscribeBtn = $blog.find(".btn-subscribe");
  var $blogSearch = $blog.find("#blog-search");

  $blog.find($subscribeBtn).on("click", function(e) {
    if ($(this).hasClass("user")) {
      $subscribeModal.addClass("active");
    } else {
      window.location.href = "/login"
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
      var url = new URL(location.href)
      var search_params = url.searchParams;
      search_params.set("q", searchValue);
      url.search = search_params.toString();
      location.href = url.toString();
    }
  });

  $blog.find(".header-buttons a").each(function() {
    var linkHeader = $(this).attr("href");
    if (window.location.pathname.search(linkHeader) > -1 && linkHeader !== "/"){
       $(this).addClass("active");
    }
  });

  $blog.find(".tag-container .tag-list li a").each(function() {
    var linkTag = $(this).attr("href").substring(1);
    if (window.location.search.substring(1).search(linkTag) > -1){
      $(this).addClass("active");
    }
  });
});