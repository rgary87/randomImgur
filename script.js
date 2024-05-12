let do_refresh = false;
let intervals;
let delay = 5000;
let memory_limit_max_image = 50;
let max_image = 25;

function getImages() {
    let numTries = 1;
    let imgObject = new Image();
    let tested = [];
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
            this.src = "http://i.imgur.com/" + imageName + ".jpg"; // changing the src triggers the onload event and thus try next random (creating a recursive) "bypassing", in a way, the delay
        }
        else {
            let tested_values = ''
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
            aDiv.innerHTML = tested_values;
            let container = document.getElementById('img_container');

            let img = build_img("img_previous_links", imgObject.src);
            let a = build_a(imgObject.src, "", img);
            set_handler_on_picture_click(a);
            container.insertBefore(a, container.firstChild);
            while (container.childElementCount > max_image) {
                container.removeChild(container.lastChild)
            };
        }
    };

    // First image attempt that sets off the onload code defined above
    tested.push(imageName);
    imgObject.src = "http://i.imgur.com/" + imageName + ".jpg";
}

function init_images(refresh) {
    for (let a = 0; a < max_image; a++) {
        getImages()
    }
    auto_refresh(refresh);
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
            intervals = window.setInterval(function() {getImages()}, delay);
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


window.addEventListener('load', function () {
    init_document();

    do_refresh = true;
    let test = getQueryParam("test");
    if (test) {
        max_image = 3;
        auto_refresh(false);
    }

    let max_image_span = this.document.createElement('span');
    max_image_span.innerText = 'Max image: ' + max_image;
    let max_image_button = document.getElementById('max_image_value');
    while (max_image_button.firstChild) {
        max_image_button.removeChild(max_image_button.firstChild);
    }
    max_image_button.appendChild(max_image_span);

    init_images(do_refresh);
})
