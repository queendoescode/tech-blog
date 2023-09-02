
const postFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;

  if (title && body) {
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify( { title, body } ),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/dashboard`);
    } else {
      alert('There was a problem creating the post.');
    }
  }
};

const postForm = document.querySelector('#post-form');

if (postForm) {
  postForm.addEventListener('submit', postFormHandler);
}
