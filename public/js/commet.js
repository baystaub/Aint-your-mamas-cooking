
const commentHandler = async (event) => {
    event.preventDefault();

    const currentRecipe_id = window.location.href.split('/')
    [window.location.href.toString().split('/').length - 1];
    const comment = document.querySelector('#comment-input').value.trim();
    if (comment) {
        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({ currentRecipe_id, comment, }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};