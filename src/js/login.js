const contentBox = document.getElementById('indexContainer');
const email = document.getElementById('email');
const password = document.getElementById('password');
const checkbox = document.getElementById('rememberMe');

async function initIndex() {
    activUser = {
        'name': '',
    };
    saveActivUser();
    if (!document.referrer) {
        startAnimation();
    } else {
        logoAnimation();
        renderSignIn();
    }
    await loadUserGroup698();
}

function renderSignIn() {
    let signUpTop = document.getElementById('signSectionTop');
    let signUpBottom = document.getElementById('signSectionBottom');
    let rememberedEmail = localStorage.getItem('rememberMe');
    if (rememberedEmail) {
        email.value = rememberedEmail;
        document.getElementById('myCheckbox').checked = true;
    }
    contentBox.classList.remove('d-none');
    contentBox.innerHTML = signInHtml();
    signUpTop.innerHTML = signUpSection();
    signUpBottom.innerHTML = signUpSection();
}

/**
 * Starts the join-logo animation if the document referrer is empty.
 */
function startAnimation() {
    let logo = document.getElementById('logo');
    logo.classList.add('fade-in');
    logo.classList.remove('d-none');
    setTimeout(() => {
        logo.classList.add('animated');
    }, 2000);
    setTimeout(() => {
        logo.classList.remove('join-logo-head-startposition');
        logo.classList.remove('fade-in');
        logo.classList.remove('animated');
        logo.classList.add('join-logo-head-endposition');
        renderSignIn();
    }, 3825);
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
    if (document.getElementById('rememberMe').checked) {
        localStorage.setItem('rememberMe', email.value);
    } else {
        localStorage.removeItem('rememberMe');
    }
}

/**
 * Logs in a user as a guest and fills default data arrays.
 */
function guestLogin() {
    activUser.name = 'Guest698';
    saveActivUser();
    fillTestArray();
    window.location.href = "./summary.html";
}

function logoAnimation() {
    let logo = document.getElementById('logo');
    logo.classList.remove('d-none');
    logo.classList.remove('join-logo-head-startposition');
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