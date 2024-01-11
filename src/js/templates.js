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

//-------------Arrays for guest---------------//
/**
 * Fills default test data for the guest login. This data includes sample contacts, tasks, and categories.
 */
function fillTestArray() {
    contactsArray = [
        {
            "name": "Anja Sonnenberger",
            "nameAbbreviation": "AS",
            "email": "hdsfvdsjfjf@web.de",
            "phone": "6546465464",
            "color": "background: #D2691E",
            "id": 2
        },
        {
            "name": "David Peterka",
            "nameAbbreviation": "DP",
            "email": "testDavid@web.de",
            "phone": "012345678",
            "color": "background: #228B22",
            "id": 0
        },
        {
            "name": "Devin Krause",
            "nameAbbreviation": "DK",
            "email": "hjfjf@web.de",
            "phone": "4648463543",
            "color": "background: #DC143C",
            "id": 1
        },
        {
            "name": "Kevin Meister",
            "nameAbbreviation": "KM",
            "email": "hjfjfstars@web.de",
            "phone": "846464654654",
            "color": "background: #00008B",
            "id": 3
        }
    ];



    tasks = [
        {
            "id": 9,
            "status": "toDo",
            "category": "New Category",
            "categoryColor": "background: #8B0000",
            "title": "First Task",
            "description": "description task one",
            "dueDate": "17/01/2024",
            "priority": "Urgent",
            "assignContacts": [
                {
                    "name": "David Peterka",
                    "nameAbbreviation": "DP",
                    "email": "testDavid@web.de",
                    "phone": "012345678",
                    "color": "background: #228B22",
                    "id": 0
                },
                {
                    "name": "Devin Krause",
                    "nameAbbreviation": "DK",
                    "email": "hjfjf@web.de",
                    "phone": "4648463543",
                    "color": "background: #DC143C",
                    "id": 1
                },
                {
                    "name": "Kevin Meister",
                    "nameAbbreviation": "KM",
                    "email": "hjfjfstars@web.de",
                    "phone": "846464654654",
                    "color": "background: #00008B",
                    "id": 3
                }
            ],
            "subtasksInProgress": [
                "First Subtask",
                "Second Subtask",
                "Third Subtask"
            ],
            "subtasksFinish": []
        },
        {
            "id": 10,
            "status": "inProgress",
            "category": "Technical Task",
            "categoryColor": "background: #1FD7C1",
            "title": "Second task",
            "description": "description two",
            "dueDate": "16/01/2024",
            "priority": "Medium",
            "assignContacts": [
                {
                    "name": "Anja Sonnenberger",
                    "nameAbbreviation": "AS",
                    "email": "hdsfvdsjfjf@web.de",
                    "phone": "6546465464",
                    "color": "background: #D2691E",
                    "id": 2
                },
                {
                    "name": "David Peterka",
                    "nameAbbreviation": "DP",
                    "email": "testDavid@web.de",
                    "phone": "012345678",
                    "color": "background: #228B22",
                    "id": 0
                },
                {
                    "name": "Devin Krause",
                    "nameAbbreviation": "DK",
                    "email": "hjfjf@web.de",
                    "phone": "4648463543",
                    "color": "background: #DC143C",
                    "id": 1
                }
            ],
            "subtasksInProgress": [
                "first",
                "second",
                "third"
            ],
            "subtasksFinish": []
        },
        {
            "id": 11,
            "status": "done",
            "category": "User Story",
            "categoryColor": "background: #0038FF",
            "title": "Third task",
            "description": "description three",
            "dueDate": "16/01/2024",
            "priority": "Low",
            "assignContacts": [
                {
                    "name": "David Peterka",
                    "nameAbbreviation": "DP",
                    "email": "testDavid@web.de",
                    "phone": "012345678",
                    "color": "background: #228B22",
                    "id": 0
                },
                {
                    "name": "Kevin Meister",
                    "nameAbbreviation": "KM",
                    "email": "hjfjfstars@web.de",
                    "phone": "846464654654",
                    "color": "background: #00008B",
                    "id": 3
                }
            ],
            "subtasksInProgress": "",
            "subtasksFinish": ""
        }
    ];

    ownCategorys = {
        "name": [
            "New Category",
            "My Category"
        ],
        "color": [
            "background: #8B0000",
            "background: #FFA500"
        ]
    }
    currentId = 12;
    contactId = 4;
    currentUserTaskSave();
    currentUserIdSave();
    currentUserCategorysSave();
    currentUserContactsSave();
}

