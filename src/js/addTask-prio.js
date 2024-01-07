function renderPrioSection() {
    let container = document.getElementById('prioSection');
    container.innerHTML = returnPrioSection();
}

function urgentButtonClick() {
    if (selectedPrio === 'Urgent') {
        resetUrgentButton();
        selectedPrio = '';
    } else if (selectedPrio === 'Low' || selectedPrio === 'Medium' || selectedPrio === '') {
        urgentButtonActiv();
        resetMediumButton();
        resetLowButton();
        selectedPrio = 'Urgent';
    }
}

function mediumButtonClick() {
    if (selectedPrio === 'Medium') {
        resetMediumButton();
        selectedPrio = '';
    } else if (selectedPrio === 'Low' || selectedPrio === 'Urgent' || selectedPrio === '') {
        mediumButtonActiv();
        resetUrgentButton();
        resetLowButton();
        selectedPrio = 'Medium';
    }
}

function lowButtonClick() {
    if (selectedPrio === 'Low') {
        resetLowButton();
        selectedPrio = '';
    } else if (selectedPrio === 'Medium' || selectedPrio === 'Urgent' || selectedPrio === '') {
        lowButtonActiv();
        resetMediumButton();
        resetUrgentButton();
        selectedPrio = 'Low';
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
    if (selectedPrio === 'Urgent') {
        urgentButtonActiv();
    }
    if (selectedPrio === 'Medium') {
        mediumButtonActiv();
    }
    if (selectedPrio === 'Low') {
        lowButtonActiv();
    }
    if (selectedPrio === '') {
        resetLowButton();
        resetMediumButton();
        resetUrgentButton();
    }
}

function returnPrioSection() {
    return /*html*/`
    <div onclick="urgentButtonClick()" id="urgentButton" class="prioButton">Urgent<img id="urgentImg"
            src="src/img/prioUrgent.svg" alt="urgent-icon"></div>
    <div onclick="mediumButtonClick()" id="mediumButton" class="prioButton">Medium<img id="mediumImg"
            src="src/img/prioMedium.svg" alt="medium-icon"></div>
    <div onclick="lowButtonClick()" id="lowButton" class="prioButton">Low<img id="lowImg"
            src="src/img/prioLow.svg" alt="low-icon"></div>`;
}