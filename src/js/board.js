async function initBoard() {
    await currentUserContactsLoad();
    await currentUserCategorysLoad();
    await loadAllTasks();
    renderToDoTasks();
}

function renderToDoTasks(filterText) {
    let box = document.getElementById('boardToDo');
    let array = tasks.filter(task => task.status === 'toDo');
    let emptyBox = document.getElementById('emptyToDo');
    box.innerHTML = '';
    if (array) {
        emptyBox.classList.add('d-none');
        boardSearch(filterText, array, box);
    } else {
        emptyBox.classList.remove('d-none');
    }
}

function renderInProgressTasks(filterText) {
    let box = document.getElementById('boardInProgress');
    let array = tasks.filter(task => task.status['inProgress']);
    box.innerHTML = '';
    if (array) {
        boardSearch(filterText, array, box);
    } else {
        document.getElementById('emptyToDo').classList.remove('d-none');
    }
}

function renderAwaitFeedbackTasks(filterText) {
    let box = document.getElementById('boardAwaitFeedback');
    let array = tasks.filter(task => task.status['awaitFeedback']);
    box.innerHTML = '';
    if (array) {

    } else {

    }
}

function renderDoneTasks(filterText) {
    let box = document.getElementById('boardDone');
    let array = tasks.filter(task => task.status['done']);
    box.innerHTML = '';
    if (array) {

    } else {

    }
}


function boardSearch(filterText, array, box) {
    let taskArray;
    if (filterText) {
        taskArray = array.filter(a => a.title[filterText]);
    } else {
        taskArray = array;
    }
    for (let t = 0; t < taskArray.length; t++) {
        const task = taskArray[t];
        box.innerHTML += returnArrayHtml(task);
    }
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
    <div class="taskContainer">
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
            <img class="prioIcon" src="src/img/prioMedium.svg" alt="prio-icon">
        </div>
    </div>    
    `;
}