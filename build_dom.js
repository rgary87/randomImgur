function build_a(id, clazz, child) {
    var link = document.createElement('a');

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
    var img = document.createElement('img');

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
