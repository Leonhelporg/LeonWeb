(function () {
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    ready(function () {
        document.documentElement.classList.add('site-ready');

        if (!reduceMotion) {
            document.body.style.opacity = '0';
            requestAnimationFrame(function () {
                document.body.style.transition = 'opacity 520ms ease';
                document.body.style.opacity = '1';
            });
        }

        var revealTargets = document.querySelectorAll('.section-shell, .tool-panel, .project-card, .mini-card, .contact-section, .profile-card');
        revealTargets.forEach(function (el) {
            el.classList.add('reveal');
        });

        if (reduceMotion || !('IntersectionObserver' in window)) {
            revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
        } else {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

            revealTargets.forEach(function (el, index) {
                el.style.transitionDelay = Math.min(index % 5, 4) * 45 + 'ms';
                observer.observe(el);
            });
        }

        if (!reduceMotion) {
            document.querySelectorAll('.stat strong').forEach(function (el) {
                var raw = el.textContent.trim();
                if (!/^\d+$/.test(raw)) return;
                var target = Number(raw);
                var current = 0;
                var step = Math.max(1, Math.ceil(target / 28));
                var timer = setInterval(function () {
                    current += step;
                    if (current >= target) {
                        el.textContent = String(target);
                        clearInterval(timer);
                    } else {
                        el.textContent = String(current);
                    }
                }, 24);
            });
        }

        var resultCount = document.getElementById('resultCount');
        if (resultCount) {
            var lastText = resultCount.textContent;
            setInterval(function () {
                if (resultCount.textContent !== lastText) {
                    lastText = resultCount.textContent;
                    resultCount.classList.add('count-flash');
                    setTimeout(function () { resultCount.classList.remove('count-flash'); }, 420);
                }
            }, 160);
        }
    });
})();
