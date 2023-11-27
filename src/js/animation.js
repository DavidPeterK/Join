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

/** * This function is used to the edit and delete menu on the mobile view */
function changesSaved(inputText) {
    let smallContainer = document.getElementById('successfullyCreated')
    smallContainer.innerHTML = /* html */ `
    ${inputText}`;
    setTimeout(function () {
        slideOutOneObject('successfullyCreatedId');
    }, 2500);
    setTimeout(function () {
        toggleVisibility('successfullyCreatedId', false);
    }, 2900);
}

