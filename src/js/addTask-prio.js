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
