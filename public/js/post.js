
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

const updateFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const postId = document.querySelector('#post-id').value;

  if (title && body) {
    const response = await fetch(`/api/post/${postId}`, {
      method: 'PUT',
      body: JSON.stringify( { title, body } ),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/dashboard`);
    } else {
      alert('There was a problem updating the post.');
    }
  }
};

const deleteFormHandler = async (event) => {
  event.preventDefault();

  const postId = document.querySelector('#post-id').value;

  const response = await fetch(`/api/post/${postId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    document.location.replace(`/dashboard`);
  } else {
    alert('There was a problem deleting the post.');
  }
};

const postForm = document.querySelector('#post-form');

if (postForm) {
  postForm.addEventListener('submit', postFormHandler);
}

const updatePostForm = document.querySelector('#update-post-form');

if (updatePostForm) {
  updatePostForm.addEventListener('submit', updateFormHandler);
}

const deletePostForm = document.querySelector('#delete-post-form');

if (deletePostForm) {
  deletePostForm.addEventListener('submit', deleteFormHandler);
}
