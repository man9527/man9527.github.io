function resize(image) {
    var size = 1024;
    if (image.width <= size) {
        return image.src;
    }

    var mainCanvas = document.createElement("canvas");

    mainCanvas.width = size;
    mainCanvas.height = image.height / (image.width/size);

    var ctx = mainCanvas.getContext("2d");
    ctx.drawImage(image, 0, 0, mainCanvas.width, mainCanvas.height);

    while (mainCanvas.width > size) {
        mainCanvas = halfSize(mainCanvas);
    }
    return mainCanvas.toDataURL("image/jpeg");
};


function halfSize (i) {
    var canvas = document.createElement("canvas");
    canvas.width = i.width / 2;
    canvas.height = i.height / 2;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(i, 0, 0, canvas.width, canvas.height);
    return canvas;
};

function loadImage(file, dvPreview) {
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg)$/;

    return new Promise(
        function(resolve, reject) {
            if (regex.test(file[0].name.toLowerCase())) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    var img = new Image();

                    img.onload = function() {
                        $thumb = $("<div id=\"" + file[0].name.toLowerCase() + "\" class=\"col-lg-4 col-md-4 col-xs-4\" style=\"text-align:center; vertical-align: middle; padding: 1vw\">" +
                            "<img class=\"centered-and-cropped img-thumbnail thumb-img\" src='" +
                            resize(this) +
                            "'/></div>");
                        dvPreview.append($thumb);
                        console.log("load done --" + file[0].name);
                        resolve("sucess");
                    }

                    img.src = e.target.result;
                }
                console.log("begin --" + file[0].name);
                reader.readAsDataURL(file[0]);

            } else {
                bootbox.alert(file[0].name + " is not a valid image file.");
                dvPreview.html("");
                return false;
            }
        }
    );
}
