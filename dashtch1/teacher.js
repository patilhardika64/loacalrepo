const menuOpen = document.getElementById('menu-open');
const menuClose = document.getElementById('menu-close');
const sideBar = document.querySelector('.container .left-section');
const sidebarItems = document.querySelectorAll('.container .left-section .sidebar .item');

menuOpen.addEventListener('click', () => {
    sideBar.style.top = '0';
});

menuClose.addEventListener('click', () => {
    sideBar.style.top = '-60vh';
});

let activeItem = sidebarItems[0];

sidebarItems.forEach(element => {
    element.addEventListener('click', () => {
        if (activeItem) {
            activeItem.removeAttribute('id');
        }

        element.setAttribute('id', 'active');
        activeItem = element;

    });
});



let viewCount = 0;
let downloadCount = 0;

const viewsElement = document.getElementById('views');
const downloadsElement = document.getElementById('downloads');

document.getElementById('viewButton').addEventListener('click', function() {
    viewCount++;
    viewsElement.textContent = viewCount;
});

document.getElementById('downloadButton').addEventListener('click', function() {
    downloadCount++;
    downloadsElement.textContent = downloadCount;
});

