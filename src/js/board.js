let dragElement;

async function initBoard() {
    await currentUserContactsLoad();
    await currentUserCategorysLoad();
    await currentUserIdLoad();
    await loadAllTasks();
    renderPrioSection();
    renderCategoryPopUp();
    renderAllTasks();
}

function renderAllTasks(filterText) {
    renderToDoTasks(filterText);
    renderInProgressTasks(filterText);
    renderAwaitFeedbackTasks(filterText);
    renderDoneTasks(filterText);
    removeDragClass();
}

function renderToDoTasks(filterText) {
    let box = document.getElementById('boardToDo');
    let array = tasks.filter(task => task.status === 'toDo');
    let emptyText = 'No tasks To do';
    box.innerHTML = '';
    isTaskInArray(filterText, array, box, emptyText)
}

function renderInProgressTasks(filterText) {
    let box = document.getElementById('boardInProgress');
    let array = tasks.filter(task => task.status === 'inProgress');
    let emptyText = 'No tasks In Progress';
    box.innerHTML = '';
    isTaskInArray(filterText, array, box, emptyText)
}

function renderAwaitFeedbackTasks(filterText) {
    let box = document.getElementById('boardAwaitFeedback');
    let array = tasks.filter(task => task.status === 'awaitFeedback');
    let emptyText = 'No tasks Await feedback';
    box.innerHTML = '';
    isTaskInArray(filterText, array, box, emptyText)
}

function renderDoneTasks(filterText) {
    let box = document.getElementById('boardDone');
    let array = tasks.filter(task => task.status === 'done');
    emptyText = 'No tasks Done';
    box.innerHTML = '';
    isTaskInArray(filterText, array, box, emptyText)
}

function isTaskInArray(filterText, array, box, emptyText) {
    if (array.length > 0) {
        boardSearch(filterText, array, box, emptyText);
    } else {
        box.innerHTML = returnEmptyBox(emptyText);
    }
}

function boardSearch(filterText, array, box, emptyText) {
    let taskArray = fillTaskArray(filterText, array);
    if (taskArray.length > 0) {
        for (let t = 0; t < taskArray.length; t++) {
            const task = taskArray[t];
            box.innerHTML += returnArrayHtml(task);
        }
    } else {
        box.innerHTML = returnEmptyBox(emptyText);
    }
}

function fillTaskArray(filterText, array) {
    let filteredTasks;

    if (filterText) {
        filteredTasks = array.filter(function (search) {
            return search.category.toLowerCase().includes(filterText.toLowerCase()) || search.description.toLowerCase().includes(filterText.toLowerCase()) || search.title.toLowerCase().includes(filterText.toLowerCase());
        });
    } else {
        filteredTasks = array;
    }

    return filteredTasks;
}

function returnArrayHtml(task) {
    let contactHtml;
    contactHtml = '';
    for (let i = 0; i < task.assignContacts.length; i++) {
        const allContacts = task.assignContacts[i];
        contactHtml += /*html*/`
    <div style="${allContacts.color};" class="userCircle">${allContacts.nameAbbreviation}</div>
    `;
    }
    return /*html*/`
    <div id='taskNote${task.id}' draggable='true' ondragstart='startDragAnimation(${task.id})' class="taskContainer">
        <span style="${task.categoryColor}" class="taskCategorySpan">${task.category}</span>
        <div class="titelDescriptionBox">
            <span class="titelSpan">${task.title}</span>
            <span class="descriptionSpan">${task.description}</span>
        </div>
        <div class="progressSection">
            <div class="progress-container">
                <div class="progress-bar" style="width: ${100 / (task.subtasksInProgress.length / task.subtasksFinish.length)};"></div>
            </div>
            <span class="progressSpan">${task.subtasksFinish.length}/${task.subtasksInProgress.length} Subtasks</span>
        </div>
        <div class="taskFooter">
            <div class="taskUserCircles">
                ${contactHtml}
            </div>
            <img class="prioIcon" src="src/img/prio${task.priority}.svg" alt="prio-icon">
        </div>
    </div>    
    `;
}

function returnEmptyBox(text) {
    return /*html*/`
    <div class="empty-label">${text}</div>
    `;
}

function startDragAnimation(id) {
    let task = document.getElementById(`taskNote${id}`)
    dragElement = id;
    task.classList.add('rotating');
}

function removeDragClass() {
    let ids = ['boardToDo', 'boardInProgress', 'boardAwaitFeedback', 'boardDone'];
    ids.forEach(function (id) {
        let box = document.getElementById(id);
        box.classList.remove('taskSectionDrag');
    });
}
/**
 * It prevents the default behavior of the browser (which blocks dragging by default)
 * 
 * @param {DragEvent} ev - The drag event object
 */
function allowDrop(ev, id) {
    let box = document.getElementById(id);
    box.classList.add('taskSectionDrag');
    ev.preventDefault();
}

async function moveTo(group) {
    let index = tasks.findIndex(object => object.id === dragElement);
    tasks[index].status = group;
    await currentUserTaskSave();
    renderAllTasks();
}

function showAddTaskPopup(status) {
    let box = document.getElementById('addTaskPopUp');
    box.classList.remove('d-none');
    statusGroup = status;
}

function closeAddTaskPopup() {
    let box = document.getElementById('addTaskPopUp');
    box.classList.add('d-none');
    statusGroup = '';
}