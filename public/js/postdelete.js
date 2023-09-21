document
    .querySelector('.edit_form')
    .addEventListener('submit', async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const currentURL = window.location.href;
        const urlSegments = new URL(currentURL).pathname.split('/');
        const postId = urlSegments[urlSegments.length - 1];

        const apiURL = `/api/posts/post_edit/${postId}`

        const clickedButton = event.submitter;
        const action = clickedButton.getAttribute('data-action');
        if (action === 'delete') {
            const response = await fetch(apiURL, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            const statusCode = response.status;
            console.log(response)
            if (statusCode === 200) {
                console.log('line 18 response received');
                document.location.replace('/dashboard')
            }
            else {
                alert(response.statusText);
            }
        }
    })