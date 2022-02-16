// Function to connect comment form with back end
const commentHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#comment-input').value.trim();
    const post_id = document.querySelector('#comment-form').getAttribute('data-id');

    if (content) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                content,
                post_id,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();

        } else {
            alert('failed to post comment')
        }
    }
};

document.querySelector('#comment-form').addEventListener('submit', commentHandler);

