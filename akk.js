document.addEventListener('DOMContentLoaded', function() {

    const loginForm = document.getElementById('loginForm');
    const loginFormInner = document.getElementById('loginFormInner');
    const registerForm = document.getElementById('registerForm');
    const registerFormInner = document.getElementById('registerFormInner');
    const loginErrorMessage = document.getElementById('loginErrorMessage');
    const registerErrorMessage = document.getElementById('registerErrorMessage');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const loggedInUsernameSpan = document.getElementById('loggedInUsername');
    const logoutButton = document.getElementById('logoutButton');
    const showRegisterFormLink = document.getElementById('showRegisterForm');
    const showLoginFormLink = document.getElementById('showLoginForm');

    // ----------------------------------------------------------------
    // Local Storage Functions
    // ----------------------------------------------------------------

    function saveUserData(name, username, password) {
        localStorage.setItem('name', name); // Store the name
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        updateHeader();
    }

    function getUserData() {
        const name = localStorage.getItem('name'); // Retrieve name
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        return {
            name,
            username,
            password
        };
    }

    function clearUserData() {
        localStorage.removeItem('name'); // Remove name
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        updateHeader();
    }

    // ----------------------------------------------------------------
    // UI Functions
    // ----------------------------------------------------------------

    function showWelcomeMessage(name) {
        loginForm.classList.add('hidden');
        registerForm.classList.add('hidden');
        welcomeMessage.classList.remove('hidden');
        loggedInUsernameSpan.textContent = name; // Display the name instead of username
    }

    function showLoginForm() {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        welcomeMessage.classList.add('hidden');
    }

    // ----------------------------------------------------------------
    // Event Listener Functions
    // ----------------------------------------------------------------

    logoutButton.addEventListener('click', function() {
        clearUserData();
        showLoginForm();
        window.location.href = './akk.html' // back to the auth page
    });

    loginFormInner.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const storedUserData = getUserData();

        if (storedUserData && storedUserData.username === username && storedUserData.password === password) {
            loginErrorMessage.textContent = '';
            loginErrorMessage.classList.remove('error-message');
            showWelcomeMessage(storedUserData.name); // Display welcome message with the name
            window.location.href = './index.html' //go to main page
        } else {
            loginErrorMessage.classList.add('error-message');
            loginErrorMessage.textContent = 'Неправильное имя пользователя или пароль.';
        }
    });

    registerFormInner.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('registerName').value;
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;

        const storedUserData = getUserData(); // Get existing user data

        if (storedUserData && storedUserData.username === username) {
            registerErrorMessage.classList.add('error-message');
            registerErrorMessage.textContent = 'Это имя пользователя уже занято. Пожалуйста, выберите другое.';
        } else {
            saveUserData(name, username, password);
            registerErrorMessage.textContent = '';
            registerErrorMessage.classList.remove('error-message');
            window.location.href = './index.html' //redirect to main page
            showWelcomeMessage(name); // show welcome message by name
        }
    });

    showRegisterFormLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });

    showLoginFormLink.addEventListener('click', function(event) {
        event.preventDefault();
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    // ----------------------------------------------------------------
    // Initialization
    // ----------------------------------------------------------------

    // Initial check on page load to show forms or welcome message
    const storedUserData = getUserData();
    if (storedUserData && storedUserData.username && storedUserData.password) {
        showWelcomeMessage(storedUserData.name); // Show welcome message with the name
    } else {
        showLoginForm();
    }

    // ----------------------------------------------------------------
    // Additional UI Functions (Updated)
    // ----------------------------------------------------------------

    function updateHeader() {
        const navItems = document.querySelector('.nav-items');
        const userData = getUserData();
        const userProfile = document.getElementById('userProfile');

        // Clear previous content
        userProfile.innerHTML = '';

        // If user is logged in
        if (userData && userData.username) {
            const userProfileElement = document.createElement('div');
            userProfileElement.classList.add('user-profile-element');
            const userIcon = document.createElement('i');
            userIcon.classList.add('fas', 'fa-user-circle');

            const usernameProfileSpan = document.createElement('span');
            usernameProfileSpan.textContent = ` ${userData.name}`;

            userProfileElement.appendChild(userIcon);
            userProfileElement.appendChild(usernameProfileSpan);

            // Create the logout link with an icon
            const logoutLink = document.createElement('a');
            logoutLink.href = "#";
            logoutLink.innerHTML = '<i class="fas fa-sign-out-alt"></i>'; // Use a Font Awesome icon
            logoutLink.title = "Выйти"; // Add a tooltip for accessibility
            logoutLink.style.marginLeft = '10px'; // Add some spacing

            logoutLink.addEventListener('click', function(event) {
                event.preventDefault();
                clearUserData(); // Clear local storage
                updateHeader(); // Update the display
                window.location.href = './index.html'; // Redirect
            });

            userProfileElement.appendChild(logoutLink);
            userProfile.appendChild(userProfileElement);


            const accountLink = navItems.querySelector('.account-link');
            if (accountLink) { //remove accountLink
                accountLink.remove();
            }
            const akkPageLink = document.querySelector('a[href="akk.html"]');
            if (akkPageLink) {
                akkPageLink.style.display = "none";
            }

        } else {
            const loginLink = document.createElement('a');
            loginLink.href = "akk.html";
            loginLink.textContent = "Войти";
            userProfile.appendChild(loginLink);

            const akkPageLink = document.querySelector('a[href="akk.html"]');
            if (akkPageLink) {
                akkPageLink.style.display = "block";
            }
            const accountLink = navItems.querySelector('.account-link');
            if (accountLink) {

                accountLink.remove();
            }
        }
    }
    // Call updateHeader on page load
    updateHeader();
});