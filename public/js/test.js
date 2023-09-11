const newPostHandler = async (event) => {
    event.preventDefault();

    const postTitle = document.querySelector('#post-title').value.trim();
    const postText = document.querySelector('#post-text').value.trim();

    if (!!postTitle || !postText) {
        alert('Please provide both a title and text');
        return;
    } 
        const postData = {
            title: postTitle,
            entry: postText,
        };

    try {
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({ postData }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(postData)
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create post');
        }
    } catch {
        console.error('An error occurred:', error);
        // Handle any network or server errors here
        alert('An error occurred. Please try again later.');
    }
};

document
    .querySelector('.new-post')
    .addEventListener('submit', newPostHandler);