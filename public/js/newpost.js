const newPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#new-post-title').value;
    const content = document.querySelector('#new-post-content').value;
    console.log('*****************');
    console.log(title + " " + content);
    if ( title && content) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({
                title,
                content,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            console.error('failed to make new post')
        }
    }
};

document.querySelector('#new-post-form').addEventListener('submit', newPostHandler);