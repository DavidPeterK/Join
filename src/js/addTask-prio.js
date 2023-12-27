function renderPrioSection() {
    let container = document.getElementById('prioSection');
    container.innerHTML = returnPrioSection();
}

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
//--------------for edit------------------------//
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

function returnPrioSection() {
    return /*html*/`
    <div onclick="urgentButtonClick()" id="urgentButton" class="prioButton">Urgent<img id="urgentImg"
            src="src/img/prioUrgent.svg" alt="urgent-icon"></div>
    <div onclick="mediumButtonClick()" id="mediumButton" class="prioButton">Medium<img id="mediumImg"
            src="src/img/prioMedium.svg" alt="medium-icon"></div>
    <div onclick="lowButtonClick()" id="lowButton" class="prioButton">Low<img id="lowImg"
            src="src/img/prioLow.svg" alt="low-icon"></div>`;
}