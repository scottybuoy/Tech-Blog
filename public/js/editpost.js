const editPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#edit-post-title').value.trim();
    const content = document.querySelector('#edit-post-content').value.trim();
    const id = document.querySelector('#edit-post-form').getAttribute('data-id');

   

    const response = await fetch(`/api/post/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        console.error('failed to update post')
    }

};

document.querySelector('#edit-post-form').addEventListener('submit', editPostHandler);