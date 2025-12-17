const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Get the stored credentials from localStorage (set in signup page)
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if(!storedUsername || !storedPassword){
        alert("No account found. Please signup first.");
        return;
    }

    if(username === storedUsername && password === storedPassword){
        alert("Login Successful!");
        // Redirect to dashboard or home page
        // window.location.href = "dashboard.html";
    } else {
        alert("Invalid username or password");
    }
});
