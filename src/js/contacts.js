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
    let newContact = contactTemplate();
    contactsArray.push(newContact);
    await currentUserContactsSave();
    clearContactInput();
    renderContacts();
    changesSaved('Contact successfully created');
}

function cancelContactPopUp() {
    closeContactsPopUp();
    clearContactInput();
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
        alphabetBox.innerHTML += returnContactRow(array, i);
    }
}

function returnContactRow(array, i) {
    return /*html*/`
    <div id='contactId${i}' class="contact-row">
        <div style="background: darkblue;" class="contact-circle">${array.nameAbbreviation}</div>
        <div class="name-email-box">
            <span class="contact-name-list">${array.name}</span>
            <span class="contact-email-list">${array.email}</span>
        </div>
    </div>
`;
}

function filterBy(letter) {
    return contactsArray.filter(contact => contact.name.toUpperCase().startsWith(letter));
}

function isContactLetter(letter) {
    return contactsArray.some(contact => contact.name.toUpperCase().startsWith(letter));
}

function contactTemplate() {
    return {
        "name": nameToUpperCase(document.getElementById('contactUserName').value),
        "nameAbbreviation": makeNameAbbreviation(document.getElementById('contactUserName').value),
        "email": document.getElementById('contactEmail').value,
        "phone": document.getElementById('contactPhone').value,
        "color": getColor()
    }
}

/**
 * Validates the input value of a form's phone field.
 * Checks whether the entered phone number only contains the plus symbol and digits 0-9. 
 * If the validation fails, it displays an error message and prevents form submission. 
 * Otherwise, it allows form submission.
 */
function validateForm() {
    if (checkInputPhone() && checkInputEmail() && checkInputName()) {
        createContact();
        closeContactsPopUp();
        clearContactInput();
    } else {
        return false;
    }
}

function checkInputPhone() {
    let warn = document.getElementById('warnContactPhone');
    let box = document.getElementById('contactPhoneBox');
    let phoneInput = document.getElementById('contactPhone').value;
    let phoneRegex = /^[+0-9]+$/;
    return isCheckInput(warn, box, phoneInput, phoneRegex);
}

function checkInputEmail() {
    let warn = document.getElementById('warnContactEmail');
    let box = document.getElementById('contactEmailBox');
    let emailInput = document.getElementById('contactEmail').value;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return isCheckInput(warn, box, emailInput, emailRegex);
}

function isCheckInput(warn, box, input, regex) {
    if (!regex.test(input)) {
        box.style.borderColor = 'red';
        warn.classList.remove('d-none');
        setTimeout(function () {
            box.style.borderColor = '#A8A8A8';
            warn.classList.add('d-none');
        }, 4000);
        return false;
    } else {
        return true;
    }
}

function checkInputName() {
    let warn = document.getElementById('warnContactName');
    let box = document.getElementById('contactNameBox');
    let nameInput = document.getElementById('contactUserName').value;
    let nameRegex = /^[^0-9]/;
    return isCheckInput(warn, box, nameInput, nameRegex);
}

function isCheckInputName(warn, box, nameRegex, firstName) {
    if (!nameRegex.test(firstName)) {
        box.style.borderColor = 'red';
        warn.classList.remove('d-none');
        setTimeout(function () {
            box.style.borderColor = '#A8A8A8';
            warn.classList.add('d-none');
        }, 4000);
        return false;
    } else {
        return true;
    }
}

function nameToUpperCase(nameInput) {
    const capitalizedNames = nameInput.split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ');
    return capitalizedNames;
}

/**
 * Creates a 2-letter abbreviation from a given name (e.g. "John Doe" -> "JD").
 */
function makeNameAbbreviation(name) {
    let nameParts = name.split(' ');
    let firstName = nameParts[0];
    let lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
    let nameAbbreviation = `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
    return nameAbbreviation;
}

/** * This function is to clear the input fields in a popup */
function clearContactInput() {
    document.getElementById('contactUserName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactPhone').value = '';
}

/** * This function is used to create the profile image color */
function getColor() {
    const randomIndex = Math.floor(Math.random() * colorCollection.length);
    const randomColor = colorCollection[randomIndex];
    return randomColor;
}

