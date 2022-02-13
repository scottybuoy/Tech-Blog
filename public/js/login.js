const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    if (email && password) {
        const response = await fetch("/api/user/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Failed to Log In");
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#signup-username-input').value.trim();
    const email = document.querySelector('#signup-email-input').value.trim();
    const password = document.querySelector('#signup-password-input').value.trim();

    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('signup fail');
        }
    }
};

document
  .querySelector('#form-login')
  .addEventListener('submit', loginFormHandler);

  document
    .querySelector('#form-signup')
    .addEventListener('submit', signupFormHandler);