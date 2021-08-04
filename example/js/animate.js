var animateElements = function(){

    const initCardAnimation = function() {
        const cards = document.querySelectorAll('.card')
    
        cards.forEach((card, index) => {
            card.addEventListener('mouseenter', (e) => {
                const timeline = gsap.timeline()
                timeline.to(`.card#card${index+1} .card_title`, {
                    duration: .5,
                    opacity: 0,
                    y: '20%',
                    ease: "Expo.easeInOut"
                })
                .to(`.card#card${index+1} .card_details`, {
                    duration: 1,
                    height: 'auto',
                    ease: "Expo.easeInOut"
                }, '-=.45')
                .to(`.card#card${index+1} .card_details h1`, {
                    duration: 1,
                    opacity: 1,
                    y: '0',
                    ease: "Expo.easeInOut"
                }, '-=.8')
                .to(`.card#card${index+1} .card_details p`, {
                    duration: 1,
                    opacity: 1,
                    y: '0',
                    ease: "Expo.easeInOut"
                }, '-=.98');
            });
    
            card.addEventListener('mouseleave', (e) => {
                const timeline = gsap.timeline()
                timeline.to(`.card#card${index+1} .card_details p`, {
                    duration: 1,
                    opacity: 0,
                    y: '20%',
                    ease: "Expo.easeInOut"
                })
                .to(`.card#card${index+1} .card_details h1`, {
                    duration: 1,
                    opacity: 0,
                    y: '20%',
                    ease: "Expo.easeInOut"
                }, '-=.8')
                .to(`.card#card${index+1} .card_details`, {
                    duration: 1,
                    height: '0',
                    ease: "Expo.easeInOut"
                }, '-=.8')
                .to(`.card#card${index+1} .card_title`, {
                    duration: .5,
                    opacity: 1,
                    y: '0%',
                    ease: "Expo.easeInOut"
                }, '-=.45');
            });
        });
    };
    
    const OnLoad = function() {
        const timeline = gsap.timeline(), that = this;
    
        timeline.from('header ul li h4 span', {
            delay: .4,
            duration: 1,
            width: '0',
            opacity: 0,
            ease: 'Expo.easeInOut',
        })
        .from('header ul li h4 p', {
            duration: .5,
            x: '-50%',
            opacity: 0,
            ease: 'Expo.easeInOut',
        }, '-=.2')
        .from('header ul li a', {
            duration: .5,
            x: '-50%',
            opacity: 0,
            ease: 'Expo.easeInOut',
        }, '-=.5')
        .from('.card', {
            duration: .5,
            y: '50%',
            opacity: 0,
            stagger: .1,
            ease: 'Expo.easeInOut',
        }, '-=.1');

        initCardAnimation();
    };

    OnLoad()

}

new animateElements()

