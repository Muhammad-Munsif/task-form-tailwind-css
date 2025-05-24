document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous errors
        resetErrors();
        
        // Validate form
        if (validateForm()) {
            // Form is valid - process submission (in a real app, you would send to server)
            console.log('Form submitted:', {
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                email: form.email.value,
                phone: form.phone.value,
                subject: form.subject.value,
                message: form.message.value,
                agree: form.agree.checked
            });
            
            // Show success message
            successMessage.classList.remove('hidden');
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 5000);
        }
    });
    
    function validateForm() {
        let isValid = true;
        
        // Validate first name
        const firstName = form.firstName.value.trim();
        if (firstName === '') {
            showError('firstName', 'First name is required');
            isValid = false;
        } else if (firstName.length < 2) {
            showError('firstName', 'First name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate last name
        const lastName = form.lastName.value.trim();
        if (lastName === '') {
            showError('lastName', 'Last name is required');
            isValid = false;
        } else if (lastName.length < 2) {
            showError('lastName', 'Last name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate email
        const email = form.email.value.trim();
        if (email === '') {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate phone (optional but must be valid if provided)
        const phone = form.phone.value.trim();
        if (phone && !isValidPhone(phone)) {
            showError('phone', 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate subject
        const subject = form.subject.value;
        if (subject === '') {
            showError('subject', 'Please select a subject');
            isValid = false;
        }
        
        // Validate message
        const message = form.message.value.trim();
        if (message === '') {
            showError('message', 'Message is required');
            isValid = false;
        } else if (message.length < 10) {
            showError('message', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        // Validate agreement checkbox
        if (!form.agree.checked) {
            showError('agree', 'You must agree to the terms and conditions');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}Error`);
        
        // Add error class to input
        field.classList.add('error-border');
        
        // Display error message
        errorElement.textContent = message;
    }
    
    function resetErrors() {
        // Remove all error styles and messages
        const errorFields = form.querySelectorAll('.error-border');
        errorFields.forEach(field => {
            field.classList.remove('error-border');
        });
        
        const errorMessages = form.querySelectorAll('[id$="Error"]');
        errorMessages.forEach(message => {
            message.textContent = '';
        });
    }
    
    function isValidEmail(email) {
        // Simple email validation regex
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function isValidPhone(phone) {
        // Simple phone validation - allows various formats
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return re.test(phone);
    }
});