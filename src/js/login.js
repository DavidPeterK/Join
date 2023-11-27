function initIndex() {
    renderSignIn();
}

function renderSignIn() {
    let container = document.getElementById('indexContainer');
    let signUpTop = document.getElementById('signSectionTop');
    let signUpBottom = document.getElementById('signSectionBottom');
    container.innerHTML = signInHtml();
    signUpTop.innerHTML = signUpSection();
    signUpBottom.innerHTML = signUpSection();



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