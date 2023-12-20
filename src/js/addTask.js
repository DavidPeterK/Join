let selectedCategorys = '';
let selectedContacts = '';
let selectedPrio = '';
let currentSubtask = '';

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
    renderSubTasks();
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

//SubTaskFunctions//
/**
 * Adds a sub-task to the collection.
 */
function addSubTask() {
    let input = document.getElementById('subtaskInput');
    if (input.value === '') {
        return;
    } else {
        subtasks.push(input.value);
        saveTaskDetails();
        renderSubTasks();
        input.value = '';
    }
}

/**
 * Renders the sub-task collection to the DOM.
 */
function renderSubTasks() {
    let collection = document.getElementById('subtasksContainer');
    collection.innerHTML = '';
    hideEditContainer();
    for (let i = 0; i < subtasks.length; i++) {
        const subCollection = subtasks[i];
        collection.innerHTML += returnSubTasks(subCollection, i);
    }
}

function returnSubTasks(subCollection, i) {
    return /*html*/ `
    <ul id='subtaskUl${i}' onmouseover="subtaskListHover(${i})"
    onmouseout="subtaskListHoverReset(${i})" ondblclick="showEditContainer(${i})" class="subtaskListItem">
        <li>${subCollection}</li>
        <div id="subtaskListFunctions${i}" class='d-none' style="display: flex; gap: 5px;">
            <img class="greyHoverIcon" onclick="showEditContainer(${i})"
                src="src/img/PenAddTask 1=edit.svg">
            <div class="seperator" style='background: #F6F7F8'></div>
            <img class="greyHoverIcon" onclick="deleteSubtask(${i})"
                src="src/img/subTaskDelete.svg">
        </div>
    </ul>
    `
}

/**
 * Edits a sub-task.
 * @param {number} i - Index of the sub-task.
 */
function showEditContainer(i) {
    let container = document.getElementById('subtaskEditContainer');
    let input = document.getElementById('editSubtaskInput');
    container.classList.remove('d-none');
    input.value = subtasks[i];
    currentSubtask = i;
}

function hideEditContainer() {
    let container = document.getElementById('subtaskEditContainer');
    container.classList.add('d-none');
}

function editSubtask() {
    let input = document.getElementById('editSubtaskInput');
    if (input.value === '') {
        subtasks.splice(currentSubtask, 1);
    } else {
        subtasks[currentSubtask] = input.value;
    }
    saveTaskDetails();
    renderSubTasks();
}

function deleteSubtask(i) {
    subTasks.splice(i, 1)
    saveTaskDetails();
    renderSubTasks();
}
//-------------------------------------------------------------//
