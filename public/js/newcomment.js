const commentHandler = async (event) => {
    event.preventDefault();

    const currentPath = window.location.pathname;
    const postIdMatch = currentPath.match(/\/post_view\/(\d+)/)
    const postId = postIdMatch[1]
    const apiUrl = `/api/posts/post_view/${postId}`;

    const comment = document.querySelector('#newComment').value.trim();

    
    if (!comment) {
        alert('Please enter a comment');
        return;
    }
    const commentData = {
        entry: comment,
    }
   
    try {
        console.log('fetching new Post for comment')
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify( commentData ),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response);
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create comment');
        }
    } catch(e) {
        console.error('An error occurred:', e);
        // Handle any network or server errors here
        alert('An error occurred. Please try again later.');
    }
}
document
    .querySelector('.new-comment')
    .addEventListener('submit', commentHandler);