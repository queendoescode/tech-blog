
const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#comment').value;
  const postId = document.querySelector('#post-id').value;

  if (comment) {
    const response = await fetch(`/api/post/${postId}`, {
      method: 'POST',
      body: JSON.stringify( { comment } ),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('There was a problem signing up.');
    }
  }
};

const commentForm = document.querySelector('#comment-form');

if (commentForm) {
  commentForm.addEventListener('submit', commentFormHandler);
}
