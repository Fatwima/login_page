


const validationPatterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d@$!%*#?&]{6,}$/
};

const validationMessages = {
    email: {
        required: 'Email address is required',
        invalid: 'Please enter a valid email address (e.g., name@domain.com)',
        valid: 'Email address looks good!'
    },
    password: {
        required: 'Password is required',
        minLength: 'Password must be at least 6 characters',
        pattern: 'Password must contain at least one letter and one number',
        valid: 'Password meets requirements'
    }
};


document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    loadSavedCredentials();
});

function initializeApp() {
   
    setupEventListeners();
   
    addInputAnimations();
    
    initializeTooltips();
}


function setupEventListeners() {
  
    loginForm.addEventListener('submit', handleFormSubmit);
 
    emailInput.addEventListener('input', () => validateField('email'));
    passwordInput.addEventListener('input', () => validateField('password'));
    
  
   
    togglePassword.addEventListener('click', togglePasswordVisibility);
    
    roleOptions.forEach(option => {
        option.addEventListener('click', () => selectRole(option));
    });
    
}

// ===== ROLE SELECTION =====
function selectRole(selectedOption) {
    // Remove active class from all options
    roleOptions.forEach(option => {
        option.classList.remove('active');
        option.style.transform = '';
    });
    
    // Add active class to selected option
    selectedOption.classList.add('active');
    selectedOption.style.transform = 'scale(0.98)';
    
    // Remove transform after animation
    setTimeout(() => {
        selectedOption.style.transform = '';
    }, 150);
    
   
}
    errorElement.textContent = '';
    errorElement.classList.remove('show');
    validationIcon.classList.remove('error', 'success', 'hidden');
    
    // Check if field is empty
    if (!value) {
        showError(fieldName, 'required');
        return false;
    }
    
    // Field-specific validation
    let isValid = false;
    
    if (fieldName === 'email') {
        isValid = validationPatterns.email.test(value);
        if (!isValid) {
            showError(fieldName, 'invalid');
            return false;
        }
    } else if (fieldName === 'password') {
        if (value.length < 6) {
            showError(fieldName, 'minLength');
            return false;
        }
        
        if (!validationPatterns.password.test(value)) {
            showError(fieldName, 'pattern');
            return false;
        }
        
        isValid = true;
    }
    
    if (isValid) {
        showSuccess(fieldName);
        return true;
    }
    
    return false;

function showError(fieldName, errorType) {
    const input = fieldName === 'email' ? emailInput : passwordInput;
    const errorElement = fieldName === 'email' ? emailError : passwordError;
    const validationIcon = input.parentNode.querySelector('.validation-icon');
    
    errorElement.textContent = validationMessages[fieldName][errorType];
    errorElement.classList.add('show');
    
    validationIcon.classList.remove('hidden', 'success');
    validationIcon.classList.add('error');
    
    input.parentNode.style.animation = 'shake 0.3s ease';
    setTimeout(() => {
        input.parentNode.style.animation = '';
    }, 300);
}

function showSuccess(fieldName) {
    const input = fieldName === 'email' ? emailInput : passwordInput;
    const errorElement = fieldName === 'email' ? emailError : passwordError;
    const validationIcon = input.parentNode.querySelector('.validation-icon');
    
    errorElement.textContent = '';
    errorElement.classList.remove('show');
    
    validationIcon.classList.remove('hidden', 'error');
    validationIcon.classList.add('success');
    
    validationIcon.style.animation = 'bounceIn 0.5s ease';
    setTimeout(() => {
        validationIcon.style.animation = '';
    }, 500);
}
function handleFormSubmit(e) {
    e.preventDefault();
    
    const isEmailValid = validateField('email');
    const isPasswordValid = validateField('password');
    
    if (!isEmailValid || !isPasswordValid) {
        showFormStatus('Please fix the errors above', 'error');
        return;
    }
    const formData = {
        email: emailInput.value.trim(),
        password: passwordInput.value,
        role: getSelectedRole(),
        remember: rememberCheckbox.checked,
        timestamp: new Date().toISOString()
    };
    
    showLoadingState(true);
    setTimeout(() => {
        simulateLogin(formData);
        showLoadingState(false);
    }, 1500);
}
      
function togglePasswordVisibility() {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    
    
    togglePassword.classList.toggle('fa-eye');
    togglePassword.classList.toggle('fa-eye-slash');

    togglePassword.style.transform = 'scale(1.2)';
    setTimeout(() => {
        togglePassword.style.transform = '';
    }, 200);
}
function handleRememberMe() {
    if (rememberCheckbox.checked) {
        console.log('Remember me enabled');
    } else {
        console.log('Remember me disabled');
    }
}

function handleForgotPassword(e) {
    e.preventDefault();
    
    // Show forgot password modal/flow
    const email = prompt('Enter your email address to reset your password:');
    
    if (email) {
        
        } else {
            showFormStatus('Please enter a valid email address', 'error');
        }
    }

    
function getSelectedRole() {
    const activeOption = document.querySelector('.role-option.active');
    return activeOption ? activeOption.dataset.role : 'student';
}

function addInputAnimations() {
   
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounceIn {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); opacity: 1; }
        }
        
        .fa-spinner {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const roleOptions = document.querySelectorAll('.role-option');
const formStatus = document.getElementById('formStatus');
const rememberCheckbox = document.getElementById('remember');
const forgotPasswordLink = document.querySelector('.forgot-password');
const signupLink = document.getElementById('signupLink');
