document
    .querySelector('.edit_form')
    .addEventListener('submit', async (event) => {
        const currentURL = window.location.href;
        const urlSegments = new URL(currentURL).pathname.split('/');
        const postId = urlSegments[urlSegments.length - 1]; // Get the last segment

        const apiURL = `/api/posts/post_edit/${postId}`

        const clickedButton = event.submitter;
        const action = clickedButton.getAttribute('data-action');
        if (action === 'delete') {
            const response = await fetch(apiURL, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                console.log(response);
                document.location.replace('/dashboard')
            } else {
                alert(response.statusText);
            }
        }
    })