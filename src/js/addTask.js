let selectedCategorys = '';
let selectedContacts = '';
let selectedPrio = '';
let subtasks = '';
let subtasksFinish = '';

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

function urgentButtonClick() {
    if (selectedPrio === 'urgent') {
        resetAllPrioButtons();
        selectedPrio = '';
    } else {
        urgentButtonActiv();
    }
}

function mediumButtonClick() {
    if (selectedPrio === 'medium') {
        resetAllPrioButtons();
        selectedPrio = '';
    } else {
        mediumButtonActiv();
    }
}

function lowButtonClick() {
    if (selectedPrio === 'low') {
        resetAllPrioButtons();
        selectedPrio = '';
    } else {
        lowButtonActiv();
    }
}

resetAllPrioButtons() {
    document.getElementById('').scr;
    document.getElementById('');
    document.getElementById('');
    document.getElementById('').classList.remove('');
    document.getElementById('').classList.remove('');
    document.getElementById('').classList.remove('');
}