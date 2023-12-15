let contentBox; let email;
let password; let checkbox;
let signUpButtonTop;
let signUpButtonBottom;

let logo;

async function initIndex() {
    initContainer();
    activUser = { 'name': '', };
    saveActivUser();
    logoStatus();
    await loadUserGroup698();
}

function initContainer() {
    contentBox = document.getElementById('indexContainer');
    email = document.getElementById('email');
    password = document.getElementById('password');
    checkbox = document.getElementById('rememberMe');
    logo = document.getElementById('logo');
    signUpButtonTop = document.getElementById('signSectionTop');
    signUpButtonBottom = document.getElementById('signSectionBottom');
}

function logoStatus() {
    if (!document.referrer) {
        startAnimation();
    } else {
        hideLogoAnimation();
        renderSignIn();
    }
}

function renderSignIn() {
    let rememberedEmail = localStorage.getItem('rememberMe');
    checkbox = document.getElementById('rememberMe');
    isRememberedEmail(rememberedEmail);
    contentBox.classList.remove('d-none');
    contentBox.innerHTML = signInHtml();
    signUpButtonTop.innerHTML = signUpSection();
    signUpButtonBottom.innerHTML = signUpSection();
    document.getElementById('footer').classList.remove('d-none');
}

function isRememberedEmail(rememberedEmail) {
    if (rememberedEmail) {
        email.value = rememberedEmail;
        checkbox.checked = true;
    }
}

function switchContent(newContent) {
    addClasses();
    setTimeout(() => {
        updateContent(newContent);
        updateClasses();
    }, 330);
}

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

function isCheckBoxChecked() {
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