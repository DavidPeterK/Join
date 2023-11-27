function switchContent(newContent) {
    let container = document.getElementById("indexContainer");
    let signUpButtonBottom = document.getElementById('signSectionBottom');
    let signUpButtonTop = document.getElementById('signSectionTop');
    addClasses(container, signUpButtonTop, signUpButtonBottom);
    setTimeout(() => {
        updateContent(newContent);
        updateClasses(container, signUpButtonTop, signUpButtonBottom);
    }, 330);
}

function updateContent(newContent) {
    if (newContent === 'signIn') {
        renderSignIn();
    } else if (newContent === 'signUp') {
        renderSignUp();
    }
}

function updateClasses(container, signUpButtonTop, signUpButtonBottom) {
    [container, signUpButtonTop, signUpButtonBottom].forEach(elem => {
        elem.classList.toggle('fade-in');
        elem.classList.toggle('fade-out');
    });
}

function addClasses(container, signUpButtonTop, signUpButtonBottom) {
    [container, signUpButtonTop, signUpButtonBottom].forEach(elem => {
        elem.classList.remove('fade-in');
        elem.classList.add('fade-out');
    });
}
