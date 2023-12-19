let selectedCategorys = '';
let selectedContacts = '';
let selectedPrio = '';

/**
 * Sets the innerHTML of a specified DOM element using the content provided by a function.
 */
function setInnerHTML(elementId, htmlCode) {
    document.getElementById(elementId).innerHTML = htmlCode();
}

/**
 * This involves loading task elements, setting content for various sections of the add task view, and 
 */
function renderAddTaskContent() {
    loadTaskElements();
    setInnerHTML("addTaskHeadline", () => 'Add Task');
    setInnerHTML("assignedToInputContainer", returnAssignToBox1);
    setInnerHTML("assignedToContactsInputContainer", returnAssignToBox2);
    setInnerHTML("categoryAreaV1", returnCategoryBox1);
    setInnerHTML("categoryAreaV2", returnCategoryBox2);
    setInnerHTML("prioBox", returnPrioBox);
    setInnerHTML("buttonAreaAddTask", returnButtonAreaAddTask);
    addInputFieldAndListener();
    borderColorCheck();
    renderAllSelectedContacts();
    renderAllContactsForSearch();
    renderSubTaskCollection();
}















//----------------PrioButtons--------------//
function urgentButtonClick() {
    if (selectedPrio === 'urgent') {
        resetUrgentButton();
        selectedPrio = '';
    } else if (selectedPrio === 'low' || selectedPrio === 'medium' || selectedPrio === '') {
        urgentButtonActiv();
        resetMediumButton();
        resetLowButton();
        selectedPrio = 'urgent';
    }
}

function mediumButtonClick() {
    if (selectedPrio === 'medium') {
        resetMediumButton();
        selectedPrio = '';
    } else if (selectedPrio === 'low' || selectedPrio === 'urgent' || selectedPrio === '') {
        mediumButtonActiv();
        resetUrgentButton();
        resetLowButton();
        selectedPrio = 'medium';
    }
}

function lowButtonClick() {
    if (selectedPrio === 'low') {
        resetLowButton();
        selectedPrio = '';
    } else if (selectedPrio === 'medium' || selectedPrio === 'urgent' || selectedPrio === '') {
        lowButtonActiv();
        resetMediumButton();
        resetUrgentButton();
        selectedPrio = 'low';
    }
}

function urgentButtonActiv() {
    document.getElementById('urgentImg').src = 'src/img/prioUrgentWhite.svg';
    document.getElementById('urgentButton').classList.add('urgentActiv');
}

function mediumButtonActiv() {
    document.getElementById('mediumImg').src = 'src/img/prioMediumWhite.svg';
    document.getElementById('mediumButton').classList.add('mediumActiv');
}

function lowButtonActiv() {
    document.getElementById('lowImg').src = 'src/img/prioLowWhite.svg';
    document.getElementById('lowButton').classList.add('lowActiv');
}

function resetUrgentButton() {
    document.getElementById('urgentImg').src = 'src/img/prioUrgent.svg';
    document.getElementById('urgentButton').classList.remove('urgentActiv');
}

function resetMediumButton() {
    document.getElementById('mediumImg').src = 'src/img/prioMedium.svg';
    document.getElementById('mediumButton').classList.remove('mediumActiv');
}

function resetLowButton() {
    document.getElementById('lowButton').classList.remove('lowActiv');
    document.getElementById('lowImg').src = 'src/img/prioLow.svg';
}

function controlPrioButton() {
    if (selectedPrio === 'urgent') {
        urgentButtonActiv();
    }
    if (selectedPrio === 'medium') {
        mediumButtonActiv();
    }
    if (selectedPrio === 'low') {
        lowButtonActiv();
    }
}
//-------------------------------------------------------------//