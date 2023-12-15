
//------------------------LogIn Ainimation--------------------//
/**
 * Starts the join-logo animation if the document referrer is empty.
*/
function startAnimation() {
    showLogoAnimate();
    setTimeout(() => {
        logo.classList.add('animated');
    }, 2000);
    setTimeout(() => {
        walkingLogoAnimate();
        renderSignIn();
    }, 3825);
}

function showLogoAnimate() {
    logo.classList.add('join-logo-head-startposition');
    logo.classList.add('fade-in');
    logo.classList.remove('d-none');
}

function walkingLogoAnimate() {
    logo.classList.remove('join-logo-head-startposition');
    logo.classList.remove('fade-in');
    logo.classList.remove('animated');
    logo.classList.add('join-logo-head-endposition');
}

function updateClasses() {
    [contentBox, signUpButtonTop, signUpButtonBottom].forEach(elem => {
        elem.classList.toggle('fade-in');
        elem.classList.toggle('fade-out');
    });
}

function addClasses() {
    [contentBox, signUpButtonTop, signUpButtonBottom].forEach(elem => {
        elem.classList.remove('fade-in');
        elem.classList.add('fade-out');
    });
}
//----------------------------------------------------------------------//

//-------------------------successFully popUp---------------------------//
/** * This function is used to the edit and delete menu on the mobile view */
function changesSaved(inputText) {
    let smallContainer = document.getElementById('successfullyCreated')
    smallContainer.innerHTML = /* html */ `${inputText}`;
    smallContainer.classList.remove('d-none');
    setTimeout(function () {
        smallContainer.classList.add('d-none');
    }, 2900);
}
//----------------------------------------------------------------------//


function doNotClose(event) {
    event.stopPropagation();
}

//------------------------Header-Menu----------------------------//
let openMenu = false;

function closeHeadMenu() {
    let headerMenu = document.getElementById('userOptions');
    headerMenu.classList.add('d-none');
    openMenu = false;
}

function showHeadMenu() {
    let headerMenu = document.getElementById('userOptions');
    headerMenu.classList.remove('d-none');
    openMenu = true;
}

/**
 * Toggles the visibility of the header menu.
 */
function openHeaderMenu(event) {
    event.stopPropagation();
    if (openMenu) {
        closeHeadMenu();
    } else {
        showHeadMenu();
    }
}
//----------------------------------------------------------------------//

//----------------------------------------------------------------------//
function changeImage(id, path) {
    document.getElementById(id).src = path;
}

function restoreImage(id, path) {
    document.getElementById(id).src = path;
}
//----------------------------------------------------------------------//