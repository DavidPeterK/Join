let selectedCategorys = '';
let selectedContacts = '';
let selectedPrio = '';
let currentSubtask = '';

async function addTaskInit() {
    await currentUserContactsLoad();
    await currentUserCategorysLoad();
    await currentUserIdLoad();
    renderPrioSection();
    renderCategoryPopUp();
}

function loadTaskControl() {
    let title = document.getElementById('addTaskTitleInput');
    let description = document.getElementById('addTaskDescriptionInput');
    let dueDate = document.getElementById('datepicker');
    createTaskControl(title, description, dueDate);
}

function createTaskControl(title, description, dueDate) {
    if (title.value === '') {
        warnTitle();
    } else if (description.value === '') {
        warnDescription();
    } else if (dueDate.value === '') {
        warnDueDate();
    } else {
        createTask();
    }
}

function warnTitle() {
    let titleBox = document.getElementById('addTaskTitleBox');
    let titleWarn = document.getElementById('warnTitle');
    titleBox.classList.add('red-border');
    titleWarn.classList.remove('d-none');
    setTimeout(() => {
        titleBox.classList.remove('red-border');
        titleWarn.classList.add('d-none');
    }, 4000);
}

function warnDescription() {
    let description = document.getElementById('addTaskDescriptionInput');
    let descriptionWarn = document.getElementById('warnDescription');
    description.classList.add('red-border');
    descriptionWarn.classList.remove('d-none');
    setTimeout(() => {
        description.classList.remove('red-border');
        descriptionWarn.classList.add('d-none');
    }, 4000);
}

function warnDueDate() {
    let dueDateBox = document.getElementById('addTaskDueDateBox');
    let dueDateWarn = document.getElementById('warnDueDate');
    dueDateBox.classList.add('red-border');
    dueDateWarn.classList.remove('d-none');
    setTimeout(() => {
        dueDateBox.classList.remove('red-border');
        dueDateWarn.classList.add('d-none');
    }, 4000);
}

async function createTask() {
    let task = createTaskObject();
    tasks.push(task);
    currentId++;
    await currentUserIdSave();
    setTimeout(() => { window.location.href = './board.html'; }, 3000);
}

/** Collects and returns data for a new task. */
function createTaskObject() {
    return {
        'id': currentId,
        'status': statusGroup,
        'category': currentCategorySelected.name,
        'categoryColor': currentCategorySelected.color,
        'title': document.getElementById("addTaskTitleInput").value,
        'description': document.getElementById("addTaskDescriptionInput").value,
        'dueDate': document.getElementById("datepicker").value,
        'priority': selectedPrio,
        'assignContacts': contactCollection,
        'subtasksInProgress': subtasks,
        'subtasksFinish': subtasksFinish,
    }
}

