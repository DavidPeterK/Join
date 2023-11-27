function initIndex() {
    if (!document.referrer) {
        startAnimation();

    } else {
        correctClasslist();
        renderSignIn();
    }
}

function renderSignIn() {
    let container = document.getElementById('indexContainer');
    let signUpTop = document.getElementById('signSectionTop');
    let signUpBottom = document.getElementById('signSectionBottom');
    container.classList.remove('d-none')
    container.innerHTML = signInHtml();
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

function correctClasslist() {
    let logo = document.getElementById('logo');
    logo.classList.remove('d-none');
    logo.classList.remove('join-logo-head-startposition');
    logo.classList.add('join-logo-head-endposition');
}

function signUpSection() {
    return /*html*/`
        <span id="sign-up-span">Not a Join user?</span>
    <div onclick="switchContent('signUp')" id="sign-up-button" class="button">
        Sign up
    </div>

    `;
}

function signInHtml() {
    return /*html*/`
<div class="column-center">
    <h3>Log in</h3>
    <div class="blueUnderline"></div>
</div>

<div class="input-section">
    <div class="input-container">
        <input type="email" placeholder="Email">
        <img class="input-icon" src="src/img/input-mail.svg" alt="email-icon">
    </div>

    <div class="input-container">
        <input type="password" placeholder="Password">
        <img class="input-icon" src="src/img/password-icon.svg" alt="password-icon">
    </div>

    <div class="remember-container">
        <input type="checkbox" id="rememberMe" name="rememberMe">
        <span id="label-span">Remember me</span>
    </div>

    <div class="button-section">
        <div id="login-button" class="button">Log in</div>
        <div id="guest-login-button" class="button">Guest Log in</div>
    </div>
</div>
`;
}