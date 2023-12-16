function markNavButton() {

}

/**
 * Asynchronously initializes the summary section.
 */
async function initSummary() {
    loadActivUser();
    userCircle();
    await loadAllTasks();
    loadDetails();
    markCategory();
    addAnimationOnResize();
    animationAdded = false;
}

/**
 * Loads and sets specific texts for the summary section.
 * and loads the date for urgent priorities.
*/
function loadDetails() {
    daylyGreeting();
    loadUserName();
    loadNumbers();
    loadUrgentPrioDate();
}

//----------------------search function------------------------------
//---------------------Search User name----------------------------//
/**
 * Loads the active user's name and sets it to the corresponding HTML element.
 * It fetches the DOM element with the ID 'name' and updates its inner text with the name of the active user.
 */
function loadUserName() {
    let userName = document.getElementById('greetingUser');
    userName.innerText = activUser.name;
}

/**
 * This function is used to load a function if someone resize the page
 * 
 */
function addAnimationOnResize() {
    if (window.innerWidth <= 1200) {
        addAnimation();
        animationAdded = true;
    } else if (window.innerWidth > 1200) {
        const greetingText = document.querySelector('.greeting-text');
        greetingText.classList.remove('fade-out');
        greetingText.classList.remove('hidden');
        animationAdded = false;
    }
}

/**
 * This function is used to create an animation to fade out the greeting message
 * 
 */
function addAnimation() {
    const greetingText = document.querySelector('.greeting-text');
    greetingText.classList.add('fade-out');

    setTimeout(function () {
        greetingText.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 2000);
}


/**
 * This function loads the next urgent due date
 * 
 */
function loadUrgentPrioDate() {
    let container = document.getElementById('urgentDate');
    const nextUrgentDate = getNextUrgentDueDate(tasks);

    if (nextUrgentDate) {
        const convertedDate = convertDateFormat(nextUrgentDate);
        container.innerHTML = convertedDate;
    } else {
        container.innerHTML = "No urgent due dates";
    }
}

//----------------- load Time of Day------------------
/**
 * This function shows the greeting for the user
 * 
 */
function daylyGreeting() {
    let dayTimeContainer = document.getElementById('dayTimeGreeting');
    dayTimeContainer.innerHTML = getTimeOfDay();
}

/**
 * This function returns greeting based on the current time of day
 * 
 */
function getTimeOfDay() {
    const time = new Date().getHours();
    if (time >= 0 && time < 8) {
        dayTimeGreeting('morning');
    } else if (time >= 8 && time < 12) {
        dayTimeGreeting('day');
    } else if (time >= 12 && time < 18) {
        dayTimeGreeting('afternoon');
    } else {
        dayTimeGreeting('evening');
    }
}

function dayTimeGreeting(dayTime) {
    return /*html*/ `
    <span class="time-of-day">Good&nbsp</span>
    <span class="time-of-day">${dayTime}</span>`;
}

/**
 * This function searches the next urgent due date
 * 
 */
function getNextUrgentDueDate(tasks) {
    const urgentTasks = tasks.filter(task => task.priority === "./img/prioUrgent.svg");

    if (urgentTasks.length === 0) return null;
    urgentTasks.sort((a, b) => {
        const dateA = new Date(a.dueDate.split("/").reverse().join("-"));
        const dateB = new Date(b.dueDate.split("/").reverse().join("-"));
        return dateA - dateB;
    });
    return urgentTasks[0].dueDate;
}

/**
 * Converts a date string in the format "DD/MM/YYYY" to a more human-readable format "MonthName DD, YYYY".
 * @param {string} inputDate - The date string to be converted, in the format "DD/MM/YYYY".
 * @example
 * // returns "January 01, 2021"
 * convertDateFormat("01/01/2021");
 */
function convertDateFormat(inputDate) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const parts = inputDate.split("/");
    const day = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const year = parts[2];
    return `${months[monthIndex]} ${day}, ${year}`;
}

/**
 * This function searches the number of tasks in the respective category
 * 
 */
function loadNumbers() {
    let todo = tasks.filter(t => t['status'] == 'toDo').length;
    let inProgress = tasks.filter(t => t['status'] == 'in-progress').length;
    let awaitingFeedback = tasks.filter(t => t['status'] == 'awaiting-feedback').length;
    let done = tasks.filter(t => t['status'] == 'done').length;
    let allTasks = tasks.length
    let urgent = tasks.filter(t => t['priority'] == './img/prioUrgent.svg').length;
    displayNumbers(todo, inProgress, awaitingFeedback, done, allTasks, urgent)
}

/**
 * This function shows the number of tasks in the respective category
 * 
 */
function displayNumbers(todo, inProgress, awaitingFeedback, done, allTasks, urgent) {
    document.getElementById('todoNumber').innerHTML = todo;
    document.getElementById('doneNumber').innerHTML = done;
    document.getElementById('awaitingFeedback').innerHTML = awaitingFeedback;
    document.getElementById('tasksInProgress').innerHTML = inProgress;
    document.getElementById('tasksInBoard').innerHTML = allTasks;
    document.getElementById('urgentNumber').innerHTML = urgent;
}
