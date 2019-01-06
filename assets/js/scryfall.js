// https://scryfall.com/card/mmq/61/brainstorm
// https://img.scryfall.com/cards/large/en/mmq/61.jpg?1517813031

(() => {
    const scryfallLinks = document.querySelectorAll(`a[href*="scryfall.com"]`);
    const scryfallCardLinks = document.querySelectorAll(`a[href*="scryfall.com/card/"]`);

    document.querySelector('body').insertAdjacentHTML('beforeend', `<img id="scryfall-tooltip" style="display: block; position: absolute; width: 250px; height: auto; border-radius: 11px;"/>`);
    const scryfallTooltip = document.querySelector('#scryfall-tooltip');

    const mouseMoveEvent = (e) => {
        // Adding 40 here to account for the 10 px float and any scrollbars.
        if (e.clientX + 250 + 40 > window.innerWidth) {
            scryfallTooltip.style.left = `${e.pageX - 250 - 10}px`;
        } else {
            scryfallTooltip.style.left = `${e.pageX + 10}px`;
        }

        if (e.clientY + 350 + 40 > window.innerHeight) {
            scryfallTooltip.style.top = `${e.pageY - 350 - 10}px`;
        } else {
            scryfallTooltip.style.top = `${e.pageY + 10}px`;
        }
    };

    const showScryfallImage = (url) => {
        document.addEventListener('mousemove', mouseMoveEvent);
        scryfallTooltip.src = url;
        scryfallTooltip.style.display = 'block';
    };

    const hideScryfallImage = () => {
        document.removeEventListener('mousemove', mouseMoveEvent);
        scryfallTooltip.src = '';
        scryfallTooltip.style.display = 'none';
    };

    // Add 'hextended' as the utm_source.
    scryfallLinks.forEach(link => {
        const url = new URL(link.href);
        const urlSearchParams = new URLSearchParams(url.search);
        urlSearchParams.set('utm_source', 'hextended');
        url.search = urlSearchParams.toString();
        link.href = url;
    });

    // Set the autocard target and listeners.
    scryfallCardLinks.forEach(link => {
        const path = new URL(link.href).pathname.split('/');
        const imageUrl = `https://img.scryfall.com/cards/normal/en/${path[2]}/${path[3]}.jpg?utm_source=hextended`;
        link.classList.add('scryfall-hover');

        link.addEventListener('mouseover', () => {
            showScryfallImage(imageUrl);
        });

        link.addEventListener('mouseout', () => {
            hideScryfallImage();
        });
    });
})();
