async function handleSignIn() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const error = document.getElementById("signInError");
  const success = document.getElementById("signInSuccess");

  error.textContent = "";
  success.textContent = "";

  //   const users = JSON.parse(localStorage.getItem("users") || "{}");
  try {
    const res = await fetch(
      "https://687a55e7abb83744b7ec6d2e.mockapi.io/players"
    );
    const players = await res.json();
    const user = players.find((user) => user.email === email);
    if (!user) {
      error.textContent = "Email not found. Please sign up first.";
      return;
    }
    if (user.password !== password) {
      error.textContent = "Wrong password. Try again.";
      return;
    }

    localStorage.setItem("loggedInUser", user.id);
    success.textContent = "Signin successful! Redirecting...";

    setTimeout(() => (window.location.href = "home.html"), 1000);
  } catch (err) {
    console.error(err);
    error.textContent = "Server error, try later.";
  }
}
