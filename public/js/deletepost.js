const deletePostHandler = async (event) => {
    event.preventDefault();

    const id = document.querySelector('#edit-post-form').getAttribute('data-id');

    const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        console.error('failed to delete post')
    }
};

document.querySelector('#post-delete-button').addEventListener('click', deletePostHandler);