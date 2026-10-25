document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('nexaContactForm');
    const fullName = document.getElementById('fullName');
    const emailAddr = document.getElementById('emailAddr');
    const phoneNumber = document.getElementById('phoneNumber');
    const userMessage = document.getElementById('userMessage');
    const successMsg = document.getElementById('formSuccessMsg');

    // Helper: Show Error
    function showError(input, message) {
        const formGroup = input.parentElement;
        formGroup.classList.remove('success');
        formGroup.classList.add('error');
        const errorElement = formGroup.querySelector('.error-msg');
        errorElement.innerText = message;
    }

    // Helper: Show Success
    function showSuccess(input) {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
        const errorElement = formGroup.querySelector('.error-msg');
        errorElement.innerText = '';
    }

    // Helper: Validate Email Format
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Helper: Validate Phone Format (Digits, Spaces, +, -, 10-15 chars)
    function isValidPhone(phone) {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/;
        return re.test(phone.trim());
    }

    // Form Submit Event Listener
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let isValid = true;

        // 1. Validate Full Name
        if (fullName.value.trim() === '') {
            showError(fullName, 'Please enter your full name.');
            isValid = false;
        } else if (fullName.value.trim().length < 3) {
            showError(fullName, 'Name must be at least 3 characters.');
            isValid = false;
        } else {
            showSuccess(fullName);
        }

        // 2. Validate Email
        if (emailAddr.value.trim() === '') {
            showError(emailAddr, 'Email address is required.');
            isValid = false;
        } else if (!isValidEmail(emailAddr.value.trim())) {
            showError(emailAddr, 'Please enter a valid email address.');
            isValid = false;
        } else {
            showSuccess(emailAddr);
        }

        // 3. Validate Phone Number
        if (phoneNumber.value.trim() === '') {
            showError(phoneNumber, 'Phone number is required.');
            isValid = false;
        } else if (!isValidPhone(phoneNumber.value.trim())) {
            showError(phoneNumber, 'Please enter a valid phone number.');
            isValid = false;
        } else {
            showSuccess(phoneNumber);
        }

        // 4. Validate Message
        if (userMessage.value.trim() === '') {
            showError(userMessage, 'Please write your message.');
            isValid = false;
        } else if (userMessage.value.trim().length < 10) {
            showError(userMessage, 'Message should be at least 10 characters long.');
            isValid = false;
        } else {
            showSuccess(userMessage);
        }

        // If all inputs are valid
        if (isValid) {
            successMsg.innerText = 'Thank you! Opening your email client to send the message...';
            successMsg.style.display = 'block';

            // Construct mailto link
            const mailtoSubject = encodeURIComponent('New Inquiry from ' + fullName.value.trim());
            const mailtoBody = encodeURIComponent(
                'Full Name: ' + fullName.value.trim() + '\n' +
                'Email: ' + emailAddr.value.trim() + '\n' +
                'Phone: ' + phoneNumber.value.trim() + '\n\n' +
                'Message:\n' + userMessage.value.trim()
            );

            // Redirect to Mail Client
            setTimeout(function () {
                window.location.href = `mailto:info@nexaadvisory.com?subject=${mailtoSubject}&body=${mailtoBody}`;
                form.reset();
                document.querySelectorAll('.form-group').forEach(group => group.classList.remove('success'));
            }, 1000);
        }
    });
});