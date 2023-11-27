function renderSignUp() {
    let container = document.getElementById('indexContainer');
    let signUpTop = document.getElementById('signSectionTop');
    let signUpBottom = document.getElementById('signSectionBottom');
    container.innerHTML = signUpHtml();
    signUpTop.innerHTML = '';
    signUpBottom.innerHTML = '';
}

function signUpHtml() {
    return /*html*/`
<div class="sign-up-headline">
    <img class="arrow-left-img" onclick="switchContent('signIn')" src="src/img/arror-left.svg" alt="arrow left">
    <div class="column-center">
        <h3>Sign up</h3>
        <div class="blueUnderline"></div>
    </div>
    <div></div>
</div>

<div class="input-section">
    <div class="input-container">
        <input type="text" placeholder="Name">
        <img class="input-icon" src="src/img/input-person.svg" alt="person-icon">
    </div>

    <div class="input-container">
        <input type="email" placeholder="Email">
        <img class="input-icon" src="src/img/input-mail.svg" alt="email-icon">
    </div>

    <div class="input-container">
        <input type="password" placeholder="Password">
        <img class="input-icon" src="src/img/password-icon.svg" alt="password-icon">
    </div>

    <div class="input-container">
        <input type="password" placeholder="Confirm Password">
        <img class="input-icon" src="src/img/password-icon.svg" alt="password-icon">
    </div>

    <div class="remember-container">
        <input type="checkbox" id="checkPrivacyPolicy" name="acceptPrivacyPolicy">
        <span id="label-span">I accept the <a href="#">Privacy policy</a></span>
    </div>

    <div class="button-section">
        <div id="signUpButton" class="button">Sign up</div>
    </div>
</div>
`;
}