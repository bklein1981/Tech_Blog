document
    .querySelector('.edit_form')
    .addEventListener('submit', async (event) => {
        const currentURL = window.location.href;
        const urlSegments = new URL(currentURL).pathname.split('/');
        const postId = urlSegments[urlSegments.length - 1]; // Get the last segment

        const apiURL = `/api/posts/post_edit/${postId}`

        const clickedButton = event.submitter;
        const action = clickedButton.getAttribute('data-action');
        if (action === 'update') {
            const title = document.getElementById('inputPostTitle').value.trim();
            const entry = document.getElementById('inputEdit').value.trim();
            const response = await fetch(apiURL, {
                method: 'PUT',
                body: JSON.stringify({ title, entry }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                document.location.replace('/dashboard')
            } else {
                alert(response.statusText);
            }
        }
    })