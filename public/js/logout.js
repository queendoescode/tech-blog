// TODO: REVIEW AND UPDATE TO OUR CODE

const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};

const logoutLink = document.querySelector('#logout');

if (logoutLink) {
  logoutLink.addEventListener('click', async event => {
    event.preventDefault();
    await logout();
  });
}
