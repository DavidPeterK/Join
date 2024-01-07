function openContactsContainer() {
    let addTaskSelectedContactBox = document.getElementById('selectedContactsContainer');
    let addTaskContactCollectionBox = document.getElementById('contactsCollectionContainer');
    addTaskSelectedContactBox.classList.add('d-none');
    addTaskContactCollectionBox.classList.remove('d-none');
    changeOpenInputBox();
    changeOpenInputInner();
    changeOpenInputArrow();
    renderAllContacts();
}

function closeContactsContainer() {
    let addTaskSelectedContactBox = document.getElementById('selectedContactsContainer');
    let addTaskContactCollectionBox = document.getElementById('contactsCollectionContainer');
    addTaskSelectedContactBox.classList.remove('d-none');
    addTaskContactCollectionBox.classList.add('d-none');
    changeCloseInputBox();
    changeCloseInputInner();
    changeCloseInputArrow();
    renderAllSelectedContacts();
}

function changeOpenInputArrow() {
    let arrow = document.getElementById('contactsInputArrow');
    arrow.src = 'src/img/arrow_drop_up.svg';
    arrow.onclick = function (event) {
        closeContactsContainer();
        doNotClose(event);
    }
}

function changeCloseInputArrow() {
    let arrow = document.getElementById('contactsInputArrow');
    arrow.src = 'src/img/arrow_drop_downaa.svg';
    arrow.onclick = function (event) {
        openContactsContainer();
        doNotClose(event);
    };
}

function changeOpenInputInner() {
    let addTaskContactInput = document.getElementById('addTaskContactsInput');
    addTaskContactInput.removeAttribute('readonly');
    addTaskContactInput.placeholder = 'An:';
    addTaskContactInput.value = '';
    addTaskContactInput.onkeyup = function (event) {
        renderAllContacts(addTaskContactInput.value);
    };
}

function changeCloseInputInner() {
    let addTaskContactInput = document.getElementById('addTaskContactsInput');
    addTaskContactInput.setAttribute('readonly', 'readonly');
    addTaskContactInput.placeholder = '';
    addTaskContactInput.value = 'Select contacts to assign';
    addTaskContactInput.onkeyup = null;
}

function changeOpenInputBox() {
    let addTaskContactInputBox = document.getElementById('addTaskContactsInputBox');
    addTaskContactInputBox.onclick = function (event) {
        doNotClose(event);
    };
}

function changeCloseInputBox() {
    let addTaskContactInputBox = document.getElementById('addTaskContactsInputBox');
    addTaskContactInputBox.onclick = function (event) {
        openContactsContainer();
        doNotClose(event);
    };
}

function renderAllContacts(filter) {
    let contacts = contactsArray.sort((a, b) => a.name.localeCompare(b.name));
    let container = document.getElementById('contactsContent');
    let array;
    if (filter) {
        array = filterContactsForSearch(filter, contacts);
    } else {
        array = contacts;
    }
    container.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        const arrayContacts = array[i];
        container.innerHTML += returnAddTaskContactRow(arrayContacts);
    }
}

function filterContactsForSearch(filter, contacts) {
    var filterContacts = contacts.filter(function (contact) {
        // Prüfen Sie, ob der Name den angegebenen Buchstaben enthält (case-insensitive)
        return contact.name.toLowerCase().includes(filter.toLowerCase());
    });

    return filterContacts;
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
    renderAllContacts();
}

/** * This function is to save the input in the contact array */
async function createContact() {
    let newContact = contactTemplate();
    contactsArray.push(newContact);
    contactId++;
    await currentUserContactsSave();
    changesSaved('Contact successfully created');
    openContactsContainer()
}
