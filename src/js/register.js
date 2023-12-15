let registerBtn;
let confirmPassword;

function initRegisterContainer() {
    registerBtn = document.getElementById('signUpButton');
    confirmPassword = document.getElementById('confirmPassword');
    checkbox = document.getElementById("checkPrivacyPolicy");
}

function renderSignUp() {
    initRegisterContainer();
    contentBox.innerHTML = signUpHtml();
    signUpButtonTop.innerHTML = '';
    signUpButtonBottom.innerHTML = '';
}

/**
 * Validates user inputs, checks for email duplicates, and proceeds with the registration process.
 */
async function registUser() {
    if (!arePasswordsMatching()) return handlePasswordMismatch();
    if (user.some(u => u.email === email.value)) return handleEmailExists();
    if (checkbox.checked) await handleRegistration();
}

/**
 * Checks if the entered password and confirmation password are matching.
 */
function arePasswordsMatching() {
    return password.value === confirmPassword.value;
}

/**
 * Handles a scenario when the entered email already exists in the system.
 */
function handleEmailExists() {
    document.getElementById('inputEmail').classList.add("red-border");
    document.getElementById('warning-email').classList.remove("d-none");
    setTimeout(() => {
        document.getElementById('inputEmail').classList.remove("red-border");
        document.getElementById('warning-email').classList.add("d-none");
    }, 4000);
}

//------------Password mismatch--------------//
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
        setTimeout(() => {
            document.getElementById(id).classList.remove("red-border");
        }, 4000);
    }
}

/**
 * Displays warning messages for password fields.
 */
function loadWarningTextTamplate() {
    let warningIds = ["warning-password", "warning-confirmPassword"];
    for (let id of warningIds) {
        document.getElementById(id).classList.remove("d-none");
        setTimeout(() => {
            document.getElementById(id).classList.add("d-none");
        }, 4000);
    }
}
//------------------------------------------------------------------------//

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
 * Resets the registration form by clearing inputs and enabling the register button.
 */
function resetForm() {
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    registerBtn.disabled = false;
}
