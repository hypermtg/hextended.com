// https://scryfall.com/card/mmq/61/brainstorm
// https://img.scryfall.com/cards/large/en/mmq/61.jpg?1517813031

const scryfallLinks = document.querySelectorAll(`a[href*="scryfall.com/card/"]`);

document.querySelector('body').insertAdjacentHTML('beforeend', `<img id="scryfall-hover" style="display: block; position: absolute; width: 250px; height: auto;"/>`);
const scryfallHover = document.querySelector('#scryfall-hover');

const mouseMoveEvent = (e) => {
    scryfallHover.style.left = `${e.pageX + 10}px`;
    scryfallHover.style.top = `${e.pageY + 10}px`;
};

const showScryfallImage = (url) => {
    document.addEventListener('mousemove', mouseMoveEvent);
    scryfallHover.src = url;
    scryfallHover.style.display = 'block';
};

const hideScryfallImage = () => {
    document.removeEventListener('mousemove', mouseMoveEvent);
    scryfallHover.src = '';
    scryfallHover.style.display = 'none';
}

scryfallLinks.forEach(link => {
    const path = new URL(link.href).pathname.split('/');
    const imageUrl = `https://img.scryfall.com/cards/normal/en/${path[2]}/${path[3]}.jpg`;
    link.classList.add('scryfall-hover');

    link.addEventListener('mouseover', () => {
        showScryfallImage(imageUrl);
    });

    link.addEventListener('mouseout', () => {
        hideScryfallImage();
    });
});
