import { gsap } from 'gsap';

document.addEventListener('DOMContentLoaded', function () {
    init();
});

function init() {
    const tl = gsap.timeline();
    const duration = 0.7;
    tl.from('.mainTitle', {
        duration: duration,
        opacity: 0,
        scale: 25,
        ease: 'slow',
    })
        .from('.title', {
            duration: duration,
            opacity: 0,
            scale: 25,
            ease: 'slow',
        })
        .from('.superman img', {
            duration: duration,
            x: -700,
            skewX: '-40deg',
            ease: 'power4.in',
        })

        .to('.mainTitle', {
            duration: duration,
            right: -50,
            ease: 'bounce.out',
        })
        .to(
            '.tool',
            {
                duration: duration,
                top: 150,
                ease: 'bounce.out',
                stagger: 0.3,
            },
            duration * 3
        );

    document.getElementById('start').addEventListener('click', function () {
        tl.restart();
    });

    document.getElementById('pause').addEventListener('click', function () {
        tl.pause();
    });
    document.getElementById('stop').addEventListener('click', function () {
        tl.pause();
    });
    document.getElementById('reverse').addEventListener('click', function () {
        tl.reverse();
    });
}
