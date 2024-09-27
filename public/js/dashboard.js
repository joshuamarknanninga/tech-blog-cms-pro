// public/js/dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    // Modal functionality
    const modal = document.getElementById('post-modal');
    const btn = document.getElementById('new-post');
    const span = document.getElementsByClassName('close')[0];
    const postForm = document.getElementById('post-form');
    const modalTitle = document.getElementById('modal-title');
  
    let editPostId = null;
  
    if (btn) {
      btn.onclick = () => {
        modal.style.display = 'block';
        modalTitle.textContent = 'New Post';
        postForm.reset();
        editPostId = null;
      };
    }
  
    if (span) {
      span.onclick = () => {
        modal.style.display = 'none';
      };
    }
  
    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };
  
    // Handle post submission
    if (postForm) {
      postForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const title = document.getElementById('post-title').value.trim();
        const contents = document.getElementById('post-contents').value.trim();
  
        if (title && contents) {
          let response;
          if (editPostId) {
            // Update existing post
            response = await fetch(`/api/posts/${editPostId}`, {
              method: 'PUT',
              body: JSON.stringify({ title, contents }),
              headers: { 'Content-Type': 'application/json' },
            });
          } else {
            // Create new post
            response = await fetch('/api/posts', {
              method: 'POST',
              body: JSON.stringify({ title, contents }),
              headers: { 'Content-Type': 'application/json' },
            });
          }
  
          if (response.ok) {
            document.location.reload();
          } else {
            alert('Failed to save post.');
          }
        }
      });
    }
  
    // Handle edit and delete buttons
    const editButtons = document.querySelectorAll('.edit-post');
    editButtons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        event.preventDefault();
        const postId = button.getAttribute('data-id');
  
        const response = await fetch(`/api/posts/${postId}`, {
          method: 'GET',
        });
  
        if (response.ok) {
          const post = await response.json();
          modal.style.display = 'block';
          modalTitle.textContent = 'Edit Post';
          document.getElementById('post-title').value = post.title;
          document.getElementById('post-contents').value = post.contents;
          editPostId = post.id;
        } else {
          alert('Failed to fetch post.');
        }
      });
    });
  
    const deleteButtons = document.querySelectorAll('.delete-post');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        event.preventDefault();
        const postId = button.getAttribute('data-id');
  
        if (confirm('Are you sure you want to delete this post?')) {
          const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
          });
  
          if (response.ok) {
            document.location.reload();
          } else {
            alert('Failed to delete post.');
          }
        }
      });
    });
  });
  