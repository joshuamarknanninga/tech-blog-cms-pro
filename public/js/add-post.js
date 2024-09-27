// public/js/add-post.js

document.getElementById('post-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const contents = document.getElementById('contents').value.trim();

    if (title && contents) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, contents }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to add post');
        }
    }
});
