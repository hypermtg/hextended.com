// https://scryfall.com/card/mmq/61/brainstorm
// https://scryfall.com/card/:code/:number/:name
// https://api.scryfall.com/cards/:code/:number

(() => {
    const isMobile = 'ontouchstart' in document.documentElement;

    const scryfallLinks = document.querySelectorAll(`a[href*="scryfall.com"]`);
    const scryfallCardLinks = document.querySelectorAll(`a[href*="scryfall.com/card/"]`);

    const scryfallTooltip = document.querySelector('#scryfall-tooltip');
    const scryfallTooltipImage = document.querySelector('#scryfall-tooltip-image');

    scryfallTooltip.classList.add(isMobile ? 'mobile' : 'desktop');

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

    if (scryfallTooltip) {
        scryfallTooltip.addEventListener('click', () => {
            console.log('click dismiss');
            scryfallTooltip.style.display = 'none';
            scryfallTooltipImage.src = '';
        });
    }

    const scryfallImageClick = (url) => {
        scryfallTooltipImage.src = url;
        scryfallTooltip.style.display = 'grid';
    }

    const showScryfallImageHover = (url) => {
        document.addEventListener('mousemove', mouseMoveEvent);
        scryfallTooltipImage.src = url;
        scryfallTooltip.style.display = 'block';
    };

    const hideScryfallImageHover = () => {
        document.removeEventListener('mousemove', mouseMoveEvent);
        scryfallTooltipImage.src = '';
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
        const imageUrl = `https://api.scryfall.com/cards/${path[2]}/${path[3]}?format=image&version=normal&utm_source=hexended`

        link.classList.add('scryfall-hover');

        if (isMobile) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                scryfallImageClick(imageUrl);
            });
        } else {
            link.addEventListener('mouseover', () => {
                showScryfallImageHover(imageUrl);
            });

            link.addEventListener('mouseout', () => {
                hideScryfallImageHover();
            });
        }
    });
})();
