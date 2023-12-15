//-------------Log-in---------------//
function signInHtml() {
    return /*html*/`

    <form onsubmit="login(); return false">
        <div class="column-center">
            <h3>Log in</h3>
            <div class="blueUnderline"></div>
        </div>

        <div class="input-section">

            <div class="input-container" id="input-email">
                <input required id="email" type="email" placeholder="Email">
                <img class="input-icon" src="src/img/input-mail.svg" alt="email-icon">
            </div>
            <div class="warning-field">
                <span id="warning-text-email" class="d-none">
                Please enter the appropriate email address.
                </span>
            </div>

            <div class="input-container" id="input-password">
                <input required id="password" type="password" placeholder="Password">
                <img class="input-icon" src="src/img/password-icon.svg" alt="password-icon">
            </div>
            <div class="warning-field">
                <span id="warning-text-password" class="d-none">
                Please enter the appropriate password.
                </span>
            </div>

            <div class="remember-container">
                <input type="checkbox" id="rememberMe" name="rememberMe">
                <span id="label-span">Remember me</span>
            </div>

            <div class="button-section">
                <button type="submit" id="login-button" class="button button-hover">Log in</button>
                <button onclick='guestLogin()' type="button" id="guest-login-button" class="button">Guest Log in</button>
            </div>
        </div>
    </form>
`;
}

function signUpSection() {
    return /*html*/`
    <span id="sign-up-span">Not a Join user?</span>
    <button onclick="switchContent('signUp')" id="sign-up-button" class="button button-hover">
        Sign up
    </button>
    `;
}

//-------------Register---------------//
function signUpHtml() {
    return /*html*/`
    <form onsubmit="registUser(); return false">
        <div class="sign-up-headline">
            <img class="arrow-left-img" onclick="switchContent('signIn')" src="src/img/arror-left.svg" alt="arrow left">
            <div class="column-center">
                <h3>Sign up</h3>
                <div class="blueUnderline"></div>
            </div>
            <div></div>
        </div>

        <div class="input-section">
            <div class="input-container" id="containerUserName">
                <input required type="text" minlength="4" placeholder="Name" id="userName">
                <img class="input-icon" src="src/img/input-person.svg" alt="person-icon">
            </div>


            <div class="input-container" id="inputEmail">
                <input required type="email" minlength="4" placeholder="Email" id="email">
                <img class="input-icon" src="src/img/input-mail.svg" alt="email-icon">
            </div>
            <div class="warning-field">
                <span id="warning-email" class="d-none">
                    This email address already exists.
                </span>
            </div>

            <div class="input-container" id="inputPassword">
                <input required type="password" minlength="4" placeholder="Password" id="password">
                <img class="input-icon" src="src/img/password-icon.svg" alt="password-icon">
            </div>
            <div class="warning-field">
                <span id="warning-password" class="d-none">
                    Password do not Match.
                </span>
            </div>

            <div class="input-container" id="inputConfirmPassword">
                <input required type="password" minlength="4" placeholder="Confirm Password" id="confirmPassword">
                <img class="input-icon" src="src/img/password-icon.svg" alt="password-icon">
            </div>
            <div class="warning-field">
                <span id="warning-confirmPassword" class="d-none">
                    Password do not Match.
                </span>
            </div>

            <div class="privacy-check-container">
                <input type="checkbox" value="yes" required id="checkPrivacyPolicy" name="acceptPrivacyPolicy">
                <span id="label-span">I accept the <a style="text-decoration: none" href="./privacy-police.html">Privacy policy</a></span>
            </div>

            <div class="button-section">
                <button type="submit" id="signUpButton" class="button button-hover">Sign up</button>
            </div>
        </div>
    </form>
    `;
}

//-------------Arrays---------------//
/**
 * Fills default test data for the guest login. This data includes sample contacts, tasks, and categories.
 */
function fillTestArray() {
    contactsArray = [
        {
            "name": "Bernhard Sigl", "nameAbbreviation": "BS",
            "email": "B-Test@web.de", "phone": "01631234567",
            "color": "#006400"
        },
        {
            "name": "David Peterka", "nameAbbreviation": "DP",
            "email": "test@web.de", "phone": "123456",
            "color": "#00008B"
        },
        {
            "name": "Lina Wionsek", "nameAbbreviation": "LW",
            "email": "test2@web.de", "phone": "123456",
            "color": "#8B0000"
        }];

    tasks = [{
        "id": 3,
        "status": "toDo",
        "category": "Technical Task",
        "categoryColor": "background: #1FD7C1",
        "title": "first guest task",
        "description": "text for task",
        "dueDate": "22/10/2023",
        "priority": "./img/prioUrgent.svg",
        "contactName": [
            "Bernhard Sigl",
            "David Peterka",
            "Lina Wionsek"
        ],
        "contactColor": [
            "#006400",
            "#00008B",
            "#8B0000"
        ],
        "contactAbbreviation": [
            "BS",
            "DP",
            "LW"
        ],
        "subtasksInProgress": [
            "first subtask",
            "second subtask",
            "third subtask"
        ],
        "subtasksFinish": []
    },
    {
        "id": 4,
        "status": "toDo",
        "category": "New Category",
        "categoryColor": "background: #FF6347",
        "title": "second guest task",
        "description": "text for task",
        "dueDate": "24/10/2023",
        "priority": "./img/prioMedium.svg",
        "contactName": [
            "Bernhard Sigl",
            "David Peterka",
            "Lina Wionsek"
        ],
        "contactColor": [
            "#006400",
            "#00008B",
            "#8B0000"
        ],
        "contactAbbreviation": [
            "BS",
            "DP",
            "LW"
        ],
        "subtasksInProgress": [
            "first subtask",
            "second subtask",
            "third subtask"
        ],
        "subtasksFinish": []
    },
    {
        "id": 5,
        "status": "awaiting-feedback",
        "category": "User Story",
        "categoryColor": "background: #0038FF",
        "title": "third guest task",
        "description": "text for task",
        "dueDate": "21/10/2023",
        "priority": "./img/prioUrgent.svg",
        "contactName": [
            "Bernhard Sigl",
            "David Peterka",
            "Lina Wionsek"
        ],
        "contactColor": [
            "#006400",
            "#00008B",
            "#8B0000"
        ],
        "contactAbbreviation": [
            "BS",
            "DP",
            "LW"
        ],
        "subtasksInProgress": [
            "first subtask",
            "second subtask",
            "third subtask"
        ],
        "subtasksFinish": []
    }
    ];

    allCategorys[0] = {
        "name": [
            "New Category"
        ],
        "color": [
            "background: #FF6347"
        ]
    }
    currentUserTaskSave();
    currentUserCategorysSave();
    currentUserContactsSave();
}

