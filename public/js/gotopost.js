const newPostBut = document.getElementById('new-post');

newPostBut.addEventListener('click', function () {
    const newPostUrl = '/new_posts'
    window.location.href = newPostUrl;
});