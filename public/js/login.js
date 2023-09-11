const loginFormHandler = async (event) => {
  event.preventDefault();
  // Collect values from the login form
  const username = document.querySelector('#userNameLogin').value.trim();
  const password = document.querySelector('#passwordLogin').value.trim();
  if (!username || !password) {
    // Check if either name or password is missing
    alert('Please provide both a username and password.');
    return; // Exit the function early if data is missing
  }
  else {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);