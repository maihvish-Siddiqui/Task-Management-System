const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  try {

    const response = await fetch(
      "https://task-management-system-o1r2.onrender.com/api/auth/login",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    if (response.ok) {

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",JSON.stringify(data.user)
        );

      window.location.href = "dashboard.html";

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.log(error);

  }
});