const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#userNameSignUp').value.trim();
    const password = document.querySelector('#passwordSignUp').value.trim();

    if (!name || !password) {
        // Check if either name or password is missing
        alert('Please provide both a username and password.');
        return; // Exit the function early if data is missing
    }

    const userData = {
        user_name: name,
        password: password,
    };
    

    try {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ userData }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(userData)
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Signup failed. Please check your input.');
        }
    } catch {
        console.error('An error occurred:', error);
        // Handle any network or server errors here
        alert('An error occurred. Please try again later.');
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);