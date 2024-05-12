
let dde = document.documentElement;

function init_document() {
    document.getElementById('scrollToTopBtn').addEventListener('click', function() {
        if (keep_on_scrolling) {
            keep_on_scrolling = !keep_on_scrolling;
            return;
        }
        let total_to_scroll = dde.scrollHeight-dde.clientHeight;
        let scroll_from_the_top = dde.scrollTop;
        let cross_thingy = scroll_from_the_top * 3000 / total_to_scroll;
        scrollTo(0, cross_thingy);
        reset_visibility();
    });
    document.getElementById('scrollToBtmBtn').addEventListener('click', function() {
        if (keep_on_scrolling) {
            keep_on_scrolling = !keep_on_scrolling;
            return;
        }
        scrollTo(document.documentElement.scrollHeight-document.documentElement.clientHeight, 300);
        reset_visibility();
    });
    document.getElementById("increase_max_image").addEventListener("click", function(event) {
        if (event.ctrlKey) {
            update_max_image(5);
        } else {
            update_max_image(1);
        }
    });
    document.getElementById("decrease_max_image").addEventListener("click", function(event) {
        if (event.ctrlKey) {
            update_max_image(-5);
        } else {
            update_max_image(-1);
        }
    });
    document.addEventListener('keydown', function (event) {
        if ('r' === event.key) {
            window.clearInterval(intervals);
            getImages();
            auto_refresh(do_refresh);
        } else if ('s' === event.key) {
            auto_refresh(!do_refresh);
        } else if (event.key === '=' || event.code === 'NumpadAdd') {
            update_max_image(1);
        } else if (event.key === '-') {
            update_max_image(-1);
        } 
    });
    document.addEventListener('wheel', function (event) {
        stop_auto_scrolling();
    });
    window.addEventListener('scroll', function (event) {
        reset_visibility();
    });
}

function reset_visibility() {
    let scrollToTopBtn = document.getElementById('scrollToTopBtn');
    let scrollToBtmBtn = document.getElementById('scrollToBtmBtn');
    if (window.scrollY > 100) {
        scrollToTopBtn.classList.add('active');
        scrollToBtmBtn.classList.remove('active');
    } else {
        scrollToTopBtn.classList.remove('active');
        scrollToBtmBtn.classList.add('active');
    }
    let dde = document.documentElement;
    if (keep_on_scrolling && 
        (dde.scrollTop > 10
            || dde.scrollHeight-dde.clientHeight-dde.scrollTop < 10)) {
        scrollToTopBtn.classList.remove('active');
        scrollToBtmBtn.classList.remove('active');
    }
}