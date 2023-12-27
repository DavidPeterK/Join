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
    renderAllSelectedContacts();
}

function renderAllContacts() {
    let contacts = contactsArray.sort((a, b) => a.name.localeCompare(b.name));
    let container = document.getElementById('contactsContent');
    container.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        const array = contacts[i];
        container.innerHTML += returnAddTaskContactRow(array);
    }
}

function renderAllSelectedContacts() {
    let container = document.getElementById('selectedContactsContainer');
    container.innerHTML = '';
    for (let i = 0; i < contactCollection.length; i++) {
        const array = contactCollection[i];
        container.innerHTML += returnAddTaskSelectedContact(array);
    }
}
//-----------------------------------------------------//
function returnAddTaskSelectedContact(array) {
    return /*html*/`
    <div  style="${array.color}" class="userCircle">${array.nameAbbreviation}</div>
    `;
}
//-----------------------------------------------------//

function returnAddTaskContactRow(array) {
    let selected;
    let icon;
    if (contactIdCheck(array.id)) {
        selected = 'addTask-contact-row-activ';
        icon = 'src/img/addTaskCheckBox.svg';
    } else {
        selected = 'addTask-contact-row';
        icon = 'src/img/addTaskBox.svg';
    }
    return /*html*/`
    <div onclick='selectContactRow(${array.id})' class=${selected}>
        <div style="display: flex; justify-content: flex-start; align-items: center; gap: 20px;">
            <div style="${array.color}" class="userCircle">${array.nameAbbreviation}</div>
            <span class="contacts-container-row-span">${array.name}</span>
        </div>
        <img src=${icon} alt="checkBox">
    </div>
`;
}

// Die zu überprüfende Funktion
function contactIdCheck(id) {
    return contactCollection.some(item => item.id === id);
}

function selectContactRow(id) {
    let index = contactsArray.findIndex(object => object.id === id);
    let array = contactsArray[index];
    if (contactIdCheck(id)) {
        let i = contactCollection.findIndex(object => object.id === id);
        contactCollection.splice(i, 1)
    } else {
        contactCollection.push(array);
    }
    saveTaskDetails()
    renderAllContacts();
}