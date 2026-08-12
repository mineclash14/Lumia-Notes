const popup = document.querySelector(".popup")

const passwordInputs = document.querySelectorAll('#register-form .password-container input');
const eyeButtons = document.querySelectorAll('#register-form .showEye');

const usernameInput = document.getElementById("username");
const usernameContainer = document.querySelector(".username-container");
const usernameCheckIcon = usernameContainer?.querySelector(".fa-check");
const usernameErrorIcon = usernameContainer?.querySelector(".fa-xmark");

function mostrarPopup(message, type) {
    if (type == "success") {
        popup.style.backgroundColor = "#2ecc71"
    } else {
        popup.style.backgroundColor = ""
    }

    popup.textContent = message
    popup.classList.add("show")

    setTimeout(() => {
        popup.classList.remove("show")   
    }, 3000); 
}

eyeButtons.forEach((eye, index) => {

    eye.addEventListener('click', () => {

        const input = passwordInputs[index];

        if (input.type === 'password') {
            input.type = 'text';

            eye.classList.remove('fa-eye');
            eye.classList.add('fa-eye-slash');

        } else {
            input.type = 'password';

            eye.classList.remove('fa-eye-slash');
            eye.classList.add('fa-eye');
        }

    });

});

usernameInput.addEventListener("input", async () => {

    const username = usernameInput.value.trim();

    if (username.length === 0) {
        usernameContainer.classList.remove("valid", "invalid", "validating");
        return;
    }

    if (username.length < 4) {
        usernameContainer.classList.remove("valid");
        usernameContainer.classList.add("invalid");
        return;
    }

    usernameContainer.classList.remove("valid", "invalid");
    usernameContainer.classList.add("validating");

    try {
        const response = await fetch(`/accounts/check-username/?username=${encodeURIComponent(username)}`);
        const data = await response.json();

        usernameContainer.classList.remove("validating");


        if (data.exists) {
            usernameContainer.classList.remove("valid");
            usernameContainer.classList.add("invalid");
        } else {
            usernameContainer.classList.remove("invalid");
            usernameContainer.classList.add("valid");
        }

    } catch (error) {
        console.error("Erro ao verificar username:", error);
        usernameContainer.classList.remove("valid", "invalid", "validating");
    }
});