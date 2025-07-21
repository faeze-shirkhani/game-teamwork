function handleSignup() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const error = document.getElementById('signupError');
  const success = document.getElementById('signupSuccess');

  error.textContent = "";
  success.textContent = "";

  if (!name || !email || !password || !confirmPassword) {
    error.textContent = "All fields are required.";
    return;
  }

  if (password !== confirmPassword) {
    error.textContent = "Passwords do not match.";
    return;
  }

  // چک کردن تکراری نبودن ایمیل
  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (users[email]) {
    error.textContent = "This email is already registered. Please sign in.";
    return;
  }

  //save local
  users[email] = { name, password, score: 0 };
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("loggedInUser", email);

  //send to Api
  fetch("https://687a55e7abb83744b7ec6d2e.mockapi.io/players", { 
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      score: 0
    })
  })
  .then(res => {
    if (!res.ok) throw new Error("Failed to save to API.");
    return res.json();
  })
  .then(data => {
    success.textContent = "Signup successful! Redirecting to Sign In...";
    setTimeout(() => {
      window.location.href = "./signin2.html";
    }, 2000);
  })
  .catch(err => {
    console.error("API Error:", err);
    success.textContent = "Signup locally successful, but couldn't reach server.";
    setTimeout(() => {
      window.location.href = "./signin2.html";
    }, 3000);
  });
}

