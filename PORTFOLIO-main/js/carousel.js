/* ============================================================
   PROJECT CAROUSELS — one per .carousel-block
   ============================================================ */
(function () {
    'use strict';

    const GAP = 32; // matches CSS gap: 2rem = 32px

    function getVisible() {
        return window.innerWidth <= 768 ? 1 : 3;
    }

    function initCarousel(block) {
        const track   = block.querySelector('.carousel-track');
        const prevBtn = block.querySelector('.prev-btn');
        const nextBtn = block.querySelector('.next-btn');
        if (!track || !prevBtn || !nextBtn) return;

        const cards = Array.from(track.querySelectorAll('.project-card'));
        if (!cards.length) return;

        let index = 0;

        /* ── sizing ── */
        function sizeCards() {
            const vw      = block.querySelector('.carousel-viewport').offsetWidth;
            const visible = getVisible();
            const w       = (vw - GAP * (visible - 1)) / visible;
            cards.forEach(c => {
                c.style.flex     = `0 0 ${w}px`;
                c.style.minWidth = `${w}px`;
            });
        }

        /* ── translate ── */
        function go(animate) {
            if (!animate) {
                track.style.transition = 'none';
                track.offsetHeight;          // force reflow
            }
            const cardW  = cards[0].offsetWidth;
            const offset = index * (cardW + GAP);
            track.style.transform = `translateX(-${offset}px)`;
            if (!animate) {
                requestAnimationFrame(() => {
                    track.style.transition = '';
                });
            }
            prevBtn.disabled = index === 0;
            nextBtn.disabled = index >= cards.length - getVisible();
        }

        /* ── events ── */
        prevBtn.addEventListener('click', () => {
            if (index > 0) { index--; go(true); }
        });
        nextBtn.addEventListener('click', () => {
            if (index < cards.length - getVisible()) { index++; go(true); }
        });

        /* ── touch / swipe ── */
        let startX = 0;
        block.addEventListener('touchstart', e => {
            startX = e.changedTouches[0].clientX;
        }, { passive: true });
        block.addEventListener('touchend', e => {
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                const max = cards.length - getVisible();
                if (diff > 0 && index < max)  { index++; go(true); }
                if (diff < 0 && index > 0)    { index--; go(true); }
            }
        }, { passive: true });

        /* ── resize ── */
        window.addEventListener('resize', () => {
            index = Math.min(index, Math.max(0, cards.length - getVisible()));
            sizeCards();
            go(false);
        });

        /* ── init ── */
        sizeCards();
        go(false);
    }

    document.querySelectorAll('.carousel-block').forEach(initCarousel);
})();
