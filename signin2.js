function handleSignIn() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const error = document.getElementById('signInError');
  const success = document.getElementById('signInSuccess');

  error.textContent = "";
  success.textContent = "";

  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (!users[email]) {
    error.textContent = "Email not found. Please sign up first.";
    return;
  }

  if (users[email].password !== password) {
    error.textContent = "Wrong password. Try again.";
    return;
  }

  success.textContent = "Signed in successfully! Redirecting...";
  localStorage.setItem("loggedInUser", email);

  setTimeout(() => {
    window.location.href = "signin2.html"; 
  }, 2000);
}
