const commentHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#newComment').value.trim();
    if (!comment) {
        alert('Please enter a comment');
        return;
    }
    const commentData = {
        entry: comment
    }
    console.log(comment);

    try {
        console.log('fetching new Post for comment')
        const response = await fetch(`/api/posts/comment`, {
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
    } catch {
        console.error('An error occurred:', error);
        // Handle any network or server errors here
        alert('An error occurred. Please try again later.');
    }
}
document
    .querySelector('.new-comment')
    .addEventListener('submit', commentHandler);