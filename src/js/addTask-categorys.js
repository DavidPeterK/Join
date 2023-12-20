//Category functions//
/**
 * Renders the categories into the specified container.
 */
function renderCategorys() {
    let container = document.getElementById('categoryContent');
    container.innerHTML = '';
    showCategoryContainer();
    renderMainCategorys(container);
    renderOwnCategorys(container);
}

function showCategoryContainer() {
    let container = document.getElementById('categoryContainer');
    container.classList.remove('d-none');
}

function hideCategoryContainer() {
    let container = document.getElementById('categoryContainer');
    container.classList.add('d-none');
}

function renderMainCategorys(container) {
    for (let m = 0; m < mainCategorys.name.length; m++) {
        const mName = mainCategorys.name[m];
        const mColor = mainCategorys.color[m];
        container.innerHTML += returnRenderMainCategorys(mName, mColor, m);
    }
}

function returnRenderMainCategorys(mName, mColor, m) {
    return /*html*/`
    <div onclick='selectCategory(${m}, "main")' id='mainCategory${m}' class="categoryRow">
        <span class="category-span">${mName}</span>
        <div style="display: flex; align-items: center; gap: 8px;">
            <div style="${mColor}" class="colorCircleSmall"></div>
        </div>
    </div>`;
}

function renderOwnCategorys(container) {
    for (let a = 0; a < ownCategorys.name.length; a++) {
        const aName = ownCategorys.name[a];
        const aColor = ownCategorys.color[a];
        container.innerHTML += returnRenderOwnCategorys(aName, aColor, a);
    }
}

function returnRenderOwnCategorys(aName, aColor, a) {
    return /*html*/`
    <div onclick='selectCategory(${a}, "own")' id='mainCategory${a}' class="categoryRow">
        <span class="category-span">${aName}</span>
        <div style="display: flex; align-items: center; gap: 8px;">
            <img class="greyHoverIcon" src="src/img/subTaskDelete.svg" alt="">
            <div style="${aColor}" class="colorCircleSmall"></div>
        </div>
    </div>`;

}

function selectCategory(i, type) {
    let input = document.getElementById('categoryInput');
    if (type === 'main') {
        input.value = mainCategorys.name[i];
        fillSelectedCategoryArray(i, type);
    }
    if (type === 'own') {
        input.value = ownCategorys.name[i];
        fillSelectedCategoryArray(i, type);
    }
    hideCategoryContainer();
}

function fillSelectedCategoryArray(i, type) {
    if (type === 'main') {
        currentCategorySelected.name = mainCategorys.name[i];
        currentCategorySelected.color = mainCategorys.color[i];
        currentCategorySelected.type = type;
    }
    if (type === 'own') {
        currentCategorySelected.name = ownCategorys.name[i];
        currentCategorySelected.color = ownCategorys.color[i];
        currentCategorySelected.type = type;
    }
}

/**
 * Renders available color options for categories.
 */
function createCategoryColors() {
    let colorContainer = document.getElementById('colorSettingBox');
    colorContainer.innerHTML = '';
    for (let index = 0; index < colorCollection.length; index++) {
        const color = colorCollection[index];
        colorContainer.innerHTML += returnCreateCategoryColors(color, index);
    }
}

/**
 * Returns an HTML string representing a color circle, with optional selection.
 */
function returnCreateCategoryColors(color, index) {
    if (color === selectedColorIndex) {
        return /*html*/ `
        <div onclick='selectColor("${color}")' style="${color}" id='colorCircle${index}' class="colorCircle selectedColor"></div>
        `;
    } else {
        return /*html*/ `
        <div onclick='selectColor("${color}")' style="${color}" id='colorCircle${index}' class="colorCircle"></div>
        `;
    }
}

function selectColor(color) {
    if (selectedColorIndex === color) {
        selectedColorIndex = '';
    } else {
        selectedColorIndex = color;
        createCategoryColors();
    }
}

/**
 * Checks if category input is valid, and if so, creates a new category.
 */
function confirmCreateCategory() {
    if (isValidCategoryInput()) {
        createNewCategory();
        renderCategorys();
        clearCreateWindow();
    } else {
        alertInvalidInput();
    }
}

/**
 * Validates the input for category creation.
 */
function isValidCategoryInput() {
    let input = document.getElementById('newCategoryName');
    return input.value.length > 0 && selectedColorIndex !== null;
}

/**
 * Clears the category creation window. 
 */
function clearCreateWindow() {
    let input = document.getElementById('newCategoryName');
    input.value = '';
    selectedColorIndex = null;
    saveTaskDetails();
}

function alertInvalidInput() {
    let inputContainer = document.getElementById('newCategoryNameContainer')
    let warnText = document.getElementById('warnCategoryInput');
    inputContainer.classList.add('red-border');
    warnText.classList.remove('d-none');
    setTimeout(() => {
        inputContainer.classList.remove('red-border');
        warnText.classList.add('d-none');
    }, 4000);
}

/**
 * Creates and adds a new category to the `allCategorys` array.
 */
async function createNewCategory() {
    let newCategoryName = document.getElementById('newCategoryName');
    ownCategorys[0].name.push(newCategoryName.value);
    ownCategorys[0].color.push(selectedColorIndex);
    await currentUserCategorysSave();
    saveTaskDetails();
    renderCategorys();
    closeCategoryPopUp();
    clearCreateWindow();
    changesSaved('Category successfully created');
}

/**
 * Clears the category creation window and hides the category creation popup.
 */
function stopCreateCategory() {
    renderCategorys();
    clearCreateWindow();
}

function closeCategoryPopUp() {
    let popup = document.getElementById('categoryPopUp');
    popup.classList.add('d-none');
}

function showCategoryPopUp() {
    let popup = document.getElementById('categoryPopUp');
    popup.classList.remove('d-none');
    createCategoryColors();
}
//-------------------------------------------------------------//
