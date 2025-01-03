require("./src/styles/styles.css")

exports.onRouteUpdate = ({ location, prevLocation }) => {
    // cookie consent
    if(window.cookieconsent && !window.cookieconsentloaded) {
        window.cookieconsent.initialise({
            "palette": {
                "popup": {
                    "background": "#252e39"
                },
                "button": {
                "background": "#14a7d0"
                }
            },
            "content": {
                "message": "Aunque ya estés cansado de leerlo, este sitio también utiliza cookies para mantener estadísticas de tráfico.",
                "dismiss": "De acuerdo",
                "link": "Saber más"
            }
        });
        window.cookieconsentloaded = true;
    }

    // image lazy loading
    window.echo && window.echo.init({
        offset: 100,
        throttle: 250,
        unload: false
    });

    // lightbox (stage map & photos)
    if(window.SimpleLightbox) {
        const map = document.querySelectorAll('.custom-stage-map');
        const photos = document.querySelectorAll('.custom-stage-media a');

        window.SimpleLightbox.defaults = {
            ...window.SimpleLightbox.defaults,
            closeBtnCaption: 'Cerrar',
            nextBtnCaption: 'Siguiente',
            prevBtnCaption: 'Anterior',
            loadingCaption: 'Cargando...',
        };

        // copy image alt/title o wrapper link title
        // (SimpleLightbox only supports captions based on link attributes)
        [map, ...photos].forEach(a => {
            try { a.title = a.children[0].alt; } catch(err) {}
        });

        new window.SimpleLightbox({elements: map}); // map
        new window.SimpleLightbox({elements: photos}); // stage photos
    }

    // stage links (show container only when at least one link exists)
    let stageLinksFooter = document.querySelector('div.custom-stage-links-footer');
    console.log('yyy', stageLinksFooter);
    if(stageLinksFooter) {
        let stageLinks = document.querySelectorAll('div.custom-stage-body a:not(.stage-gallery)');
        let ul = stageLinksFooter.querySelector('ul');

        ul.innerHTML = Array.prototype
                        .map.call(stageLinks, (link) => `<li><a href="${link.href}" title="${link.title || link.innerText}">${link.title || link.innerText}</a>`)
                        .join('\n');
        console.log('xxx', stageLinks);

        if(stageLinks.length > 0) {
            stageLinksFooter.style.display = 'block';
        }
    }
}