let addTaskContactInput = document.getElementById('addTaskContactsInput');
let addTaskContactInputBox = document.getElementById('addTaskContactsInputBox');

function openContactsContainer() {
    let addTaskSelectedContactBox = document.getElementById('selectedContactsContainer');
    let addTaskContactCollectionBox = document.getElementById('contactsCollectionContainer');
    addTaskSelectedContactBox.classList.add('d-none');
    addTaskContactCollectionBox.classList.remove('d-none');
    //input pfeil drehen//
    renderAllContacts();
}

function closeContactsContainer() {
    let addTaskSelectedContactBox = document.getElementById('selectedContactsContainer');
    let addTaskContactCollectionBox = document.getElementById('contactsCollectionContainer');
    addTaskSelectedContactBox.classList.remove('d-none');
    addTaskContactCollectionBox.classList.add('d-none');
    //input pfeil drehen//
}

function renderAllContacts() {

}