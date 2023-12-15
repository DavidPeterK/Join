let registerBtn = document.getElementById('signUpButton');
let checkbox = document.getElementById("checkPrivacyPolicy");


function renderSignUp() {
    let signUpTop = document.getElementById('signSectionTop');
    let signUpBottom = document.getElementById('signSectionBottom');
    contentBox.innerHTML = signUpHtml();
    signUpTop.innerHTML = '';
    signUpBottom.innerHTML = '';
}

/**
 * Validates user inputs, checks for email duplicates, and proceeds with the registration process.
 */
async function registUser() {
    if (!arePasswordsMatching()) return handlePasswordMismatch();
    if (user.some(u => u.email === emailControl.value)) return handleEmailExists();
    if (checkbox.checked) await handleRegistration();
}

/**
 * Handles a scenario when the entered email already exists in the system.
 */
function handleEmailExists() {
    document.getElementById('inputEmail').classList.add("red-border");
    document.getElementById('warning-email').classList.remove("d-none");
    resetForm();
}

/**
 * Registers a new user, saves the user's data, and redirects to the homepage after successful registration.
 */
async function handleRegistration() {
    registerBtn.disabled = true;
    user.push({
        name: userName.value,
        email: email.value,
        password: password.value,
    });
    await setItem('userGroup698', JSON.stringify(user));
    changesSaved('You Signed Up successfully');
    setTimeout(() => {
        switchContent('signIn');
    }, 3000);
}

/**
 * Checks if the entered password and confirmation password are matching.
 */
function arePasswordsMatching() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    return password === confirmPassword;
}

/**
 * Handles a scenario when entered passwords don't match.
 */
function handlePasswordMismatch() {
    loadRedBorderPassword();
    loadWarningTextTamplate();
}

/**
 * Highlights password fields in red.
 */
function loadRedBorderPassword() {
    let inputIds = ["inputPassword", "inputConfirmPassword"];
    for (let id of inputIds) {
        document.getElementById(id).classList.add("red-border");
    }
}

/**
 * Displays warning messages for password fields.
 */
function loadWarningTextTamplate() {
    let warningIds = ["warning-password", "warning-confirmPassword"];
    for (let id of warningIds) {
        document.getElementById(id).classList.remove("d-none");
    }
}

/**
 * Resets the registration form by clearing inputs and enabling the register button.
 */
function resetForm() {
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    registerBtn.disabled = false;
}
