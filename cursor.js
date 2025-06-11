document.addEventListener("DOMContentLoaded", () => {
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorShapes = ['✷', '☆', '✦', '꩜'];
    let shapeIndex = localStorage.getItem('cursorShapeIndex') ? parseInt(localStorage.getItem('cursorShapeIndex'), 10) : 0;
    cursor.innerHTML = cursorShapes[shapeIndex];

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    document.addEventListener('click', () => {
        shapeIndex = (shapeIndex + 1) % cursorShapes.length;
        cursor.innerHTML = cursorShapes[shapeIndex];
        localStorage.setItem('cursorShapeIndex', shapeIndex);
    });


    const galleryItems = document.querySelectorAll('.gallery-item');
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
            cursor.innerHTML = projectCursors[projectId] || cursorShapes[shapeIndex];
            cursor.classList.add('emoji');
        });
        item.addEventListener('mouseleave', () => {
            cursor.innerHTML = cursorShapes[shapeIndex];
            cursor.classList.remove('emoji');
        });
    });


    const homeLink = document.querySelector('.corner.top-left a');
    if (homeLink) {
        homeLink.addEventListener('mouseenter', () => {
            cursor.innerHTML = '🏡';
        });
        homeLink.addEventListener('mouseleave', () => {
            cursor.innerHTML = cursorShapes[shapeIndex];
        });
    }
});