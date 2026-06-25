document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('invitationForm');
    
    if (form) {
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

            // If anything is wrong, cancel submission
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
    }
    
    // 2. Logic for fade-in elements on scroll
    const elementsToFade = document.querySelectorAll('.fade-in-line');

    // Only execute if there are elements to fade in
    if (elementsToFade.length > 0) {

        setTimeout(function () {
            elementsToFade.forEach(function (element) {
            element.classList.add('visible');
            }); 
        },50);
    }

    // Carousel logic
    const topTrack = document.getElementById("trackTop");
    const bottomTrack = document.getElementById("trackBottom");

    if (!topTrack || !bottomTrack) return;

    let isUserInteracting = false;
    
    // Set initial offset for the bottom track so they slide past each other dynamically
    bottomTrack.scrollLeft = 400;

    // 1. STUTTER-PROOF AUTO-ANIMATION ENGINE
    // Moves exactly 1 pixel at a time. Increase 40 to 50 or 60 to slow it down even more.
    const scrollInterval = setInterval(() => {
        if (!isUserInteracting) {
            // Top track crawls forward (Right)
            topTrack.scrollLeft += 1;
            if (topTrack.scrollLeft >= (topTrack.scrollWidth - topTrack.clientWidth)) {
                topTrack.scrollLeft = 0; // Seamless loop wrap
            }

            // Bottom track crawls backward (Left)
            bottomTrack.scrollLeft -= 1;
            if (bottomTrack.scrollLeft <= 0) {
                bottomTrack.scrollLeft = bottomTrack.scrollWidth - bottomTrack.clientWidth; // Seamless loop wrap
            }
        }
    }, 40); 

    // 2. MOUSE DRAG & TOUCH CONTROLLER (Responds to Cursor)
    const tracks = [topTrack, bottomTrack];
    
    tracks.forEach(track => {
        let isDown = false;
        let startX;
        let scrollLeft;

        track.addEventListener("mousedown", (e) => {
            isDown = true;
            isUserInteracting = true;
            track.style.cursor = "grabbing";
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });

        track.addEventListener("mouseleave", () => {
            isDown = false;
            track.style.cursor = "grab";
            setTimeout(() => { isUserInteracting = false; }, 1500); // Resume autoplay after 1.5s pause
        });

        track.addEventListener("mouseup", () => {
            isDown = false;
            track.style.cursor = "grab";
            setTimeout(() => { isUserInteracting = false; }, 1500);
        });

        track.addEventListener("mousemove", (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 1.5; // Drag sensitivity multiplier
            track.scrollLeft = scrollLeft - walk;
        });

        // Mobile Touch Support
        track.addEventListener("touchstart", () => { isUserInteracting = true; });
        track.addEventListener("touchend", () => { setTimeout(() => { isUserInteracting = false; }, 1500); });
    });
});