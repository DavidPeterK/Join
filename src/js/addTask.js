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




