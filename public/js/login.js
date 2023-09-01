// TODO: REVIEW AND UPDATE TO OUR CODE

const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('There was a problem logging in.');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (username && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('There was a problem signing up.');
    }
  }
};

const loginForm = document.querySelector('#login-form');

if (loginForm) {
  loginForm.addEventListener('submit', loginFormHandler);
}

const signupForm = document.querySelector('#signup-form');

if (signupForm) {
  signupForm.addEventListener('submit', signupFormHandler);
}

