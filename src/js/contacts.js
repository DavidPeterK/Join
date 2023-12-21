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
        "phone": document.getElementById('contactPhone').value,
        "color": getColor()
    }
    contactsArray.push(newContact);
    await currentUserContactsSave();
    clearInputFields();
    renderContacts();
    changesSaved('Contact successfully created');
}

/**
 * Validates the input value of a form's phone field.
 * Checks whether the entered phone number only contains the plus symbol and digits 0-9. 
 * If the validation fails, it displays an error message and prevents form submission. 
 * Otherwise, it allows form submission.
 */
function validateForm() {
    var input = document.getElementById('inputPhoneId');

    var regex = /^[+0-9]+$/;

    if (!regex.test(input.value)) {
        input.style.borderColor = 'red';
        document.getElementById('errorMessage').innerText = "Invalid input! Only + and numbers from 0-9 are allowed.";
        setTimeout(function () {
            input.style.borderColor = '#A8A8A8';
            document.getElementById('errorMessage').innerText = "";
        }, 6000);
        return false; // Verhindert das Absenden des Formulars
    } else {
        document.getElementById('errorMessage').innerText = "";
        return true; // Ermöglicht das Absenden des Formulars
    }
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
function clearInputFields() {
    document.getElementById('inputNameId').value = '';
    document.getElementById('inputEmailId').value = '';
    document.getElementById('inputPhoneId').value = '';
}

/** * This function is used to create the profile image color */
function getColor() {
    if (nextColorIndex >= colorArray.length) {
        nextColorIndex = 0;
    }
    let color = colorArray[nextColorIndex];
    nextColorIndex++;
    setItem('nextColorIndex', JSON.stringify(nextColorIndex));
    return color;
}

