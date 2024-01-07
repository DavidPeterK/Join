async function clearContactsArray() {
    contactsArray = '';
    await currentUserContactsSave();
}

async function contactsInit() {
    highLightNavBar('src/img/contactsActiv.svg', 'contactsNavIcon', 'contactsNavButton');
    loadActivUser();
    userCircleLoad();
    await currentUserContactsLoad();
    renderContacts();
    renderContactInfoEmpty();
}

function renderContacts() {
    let alphabetBox = document.getElementById('alphaBox');
    alphabetBox.innerHTML = '';
    for (let i = 0; i < alphabet.length; i++) {
        const letter = alphabet[i];
        renderContactsAlphabet(alphabetBox, letter);
    }
}

function renderContactsAlphabet(alphabetBox, letter) {
    if (isContactLetter(letter)) {
        alphabetBox.innerHTML += `<div class="alphabet-letter">${letter}</div>`;
        filterContacts(alphabetBox, letter);
    }
}

function filterContacts(alphabetBox, letter) {
    let alphabetArray = filterBy(letter);
    for (let i = 0; i < alphabetArray.length; i++) {
        const array = alphabetArray[i];
        alphabetBox.innerHTML += returnContactRow(array);
    }
}

function filterBy(letter) {
    let array = contactsArray.sort((a, b) => a.name.localeCompare(b.name));
    return array.filter(contact => contact.name.toUpperCase().startsWith(letter));
}

function isContactLetter(letter) {
    return contactsArray.some(contact => contact.name.toUpperCase().startsWith(letter));
}

function returnContactRow(array) {
    return /*html*/`
    <div onclick='renderContactInfo(${array.id})' id='contactId${array.id}' class="contact-row">
        <div style="${array.color}" class="contact-circle">${array.nameAbbreviation}</div>
        <div class="name-email-box">
            <span class="contact-name-list">${array.name}</span>
            <span class="contact-email-list">${array.email}</span>
        </div>
    </div>
`;
}

function renderContactInfoEmpty() {
    let container = document.getElementById('contactInfoContainerRight');
    container.innerHTML = returnEmptyInfoContainer();
}

function returnEmptyInfoContainer() {
    return /*html*/`
    <div class="head-section">
        <h2 style='margin-bottom: 32px'>Contacts</h2>
        <div class="vector-span-direction">
            <div class="vectorContacts"></div>
            <span class="head-span">Better with a team</span>
        </div>
    </div>    
    `;
}

function renderContactInfo(id) {
    let index = contactsArray.findIndex(object => object.id === id);
    let array = contactsArray[index];
    renderContacts();
    activateContact(id);
    if (window.innerWidth > 1020) {
        renderContactInfoBig(array);
    } else {
        renderContactInfoPopUp(array);
    }
}

function activateContact(id) {
    let contactRow = document.getElementById(`contactId${id}`);
    contactRow.classList.add('contact-row-activ');
}

function renderContactInfoBig(id) {
    renderContactInfoEmpty();
    let container = document.getElementById('contactInfoContainerRight');
    container.innerHTML += returnContactInfoContainerRight(id);
}

function editContactInit(id) {
    let index = contactsArray.findIndex(object => object.id === id);
    let array = contactsArray[index];
    showContactsPopUp('edit', index);
    initContactPopUp(array);
}

function initContactPopUp(array) {
    document.getElementById('contactUserName').value = array.name;
    document.getElementById('contactEmail').value = array.email;
    document.getElementById('contactPhone').value = array.phone;
}

/** * This function is to save the input in the contact array */
async function createContact() {
    let newContact = contactTemplate();
    contactsArray.push(newContact);
    contactId++;
    await currentUserContactsSave();
    changesSaved('Contact successfully created');
    renderContactInfo(contactId - 1);
}

async function editContact(index) {
    let newContact = contactTemplate();
    contactsArray[index] = newContact;
    contactId++;
    await currentUserContactsSave();
    changesSaved('Contact successfully edited');
    renderContactInfo(contactId - 1);
}

function deleteContactWindow(id) {
    let index = contactsArray.findIndex(object => object.id === id);
    let array = contactsArray[index];
    let container = document.getElementById('contactsDeletePopUp');
    container.innerHTML = returnDeleteWindow(array, index);
    container.classList.remove('d-none');
}

function deleteContact(index) {
    let container = document.getElementById('contactsDeletePopUp');
    contactsArray.splice(index, 1);
    currentUserContactsSave();
    closeContactInfoSmall();
    renderContactInfoEmpty();
    container.classList.add('d-none');
}

function renderContactInfoPopUp(id) {
    renderContactInfoBig(id);
    let listBox = document.getElementById('contactsListContainer');
    let container = document.getElementById('contactInfoContainerRight');
    listBox.classList.add('d-none');
    container.classList.add('d-flex');
}

function closeContactInfoSmall() {
    renderContacts();
    let listBox = document.getElementById('contactsListContainer');
    let container = document.getElementById('contactInfoContainerRight');
    listBox.classList.remove('d-none');
    container.classList.remove('d-flex');
}

function returnDeleteWindow(array, index) {
    return /*html*/`
   <div class="deleteQuest">
        <span style='text-align: center' class="category-span">Do you really want to delete <span style="color: #29abe2;">${array.name}</span>?
        </span>
        <div style="width: 100%; display: flex; justify-content: center; align-items: center; gap: 28px;">
            <button onclick='closeDeleteWindow()' class="pop-button-cancel">No</button>
            <button onclick='deleteContact(${index})' class="pop-button-create">Yes</button>
        </div>
    </div>
    `;
}

function closeDeleteWindow() {
    let container = document.getElementById('contactsDeletePopUp');
    container.classList.add('d-none');

}

function returnContactInfoContainerRight(array) {
    return /*html*/`
    <div class="contacts-info-name-box">
        <div style="${array.color}" class="big-contact-circle">${array.nameAbbreviation}</div>
        <div class="split-container-name-functions">
            <span class="contacts-info-name-span">${array.name}</span>
            <div class="functions-buttons-box">
                <span onclick='editContactInit(${array.id})' class="edit-button"><img src="src/img/PenAddTask 1=edit.svg" alt=""> Edit</span>
                <span onclick='deleteContactWindow(${array.id})' class="delete-button"><img src="src/img/subTaskDelete.svg" alt=""> Delete</span>
            </div>
        </div>
    </div>

    <span class="headline-info-center">Contact Information</span>

    <div class="split-container">
        <div class="split-span-box">
            <span class="email-headline">Email</span>
            <a style='text-decoration: none' href='mailto:${array.email}' class="email-adress">${array.email}</a>
        </div>
        <div class="split-span-box">
            <span class="phone-headline">Phone</span>
            <a style='text-decoration: none' href='tel:${array.phone}' class="phone-number">${array.phone}</a>
        </div>
    </div>    
    `;
}
