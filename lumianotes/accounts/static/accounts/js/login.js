const popup = document.querySelector(".popup")

const passwordInputs = document.querySelectorAll('#login-form .password-container input');
const eyeButtons = document.querySelectorAll('#login-form .showEye');

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