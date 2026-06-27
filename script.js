document.addEventListener('DOMContentLoaded', () => {
    const signUpToggle = document.getElementById('signUpToggle');
    const signInToggle = document.getElementById('signInToggle');
    const container = document.getElementById('container');
    
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const demoAutofill = document.getElementById('demoAutofill');

    // ================= 1. FLUID PANEL TOGGLE SWITCH INTERACTION =================
    signUpToggle.addEventListener('click', () => {
        container.classList.add('right-panel-active');
        clearValidationErrors();
    });

    signInToggle.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
        clearValidationErrors();
    });

    // ================= 2. SECURE PASSWORD TOGGLE OVERLAYS =================
    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordInput = this.parentElement.querySelector('input');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.textContent = '🙈';
            } else {
                passwordInput.type = 'password';
                this.textContent = '👁️';
            }
        });
    });

    // ================= 3. TESTING SUITE AUTOFILL HANDLER =================
    if (demoAutofill) {
        demoAutofill.addEventListener('click', () => {
            document.getElementById('signInEmail').value = "alex.chen@rkhub.io";
            document.getElementById('signInPassword').value = "SuperSecurePass123";
            demoAutofill.style.transform = "scale(0.95)";
            setTimeout(() => demoAutofill.style.transform = "scale(1)", 100);
        });
    }

    // ================= 4. COMPONENT FIELD VALIDATION ENGINE =================
    function showError(inputElement, message) {
        inputElement.classList.add('error-input');
        let errorDiv = inputElement.parentElement.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('span');
            errorDiv.className = 'error-message';
            inputElement.parentElement.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }

    function clearValidationError(inputElement) {
        inputElement.classList.remove('error-input');
        const errorDiv = inputElement.parentElement.querySelector('.error-message');
        if (errorDiv) errorDiv.remove();
    }

    function clearValidationErrors() {
        document.querySelectorAll('input').forEach(input => clearValidationError(input));
    }

    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => clearValidationError(input));
    });

    // Login Form Submission Rules
    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        const email = document.getElementById('signInEmail');
        const password = document.getElementById('signInPassword');

        if (!email.value.includes('@') || email.value.length < 5) {
            showError(email, 'Please provide a valid corporate email address.');
            isValid = false;
        }
        if (password.value.length < 6) {
            showError(password, 'Password security rules require 6+ characters.');
            isValid = false;
        }

        if (isValid) {
            alert('Sign In successful! Redirecting to workspace environment...');
        }
    });

    // Registration Form Submission Rules
    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const handle = document.getElementById('handle');
        const email = document.getElementById('signUpEmail');
        const mobile = document.getElementById('mobile');
        const password = document.getElementById('signUpPassword');
        const confirmPassword = document.getElementById('confirmPassword');
        const terms = document.getElementById('terms');

        if (!firstName.value.trim()) { showError(firstName, 'Required'); isValid = false; }
        if (!lastName.value.trim()) { showError(lastName, 'Required'); isValid = false; }
        if (!handle.value.trim()) { showError(handle, 'Handle name is required.'); isValid = false; }
        if (!email.value.includes('@')) { showError(email, 'Invalid email structure.'); isValid = false; }
        if (mobile.value.length < 7) { showError(mobile, 'Invalid number format.'); isValid = false; }
        
        if (password.value.length < 8) {
            showError(password, 'Security minimum: 8 characters required.');
            isValid = false;
        }
        if (password.value !== confirmPassword.value) {
            showError(confirmPassword, 'The confirmation target does not match original password.');
            isValid = false;
        }
        if (!terms.checked) {
            alert('You must explicitly review and accept our Terms of Service to continue.');
            isValid = false;
        }

        if (isValid) {
            alert('Registration complete! Check your email to verify your RK Hub access node.');
        }
    });
});