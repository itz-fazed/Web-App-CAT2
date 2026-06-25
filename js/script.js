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

        const cloneItems = (track) => {
            const originalItems = Array.from(track.children);
            originalItems.forEach(item => track.appendChild(item.cloneNode(true)));
            originalItems.forEach(item => track.appendChild(item.cloneNode(true)));
        };

        cloneItems(topTrack);
        cloneItems(bottomTrack);

        let isUserInteracting = false;
        const speed = 0.34; 

        const initLoop = () => {
        const computedGap = parseFloat(window.getComputedStyle(topTrack).gap) || 48;
        const itemWidth = topTrack.children[0].offsetWidth + computedGap;
        const totalOriginalWidth = itemWidth * 5; // 5 is your original item count

        bottomTrack.scrollLeft = totalOriginalWidth;

        function glideRunways() {
            if (!isUserInteracting) {
                topTrack.scrollLeft += speed;
                if (topTrack.scrollLeft >= totalOriginalWidth) {
                    topTrack.scrollLeft -= totalOriginalWidth;
                }

                bottomTrack.scrollLeft -= speed;
                if (bottomTrack.scrollLeft <= 0) {
                    bottomTrack.scrollLeft += totalOriginalWidth;
                }
            }
            requestAnimationFrame(glideRunways);
        }
        requestAnimationFrame(glideRunways);
    };

    // Runs immediately if images are cached, or waits if they are still downloading
    if (topTrack.children[0].offsetWidth > 0) {
        initLoop();
    } else {
        window.addEventListener("load", initLoop);
    }

        [topTrack, bottomTrack].forEach(track => {
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

            const endDrag = () => {
                isDown = false;
                track.style.cursor = "grab";
                setTimeout(() => { isUserInteracting = false; }, 1500);
            };

            track.addEventListener("mouseleave", endDrag);
            track.addEventListener("mouseup", endDrag);

            track.addEventListener("mousemove", (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - track.offsetLeft;
                const walk = (x - startX) * 1.5;
                track.scrollLeft = scrollLeft - walk;
            });

            track.addEventListener("touchstart", () => { isUserInteracting = true; });
            track.addEventListener("touchend", () => { setTimeout(() => { isUserInteracting = false; }, 1500); });
        });
});