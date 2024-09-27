// public/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // Logout
    const logout = document.getElementById('logout');
    if (logout) {
      logout.addEventListener('click', async () => {
        const response = await fetch('/api/users/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert('Failed to log out.');
        }
      });
    }
  
    // Handle comment submission
    const commentForm = document.getElementById('comment-form');
    if (commentForm) {
      commentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const contents = document.getElementById('comment-content').value.trim();
        const postId = window.location.pathname.split('/post/')[1];
  
        if (contents) {
          const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ contents, post_id: postId }),
            headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.ok) {
            document.location.reload();
          } else {
            alert('Failed to add comment.');
          }
        }
      });
    }
  });
  