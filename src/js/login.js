let contentBox; let email;
let password; let checkbox;
let signUpButtonTop; let signUpButtonBottom;
let logo;

/**
 * Initializes the index page.
 */
async function initIndex() {
    await loadUserGroup();
    initContainer();
    activUser = { 'name': '', };
    saveActivUser();
    logoStatus();
    isUserLoggedIn = false;
    isUserLoggedSave();
}

/**
 * Initializes the container elements.
 */
function initContainer() {
    email = document.getElementById('email');
    contentBox = document.getElementById('indexContainer');
    password = document.getElementById('password');
    checkbox = document.getElementById('rememberMe');
    logo = document.getElementById('logo');
    signUpButtonTop = document.getElementById('signSectionTop');
    signUpButtonBottom = document.getElementById('signSectionBottom');
}

/**
 * Handles the logo status based on the referrer.
 */
function logoStatus() {
    if (!document.referrer) {
        startAnimation();
    } else {
        hideLogoAnimation();
        renderSignIn();
    }
}

/**
 * Renders the sign-in content.
 */
function renderSignIn() {
    initContainer();
    checkbox = document.getElementById('rememberMe');
    contentBox.classList.remove('d-none');
    contentBox.innerHTML = signInHtml();
    isRememberedEmail();
    signUpButtonTop.innerHTML = signUpSection();
    signUpButtonBottom.innerHTML = signUpSection();
    document.getElementById('footer').classList.remove('d-none');
}

/**
 * Checks if the email should be remembered and updates the input accordingly.
 */
function isRememberedEmail() {
    let email = document.getElementById('email');
    let rememberedEmail = localStorage.getItem('rememberMe');
    let checkbox = document.getElementById('rememberMe');
    if (rememberedEmail) {
        email.value = rememberedEmail;
        checkbox.checked = true;
    }
}

/**
 * Switches the content between sign-in and sign-up.
 */
function switchContent(newContent) {
    addClasses();
    setTimeout(() => {
        updateContent(newContent);
        updateClasses();
    }, 330);
}

/**
 * Updates the content based on the specified new content.
 */
function updateContent(newContent) {
    if (newContent === 'signIn') {
        renderSignIn();
    } else if (newContent === 'signUp') {
        renderSignUp();
    }
}

/**
 * Validates user credentials and logs them in if valid.
 */
function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let users = user.find(u => u.email === email.value && u.password === password.value);
    let thisUser = user.findIndex(u => u.email === email.value);
    if (users) {
        isCheckBoxChecked();
        activUser['name'] = user[thisUser].name;
        saveActivUser();
        window.location.href = "./summary.html";
    } else {
        loadRedBorderInput();
        loadWarningTextTemplate();
    }
}

/**
 * Checks if the "Remember Me" checkbox is checked and updates local storage accordingly.
 */
function isCheckBoxChecked() {
    let checkbox = document.getElementById('rememberMe');
    let email = document.getElementById('email');
    if (checkbox.checked) {
        localStorage.setItem('rememberMe', email.value);
    } else {
        localStorage.removeItem('rememberMe');
    }
}

/**
 * Logs in a user as a guest and fills default data arrays.
 */
function guestLogin() {
    activUser.name = 'Guest';
    saveActivUser();
    fillTestArray();
    window.location.href = "./summary.html";
}

/**
 * Hides the logo animation by removing the 'd-none' class and adding the end position class.
 */
function hideLogoAnimation() {
    logo.classList.remove('d-none');
    logo.classList.add('join-logo-head-endposition');
}

/**
 * Adds a red border to specified input elements indicating an error.
 */
function loadRedBorderInput() {
    let inputIds = ["input-email", "input-password"];
    for (let id of inputIds) {
        document.getElementById(id).classList.add("red-border");
    }
}

/**
 * Displays warning text templates for specified elements.
 */
function loadWarningTextTemplate() {
    let warningIds = ["warning-text-password", "warning-text-email"];
    for (let id of warningIds) {
        document.getElementById(id).classList.remove("d-none");
    }
}