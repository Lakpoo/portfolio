document.addEventListener("DOMContentLoaded", function () {
    const resolver = {
        resolve: function resolve(options, callback) {
            const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
            const combinedOptions = Object.assign({}, options, { resolveString: resolveString });

            function getRandomInteger(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            };

            function randomCharacter(characters) {
                return characters[getRandomInteger(0, characters.length - 1)];
            };

            function doRandomiserEffect(options, callback) {
                const characters = options.characters;
                const timeout = options.timeout;
                const element = options.element;
                const partialString = options.partialString;

                let iterations = options.iterations;

                setTimeout(() => {
                    if (iterations >= 0) {
                        const nextOptions = Object.assign({}, options, { iterations: iterations - 1 });

                        if (iterations === 0) {
                            element.textContent = partialString;
                        } else {
                            element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
                        }

                        doRandomiserEffect(nextOptions, callback);
                    } else if (typeof callback === "function") {
                        callback();
                    }
                }, options.timeout);
            };

            function doResolverEffect(options, callback) {
                const resolveString = options.resolveString;
                const characters = options.characters;
                const offset = options.offset;
                const partialString = resolveString.substring(0, offset);
                const combinedOptions = Object.assign({}, options, { partialString: partialString });

                doRandomiserEffect(combinedOptions, () => {
                    const nextOptions = Object.assign({}, options, { offset: offset + 1 });

                    if (offset <= resolveString.length) {
                        doResolverEffect(nextOptions, callback);
                    } else if (typeof callback === "function") {
                        callback();
                    }
                });
            };

            doResolverEffect(combinedOptions, callback);
        }
    };

    const strings = [
        'Bonjour,',
        'Good morning,',
        'Dzień dobry,',
        'Buongiorno,'];
    let counter = 0;

    const options = {
        //initialisation
        offset: 0,
        // Timeout between each random character
        timeout: 5,
        // Nombre de caractere aleatoire genere
        iterations: 10,
        // lettre random qui peuvent tomber
        characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
        // string qui est creer avec les caracteres random
        resolveString: strings[counter],
        element: document.querySelector('[data-target-resolver]')
    };

    function callback() {
        setTimeout(() => {
            counter++;

            if (counter >= strings.length) {
                counter = 0;
            }

            let nextOptions = Object.assign({}, options, { resolveString: strings[counter] });
            resolver.resolve(nextOptions, callback);
        }, 3000); // Délai en millisecondes avant de passer à la phrase/mot suivante
    }

    resolver.resolve(options, callback);

    const navLinks = document.querySelectorAll('.nav-bar-a');

    // Parcourez chaque lien et ajoutez un écouteur d'événement au clic
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Empêche le comportement par défaut du lien

            // Récupérez l'identifiant de la section cible à partir de l'attribut "href"
            const targetId = link.getAttribute('href').substring(1);

            // Récupérez l'élément de la section cible
            const targetElement = document.getElementById(targetId);

            // Vérifiez si l'élément cible existe
            if (targetElement) {
                // Utilisez la fonction scrollIntoView pour effectuer le défilement en douceur
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

//bar de progret
var lineBar = new ProgressBar.Line("#ligne-progress", {
    strokeWidth: 4,
    trailWidth: 0.5,
    from: { color: "#FF9900" },
    to: { color: "#00FF99" },
    text: {
        value: '0',
        className: 'progress-text',
        style: {
            color: 'black',
            position: 'absolute',
            top: '-30px',
            padding: 0,
            margin: 0,
            transform: null
        }
    },
    step: (state, shape) => {
        shape.path.setAttribute("stroke", state.color);
        shape.setText(Math.round(shape.value() * 100) + ' %');
    }
});

lineBar.animate(1, {
    duration: 2000
});
