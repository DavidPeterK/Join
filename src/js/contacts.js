const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function closeContactsPopUp() {
    let popup = document.getElementById('contactsPopUp');
    popup.classList.add('d-none');
}

function showContactsPopUp() {
    let popup = document.getElementById('contactsPopUp');
    popup.classList.remove('d-none');
}