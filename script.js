document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio site loaded.");


    const textPath = document.querySelector("#text-path");
    const baseText = textPath.textContent.trim();
    const repeatedText = (baseText + " ").repeat(10); 
    textPath.textContent = repeatedText;

    let currentPosition = -194;
    const scrollSpeed = 0.8; 
    const maxOffset = 530;
    let isScrolling;
    let animationFrameId;


    function animate() {
        currentPosition -= scrollSpeed * 0.1; 
        if (currentPosition < -maxOffset) {
            currentPosition = 0;
        }
        textPath.setAttribute("startOffset", `${currentPosition}%`);
        animationFrameId = requestAnimationFrame(animate);
    }


    animate();


    window.addEventListener("wheel", (event) => {
        event.preventDefault();
        cancelAnimationFrame(animationFrameId);

        if (event.deltaY > 0) {
            currentPosition -= scrollSpeed;
        } else {
            currentPosition += scrollSpeed;
        }

        if (currentPosition < -maxOffset) currentPosition = 0;
        if (currentPosition > 0) currentPosition = -maxOffset;

        textPath.setAttribute("startOffset", `${currentPosition}%`);

        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            animate();
        }, 150);
    }, { passive: false });


    let touchStartY = 0;

    window.addEventListener('touchstart', (event) => {
        touchStartY = event.touches[0].clientY;
        cancelAnimationFrame(animationFrameId);
    }, { passive: false });

    window.addEventListener('touchmove', (event) => {
        event.preventDefault();
        const touchEndY = event.touches[0].clientY;
        const deltaY = touchEndY - touchStartY;

        currentPosition += deltaY * 0.1;

        if (currentPosition < -maxOffset) currentPosition = 0;
        if (currentPosition > 0) currentPosition = -maxOffset;

        textPath.setAttribute("startOffset", `${currentPosition}%`);
        touchStartY = touchEndY;
    }, { passive: false });

    window.addEventListener('touchend', () => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            animate();
        }, 150);
    });


    window.addEventListener("scroll", () => {
        window.scrollTo(0, 0);
    });


    document.querySelectorAll('video').forEach(video => {
        video.play().catch(error => console.log("Video play failed:", error));
    });


    window.addEventListener('resize', () => {
   
        const introText = document.querySelector('.intro-text');
        const moreInfoText = document.querySelector('.more-info');
        const scrollText = document.querySelector('.scroll-container text');

        const newFontSize = window.innerWidth / 100;
        introText.style.fontSize = `${newFontSize}px`;
        moreInfoText.style.fontSize = `${newFontSize}px`;
        scrollText.style.fontSize = `${newFontSize * 2.5}px`;
    });


    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const customCursor = document.querySelector('#custom-cursor');
    
    if (isMobile) {
        if (customCursor) {
            customCursor.style.display = 'none';
        }
    }

  
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {

        const floatClass = `float-${(index % 3) + 1}`;
        item.classList.add(floatClass);


        item.addEventListener('mouseenter', () => {
            console.log(`Hovering over: ${item.id}`);

            item.style.animation = 'none';
        });

        item.addEventListener('mouseleave', () => {
            console.log(`Stopped hovering over: ${item.id}`);

            item.style.animation = '';
        });
    });


    document.querySelectorAll('video').forEach(video => {
        video.play().catch(error => console.log("Video play failed:", error));
    });


    if (!isMobile && customCursor) {
        const cursorShapes = ['✷', '☆', '✦', '꩜'];
        let shapeIndex = localStorage.getItem('cursorShapeIndex') 
            ? parseInt(localStorage.getItem('cursorShapeIndex'), 10) 
            : 0;
        
        customCursor.innerHTML = cursorShapes[shapeIndex];

        document.addEventListener('mousemove', (e) => {
            customCursor.style.left = `${e.clientX}px`;
            customCursor.style.top = `${e.clientY}px`;
        });

        document.addEventListener('click', () => {
            shapeIndex = (shapeIndex + 1) % cursorShapes.length;
            customCursor.innerHTML = cursorShapes[shapeIndex];
            localStorage.setItem('cursorShapeIndex', shapeIndex);
        });

     
        const projectCursors = {
            wayfarer: '🌐',
            caveclock: '⏰',
            onthegroove: '🎧',
            sharpcheddar: '🧀',
            theritual: '🩸',
            goodnotes: '✏️',
            thirstyrobots: '🤖',
            publication: '📖',
            misc: '🧃'
        };

        galleryItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const projectId = item.id;
                customCursor.innerHTML = projectCursors[projectId] || cursorShapes[shapeIndex];
                customCursor.classList.add('emoji');
            });
            
            item.addEventListener('mouseleave', () => {
                customCursor.innerHTML = cursorShapes[shapeIndex];
                customCursor.classList.remove('emoji');
            });
        });

   
        const homeLink = document.querySelector('.corner.top-left a');
        if (homeLink) {
            homeLink.addEventListener('mouseenter', () => {
                customCursor.innerHTML = '🏡';
            });
            homeLink.addEventListener('mouseleave', () => {
                customCursor.innerHTML = cursorShapes[shapeIndex];
            });
        }
    }
});