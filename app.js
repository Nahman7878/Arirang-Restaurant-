 document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navbar || !navMenu) return;

    // 1. Inject the necessary mobile menu styles directly via JS to keep CSS file untouched
    const styleInject = document.createElement('style');
    styleInject.innerHTML = `
        @media (max-width: 768px) {
            /* Force navbar back to row layout to keep logo and hamburger aligned */
            .navbar {
                flex-direction: row !important;
                flex-wrap: wrap;
                position: relative;
            }

            /* Dynamically override the horizontal scroll to create a vertical dropdown drop */
            .nav-menu {
                display: none;
                width: 100% !important;
                overflow-x: visible !important;
                background: rgba(13, 13, 13, 0.95);
                position: absolute;
                top: 100%;
                left: 0;
                z-index: 999;
                padding: 20px 0;
                border-radius: 8px;
                backdrop-filter: blur(10px);
                box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            }

            .nav-menu.active {
                display: block !important;
            }

            nav ul {
                flex-direction: column !important;
                align-items: center !important;
                gap: 20px !important;
            }

            /* Hamburger Button Styling */
            .hamburger-btn {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 30px;
                height: 21px;
                background: transparent;
                border: none;
                cursor: pointer;
                padding: 0;
                z-index: 1000;
            }

            .hamburger-btn span {
                width: 100%;
                height: 3px;
                background-color: white;
                border-radius: 2px;
                transition: all 0.3s ease;
            }

            /* Transform to "X" when active */
            .hamburger-btn.active span:nth-child(1) {
                transform: translateY(9px) rotate(45deg);
            }
            .hamburger-btn.active span:nth-child(2) {
                opacity: 0;
            }
            .hamburger-btn.active span:nth-child(3) {
                transform: translateY(-9px) rotate(-45deg);
            }
        }

        @media (min-width: 769px) {
            .hamburger-btn {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(styleInject);

    // 2. Create the Hamburger Button Element
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger-btn';
    hamburger.setAttribute('aria-label', 'Toggle navigation');
    hamburger.innerHTML = '<span></span><span></span><span></span>';

    // 3. Insert hamburger before the reservation button (or append to navbar)
    const reserveBtn = navbar.querySelector('.reserve-btn');
    if (reserveBtn) {
        navbar.insertBefore(hamburger, reserveBtn);
    } else {
        navbar.appendChild(hamburger);
    }

    // 4. Toggle functionality
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a navigation link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});