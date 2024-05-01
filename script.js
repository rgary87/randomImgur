var do_refresh = false;
var intervals;
var delay = 5000;
var max_image = 25;
var total_image = 0;
var links = [];
var html_links = [];
function randomString(min, max) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz";
    var output = "";
    var index;

    while (true) {
        string_length = Math.floor(Math.random() * (max - min + 1) + min);
        if (string_length != 6) {
            break;
        }
    }
    for (var i = 0; i < string_length; i++) {
        var index = Math.floor(Math.random() * chars.length);
        output += chars.substring(index, index + 1);
    }
    return output;
}

function getImages() {
    var numTries = 1;
    var imgObject = new Image();
    var max_image_height = window.innerHeight - 66;
    var tested = [];
    let imageName = randomString(5, 7);
    let aDiv = document.getElementById('loading_text_span');
    imgObject.onload = function () {
        if (this.width == 161 && this.height == 81
            || this.height < 50) { //Those value might change if imgur changes its "image removed plceholder" picture size.
            imageName = randomString(5, 7);
            tested.push(imageName);
            if (aDiv.innerHTML.endsWith(' ')) {
                aDiv.innerHTML += "Loading next picture";
            }
            aDiv.innerHTML += '.';
            numTries++;
            this.src = "http://i.imgur.com/" + imageName + ".jpg"; // changing the src triggers the onload event and thus try next random (creating a recursive) "bypassing" in a way the delay
        }
        else {
            var tested_values = ''
            tested_values = "It took " + numTries + (numTries == 1 ? " try" : " tries") + " to get this picture. <a id=\"id_load_image\" href=\"javascript:getImages();\">Load new image </a>  Tested values: ";
            for (const i in tested) {
                tested_values += tested[i];
                if (i < tested.length - 1) {
                    tested_values += "(" + tested[i].length + ")";
                    tested_values += ", ";
                } else {
                    tested_values += "<b><i>(" + tested[i].length + ")</i></b>";
                    tested_values += ". ";
                }
            }
            aDiv.innerHTML = tested_values
            var container = document.getElementById('img_container');

            var img = build_img("img_previous_links", imgObject.src);
            var a = build_a(imgObject.src, "", img);
            set_handler_on_picture_click(a);
            container.insertBefore(a, container.firstChild);
            if (container.childElementCount > max_image) {
                container.removeChild(container.lastChild)
            };
        }
    };

    // First image attempt that sets off the onload code defined above
    tested.push(imageName);
    imgObject.src = "http://i.imgur.com/" + imageName + ".jpg";
}

function init_images() {
    for (let a = 0; a < max_image; a++) {
        getImages()
    }
    auto_refresh(true)
}

function set_handler_on_picture_click(picture_link) {
    picture_link.addEventListener('click', function(event) {
        event.preventDefault();
        window.open(`single_picture.html?img=${encodeURIComponent(picture_link.id)}`, '_blank');
    });
}

function auto_refresh(refresh) {
    do_refresh = refresh;
    if (refresh) {
        if (!intervals) {
            document.getElementById('auto_refresh_button_on').style.display = 'none';
            document.getElementById('auto_refresh_button_off').style.display = 'initial';
            intervals = window.setInterval(function () {
                getImages();
            }, delay);
        }
    } else {
        document.getElementById('auto_refresh_button_on').style.display = 'initial';
        document.getElementById('auto_refresh_button_off').style.display = 'none';
        window.clearInterval(intervals);
        intervals = null;
    }
}

function increase_delay() {
    delay += 1000;
    update_delay(delay)
}

function decrease_delay() {
    delay -= delay > 1000 ? 1000 : 0;
    update_delay(delay)
}

function update_delay(d) {
    auto_refresh(false);
    auto_refresh(true);
    document.getElementById("delay_value").querySelector("span").textContent = "Delay:" + d
    getImages();
}

function increase_max_image() {
    max_image++;
    document.getElementById('max_image_value').innerHTML = '<span>Max image: ' + max_image + '</span></button>';
}

function decrease_max_image() {
    max_image = Math.max(1, max_image - 1);
    document.getElementById('max_image_value').innerHTML = '<span>Max image: ' + max_image + '</span></button>';
}
window.addEventListener('load', function () {
    document.getElementById('scrollToTopBtn').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    init_images()
    document.getElementById('max_image_value').innerHTML = '<span>Max image: ' + max_image + '</span></button>';
})
document.addEventListener('keydown', function (event) {
    if (event.keyCode === 82) { // 82 est le code ASCII de la touche 'r'
        window.clearInterval(intervals);
        getImages();
        auto_refresh(do_refresh);
    } else if (event.keyCode === 83) { // 82 est le code ASCII de la touche 'r'
        auto_refresh(!do_refresh);
    } else if (event.key === '+') { // 82 est le code ASCII de la touche 'r'
        increase_max_image();
    } else if (event.key === '-') { // 82 est le code ASCII de la touche 'r'
        decrease_max_image();
    } else {
        console.log("key was " + event.keyCode)
    }
});

window.addEventListener('scroll', function() {
    var scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (window.scrollY > 100) {
        scrollToTopBtn.classList.add('active');
    } else {
        scrollToTopBtn.classList.remove('active');
    }
});
