async function handleSignup() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const error = document.getElementById("signupError");
  const success = document.getElementById("signupSuccess");

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
  // const users = JSON.parse(localStorage.getItem("users") || "{}");

  try {
    // بررسی ایمیل تکراری
    const res = await fetch(
      "https://687a55e7abb83744b7ec6d2e.mockapi.io/players"
    );
    const players = await res.json();

    const duplicate = players.find((user) => user.email === email);
    if (duplicate) {
      error.textContent = "This email is already registered. Please sign in.";
      return;
    }

    //save local
    // const newUser = { name, email, score: 0 };
    // localStorage.setItem("loggedInUser", JSON.stringify(newUser));

    //send to Api
    const createRes = await fetch(
      "https://687a55e7abb83744b7ec6d2e.mockapi.io/players",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          score: 0,
        }),
      }
    );

    if (!createRes.ok) throw new Error("Failed to save to API");

    const createdUser = await createRes.json();

    localStorage.setItem("user", JSON.stringify(createdUser));

    success.textContent = "Signup successful! Redirecting...";
    setTimeout(() => {
      window.location.href = "signin2.html";
    }, 2000);
  } catch (err) {
    console.error("Signup error:", err);
    error.textContent = "An error occurred during signup. Please try again.";
  }
}


