const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function closeContactsPopUp() {
    let popup = document.getElementById('contactsPopUp');
    popup.classList.add('d-none');
}

function showContactsPopUp() {
    let popup = document.getElementById('contactsPopUp');
    popup.classList.remove('d-none');
}

/** * This function is to save the input in the contact array */
async function createContact() {
    let newContact = {
        "name": document.getElementById('contactUserName').value,
        "nameAbbreviation": makeNameAbbreviation(document.getElementById('contactUserName').value),
        "email": document.getElementById('contactEmail').value,
        "phone": document.getElementById('inputPhoneId').value,
        "color": getColor()
    }
    contactsArray.push(newContact);
    await currentUserContactsSave();
    clearInputFields();
    slideOut('swipeContactPopupId', 'addContactId', 200);
    toggleVisibility('mobileBackArrowId', false);
    toggleVisibility('mobileVisibilityId', true);
    renderContacts();
    changesSaved('Contact successfully created');
    hoverNewContact(newContact);
}
