
let currentStep = 1;
const totalSteps = 4;
const formData = {};

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.classList.toggle('dark', currentTheme === 'dark');

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    const newTheme = html.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
});

// Get user data from login page
function getUserDataFromLogin() {
    try {
        // Try to get data from localStorage (set in login.html)
        const userData = localStorage.getItem('userData');
        if (userData) {
            const parsedData = JSON.parse(userData);

            // Pre-fill the form with user data
            if (parsedData.name) {
                document.getElementById('full-name').value = parsedData.name;
            }

            if (parsedData.email) {
                document.getElementById('email').value = parsedData.email;
            }

            console.log('User data loaded from login:', parsedData);
        } else {
            console.log('No user data found in localStorage');

            // For demo purposes, let's add some sample data
            document.getElementById('full-name').value = 'Chandan Saha';
            document.getElementById('email').value = 'john.doe@example.com';
        }
    } catch (error) {
        console.error('Error loading user data:', error);
    }
}

// File Upload Functionality
const fileUploadArea = document.querySelector('.file-upload-area');
const profilePhotoInput = document.getElementById('profile-photo');
const photoPreview = document.getElementById('photo-preview');
const previewImage = document.getElementById('preview-image');
const photoPlaceholder = document.getElementById('photo-placeholder');

fileUploadArea.addEventListener('click', () => {
    profilePhotoInput.click();
});

fileUploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileUploadArea.classList.add('dragover');
});

fileUploadArea.addEventListener('dragleave', () => {
    fileUploadArea.classList.remove('dragover');
});

fileUploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    fileUploadArea.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFileUpload(files[0]);
    }
});

profilePhotoInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFileUpload(e.target.files[0]);
    }
});

function handleFileUpload(file) {
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.src = e.target.result;
            photoPreview.classList.remove('hidden');
            photoPlaceholder.classList.add('hidden');
        };
        reader.readAsDataURL(file);
    }
}

// Skill Selection
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('skill-chip')) {
        e.target.classList.toggle('selected');
    }
});

// Step Navigation
function nextStep() {
    if (validateCurrentStep()) {
        saveCurrentStepData();
        if (currentStep < totalSteps) {
            showStep(currentStep + 1);
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        showStep(currentStep - 1);
    }
}

function showStep(stepNumber) {
    // Hide current step
    const currentStepElement = document.getElementById(`step-${currentStep}`);
    currentStepElement.classList.add('step-slide-exit');

    setTimeout(() => {
        currentStepElement.classList.add('hidden');
        currentStepElement.classList.remove('step-slide-exit');

        // Show new step
        currentStep = stepNumber;
        const newStepElement = document.getElementById(`step-${currentStep}`);
        newStepElement.classList.remove('hidden');
        newStepElement.classList.add('step-slide-enter');

        setTimeout(() => {
            newStepElement.classList.remove('step-slide-enter');
        }, 50);

        updateProgressIndicator();
    }, 200);
}

function updateProgressIndicator() {
    const steps = document.querySelectorAll('.progress-step');
    const lines = document.querySelectorAll('.progress-line');

    steps.forEach((step, index) => {
        const stepNumber = index + 1;
        step.classList.remove('active', 'completed');

        if (stepNumber < currentStep) {
            step.classList.add('completed');
        } else if (stepNumber === currentStep) {
            step.classList.add('active');
        }
    });

    lines.forEach((line, index) => {
        line.classList.toggle('completed', index < currentStep - 1);
    });
}

function validateCurrentStep() {
    const currentStepElement = document.getElementById(`step-${currentStep}`);
    const requiredFields = currentStepElement.querySelectorAll('[required]');

    for (let field of requiredFields) {
        if (!field.value.trim()) {
            field.focus();
            field.style.borderColor = '#ef4444';
            setTimeout(() => {
                field.style.borderColor = '';
            }, 3000);
            return false;
        }
    }

    return true;
}

function saveCurrentStepData() {
    const currentStepElement = document.getElementById(`step-${currentStep}`);
    const inputs = currentStepElement.querySelectorAll('input, select');

    inputs.forEach(input => {
        if (input.type === 'radio') {
            if (input.checked) {
                formData[input.name] = input.value;
            }
        } else {
            formData[input.id] = input.value;
        }
    });

    // Save selected skills and interests
    if (currentStep === 3) {
        formData.skills = Array.from(document.querySelectorAll('#technical-skills .skill-chip.selected'))
            .map(chip => chip.dataset.skill);
        formData.interests = Array.from(document.querySelectorAll('#interests .skill-chip.selected'))
            .map(chip => chip.dataset.interest);
    }
}

function finishSetup() {
    if (validateCurrentStep()) {
        saveCurrentStepData();
        showSuccessScreen();
    }
}

function showSuccessScreen() {
    // Hide current step
    const currentStepElement = document.getElementById(`step-${currentStep}`);
    currentStepElement.classList.add('step-slide-exit');

    setTimeout(() => {
        currentStepElement.classList.add('hidden');
        currentStepElement.classList.remove('step-slide-exit');

        // Show success screen
        const successScreen = document.getElementById('success-screen');
        successScreen.classList.remove('hidden');
        successScreen.classList.add('step-slide-enter');

        setTimeout(() => {
            successScreen.classList.remove('step-slide-enter');
        }, 50);

        // Update progress to show all completed
        const steps = document.querySelectorAll('.progress-step');
        const lines = document.querySelectorAll('.progress-line');

        steps.forEach(step => {
            step.classList.remove('active');
            step.classList.add('completed');
        });

        lines.forEach(line => {
            line.classList.add('completed');
        });

        // Trigger confetti
        createConfetti();
    }, 200);
}

function createConfetti() {
    const colors = ['#2563eb', '#facc15', '#10b981', '#ef4444', '#8b5cf6'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 100);
    }
}

function goToDashboard() {
    alert('Congratulations! Your profile setup is complete. In a real application, this would redirect you to the internship dashboard where you can start exploring opportunities!');
    console.log('Profile Data:', formData);
    window.location.href = "../HTML/user_dashboard.html"; 
}

// Initialize
updateProgressIndicator();