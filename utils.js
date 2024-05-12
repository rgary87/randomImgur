function build_a(id, clazz, child) {
    let link = document.createElement('a');

    // Set id if provided
    if (id) {
        link.id = id;
    }

    // Set class if provided
    if (clazz) {
        link.className = clazz;
    }

    // Append child if provided
    if (child) {
        link.appendChild(child);
    }

    return link;
}

function build_img(clazz, src) {
    // Create a new <img> element
    let img = document.createElement('img');

    // Set class if provided
    if (clazz) {
        img.className = clazz;
    }

    // Set src if provided
    if (src) {
        img.src = src;
    }

    return img;
}

function getQueryParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

function randomString(min, max) {
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz";
    let output = "";
    let index;

    while (true) {
        string_length = Math.floor(Math.random() * (max - min + 1) + min);
        if (string_length != 6) {
            break;
        }
    }
    for (let i = 0; i < string_length; i++) {
        let index = Math.floor(Math.random() * chars.length);
        output += chars.substring(index, index + 1);
    }
    return output;
}

function update_max_image(increment) {
    // Check if at maximum images and increment negative to reset the "increment button" text
    if (max_image == memory_limit_max_image && increment < 0) {
        let not_at_max_image_count = this.document.createElement('span');
        not_at_max_image_count.innerText = "Increase max images";
        let increase_max_image_button = this.document.getElementById("increase_max_image");
        while (increase_max_image_button.firstChild) {
            increase_max_image_button.removeChild(increase_max_image_button.firstChild);
        }
        increase_max_image_button.appendChild(not_at_max_image_count);
        increase_max_image_button.disabled = false;
    }

    // Update the "max image" counter text
    max_image = Math.min(memory_limit_max_image, Math.max(1, max_image + increment));
    let max_image_span = this.document.createElement('span');
    max_image_span.innerText = 'Max image: ' + max_image;
    let max_image_button = this.document.getElementById('max_image_value');
    while (max_image_button.firstChild) {
        max_image_button.removeChild(max_image_button.firstChild);
    }
    max_image_button.appendChild(max_image_span);

    // Add some images if increment is positive to get the max amount immediatelly
    if (increment > 0) {
        let img_container = this.document.getElementById("img_container");
        const diff_image_to_get = max_image - img_container.childElementCount
        for (let a = 0; a < diff_image_to_get; a++) {
            getImages();
        }
    }

    // Check if at maximum allowed images and update the "increment button" to reflect the situation
    if (max_image == memory_limit_max_image) {
        let at_max_image_count = this.document.createElement('span');
        at_max_image_count.innerText = memory_limit_max_image+" is the maximum!";
        at_max_image_count.style = "color:#fff"
        let increase_max_image_button = this.document.getElementById("increase_max_image");
        while (increase_max_image_button.firstChild) {
            increase_max_image_button.removeChild(increase_max_image_button.firstChild);
        }
        increase_max_image_button.appendChild(at_max_image_count);
        increase_max_image_button.disabled = true;
    }
}