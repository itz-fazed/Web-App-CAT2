document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('invitationForm');
    const dateInput = document.getElementById('eventDate');
    const guestInput = document.getElementById('guestCount');

    // Automatically restrict the date calendar picker to future dates only
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    form.addEventListener('submit', function (event) {
        let isValid = true;

        // 1. Reset standard browser validation styles
        form.classList.remove('was-validated');
        dateInput.classList.remove('is-invalid');
        guestInput.classList.remove('is-invalid');

        // 2. Custom Validation Logic: Date check (Double security check for past dates)
        const selectedDate = dateInput.value;
        if (!selectedDate || selectedDate < today) {
            dateInput.classList.add('is-invalid');
            isValid = false;
        }

        // 3. Custom Validation Logic: Lounge Minimum Guest Cap
        const guests = parseInt(guestInput.value, 10);
        if (isNaN(guests) || guests < 6) {
            guestInput.classList.add('is-invalid');
            isValid = false;
        }

        // 4. Default Native Browser Validation Check (Empty fields, wrong emails)
        if (!form.checkValidity()) {
            isValid = false;
        }

        // If anything is wrong, halt submission immediately
        if (!isValid) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add('was-validated'); // Adds clean Bootstrap validation layouts
        } else {
            // Elegant placeholder for smooth handling
            event.preventDefault();
            alert('Your request has been securely routed. Welcome to the inner circle.');
        }
    }, false);
});