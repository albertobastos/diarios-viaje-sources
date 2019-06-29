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

    // image lightbox (stage map)
    const mapLink = document.querySelector(".custom-stage-map");
    if (mapLink) {
        window.Luminous && new window.Luminous(
            mapLink,
            {
                caption: function (trigger) {
                    return trigger.querySelector("img").getAttribute("alt");
                }
            }
        );
    }

    // image lightbox (stage photos)
    window.Luminous && new window.LuminousGallery(
        document.querySelectorAll(".custom-stage-media a"),
        {
            arrowNavigation: true
        },
        {
            caption: function (trigger) {
                return trigger.querySelector("img").getAttribute("alt");
            }
        }
    );

    // stage links (show container only when at least one link exists)
    let stageLinksFooter = document.querySelector('div.custom-stage-links-footer');
    if(stageLinksFooter) {
        let stageLinks = document.querySelectorAll('div.custom-stage-body a:not(.stage-gallery)');
        let ul = stageLinksFooter.querySelector('ul');

        ul.innerHTML = Array.prototype
                        .map.call(stageLinks, (link) => `<li><a href="${link.href}" title="${link.title || link.innerText}">${link.title || link.innerText}</a>`)
                        .join('\n');

        if(stageLinks.length > 0) {
            stageLinksFooter.style.display = 'block';
        }
    }
}