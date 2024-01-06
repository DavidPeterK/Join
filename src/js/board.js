let dragElement;

async function initBoard() {
    loadActivUser();
    userCircleLoad();
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
    <div onclick='renderCurrentTaskPopUp(${task.id})' id='taskNote${task.id}' draggable='true' ondragstart='startDragAnimation(${task.id})' class="taskContainer">
        <span style="${task.categoryColor}" class="taskCategorySpan">${task.category}</span>
        <div class="titelDescriptionBox">
            <span class="titelSpan">${task.title}</span>
            <span class="descriptionSpan">${task.description}</span>
        </div>
        <div class="progressSection">
            <div class="progress-container">
                <div class="progress-bar" style="width: ${100 / (task.subtasksInProgress.length / task.subtasksFinish.length)}%;"></div>
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

function renderCurrentTaskPopUp(id) {
    let container = document.getElementById('currentTaskPopUp');
    let index = tasks.findIndex(object => object.id === id);
    let array = tasks[index];
    container.classList.remove('d-none');
    container.innerHTML = returnCurrentTaskPopUp(array);
    renderContactRowPopUp(array);
    renderSubtaskRowPopUp(array, index);
}

function closeCurrentTaskPopUp() {
    let container = document.getElementById('currentTaskPopUp');
    container.classList.add('d-none');
    container.innerHTML = '';
}

function returnCurrentTaskPopUp(array) {
    return /*html*/`
            <div class="currentTaskPopUpPosition">

                <div style="display: flex; width: 100%; align-items: center; justify-content: space-between">
                    <span style="${array.categoryColor}" class="currentTaskCategorySpan">${array.category}</span>
                    <img onclick='closeCurrentTaskPopUp()' class="currentTaskCrossPop" src="src/img/crossAddTask.svg" alt="cross">
                </div>
                <span class="currentTaskTitelSpan">${array.title}</span>
                <span class="currentTaskDescriptionSpan">${array.description}</span>
                <div
                    style="display: flex; align-items: center; justify-content: flex-start; gap: 24px; align-self: stretch;">
                    <span class="currentTaskSpan">Due date:</span>
                    <span class="currentTaskDescriptionSpan">${array.dueDate}</span>
                </div>
                <div
                    style="display: flex; align-items: center; justify-content: flex-start; gap: 24px; align-self: stretch;">
                    <span style="align-self: stretch;" class="currentTaskSpan">Priority:</span>
                    <span style="padding: 0px 18px; gap: 10px;" class="currentTaskDescriptionSpan">${array.priority}<img
                            src="src/img/prio${array.priority}.svg" alt=""></span>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-start; width: 100%; gap: 8px;">
                    <span style="align-self: stretch;" class="currentTaskSpan">Assigned To:</span>
                    <div id='contactRowPopUp' style="display: flex; flex-direction: column; align-items: flex-start; width: 100%; max-height: 250px; overflow-y: auto;">
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-start; width: 100%; gap: 8px;">
                    <span style="align-self: stretch;" class="currentTaskSpan">Subtasks</span>
                    <div id='subtaskRowPopUp' style="display: flex; flex-direction: column; align-items: flex-start; width: 100%; max-height: 250px; overflow-y: auto;">
                    </div>
                </div>
                <div style="display: flex; align-items: center; justify-content: flex-end; width: 100%; gap: 8px;">
                    <div class="currentTaskButton"><img style="width: 24px; height: 24px;"
                            src="src/img/subTaskDelete.svg" alt="">Delete</div>
                    <div style="width: 1px; background: #d1d1d1; height: 24px;"></div>
                    <div class="currentTaskButton"><img style="width: 24px; height: 24px;"
                            src="src/img/PenAddTask 1=edit.svg" alt="">Edit</div>
                </div>
            </div>    
            `;
}

function renderContactRowPopUp(array) {
    let contactRow = document.getElementById('contactRowPopUp');
    contactRow.innerHTML = '';
    for (let i = 0; i < array.assignContacts.length; i++) {
        const allContacts = array.assignContacts[i];
        contactRow.innerHTML += /*html*/`
        <div class="currentTaskContactRow">
             <div style="${allContacts.color}" class="currentTaskContactCircle">${allContacts.nameAbbreviation}</div>
            <span class="currentTaskContactName">${allContacts.name}</span>
        </div>`;
    }
}

async function moveASubtask(index, subtask) {
    let array = tasks[index];
    let subtaskFinishId = array.subtasksFinish;
    if (subtaskFinishId.some(subTasks => subTasks === subtask)) {
        let indexSub = subtaskFinishId.findIndex(subTasks => subTasks === subtask);
        subtaskFinishId.splice(indexSub, 1);
        await currentUserTaskSave();
    } else {
        subtaskFinishId.push(subtask);
        await currentUserTaskSave();
    }
    renderSubtaskRowPopUp(array, index);
}

function renderSubtaskRowPopUp(array, index) {
    let subtaskRow = document.getElementById('subtaskRowPopUp');
    subtaskRow.innerHTML = '';
    let progress = '';
    for (let i = 0; i < array.subtasksInProgress.length; i++) {
        let subtask = array.subtasksInProgress[i];
        if (array.subtasksFinish.some(subTasks => subTasks === subtask)) {
            progress = 'src/img/done.svg';
        } else {
            progress = 'src/img/addTaskBox.svg';
        }
        subtaskRow.innerHTML += /*html*/`
        <div onclick="moveASubtask(${index}, '${subtask}')" id='subtaskRow${i}' class="currentTaskHover" style="display: flex; align-items: center; justify-content: center; gap: 16px; padding: 6px 16px;">
            <img src="${progress}" alt="">
            <span class="currentTaskSubtaskSpan">${subtask}</span>
        </div> `;
    }
}


