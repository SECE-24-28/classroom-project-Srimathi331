const signupUsername = document.getElementById("signupUsername");
const signupPassword = document.getElementById("signupPassword");
const signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", () => {
    const username = signupUsername.value.trim();
    const password = signupPassword.value.trim();

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    // Save username and password in localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("Signup successful! You can now login.");
    
    // Redirect to login page
    window.location.href = "login.html";
});
