function makeCharMap() {
    const charDictionary = {}; // Start with an empty object. Will assign keys from 0-255 and use the fromCharCode(i) as value of key
    for (let i = 0; i < 256; i++) {
        charDictionary[i] = String.fromCharCode(i);
    }
    return charDictionary;
}
const charDictionary = makeCharMap(); // These might just be unicode not technically ASCII


var rhino = new Image();
rhino.src = './rhino.jpg';
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.drawImage(rhino, 0, 0);
var color = document.getElementById('color');
function pick(event) {
    var x = event.layerX;
    var y = event.layerY;
    var pixel = ctx.getImageData(x, y, 1, 1);
    var data = pixel.data;
    var rgba = 'rgba(' + data[0] + ', ' + data[1] +
        ', ' + data[2] + ', ' + (data[3] / 255) + ')';
    color.style.background =  rgba;
    color.textContent = rgba;
}

// None of this will work if the image fails to load, so you know, make sure that's there and all...
function getAllImageData(image) {

    let imageHeight = image.height; // y-axis
    let imageWidth = image.width; // x-axis
    let imageData = [];
    let i = 0;
    let j = 0;
    // let imageArea = imageHeight * imageWidth;
    // the count is +off
    if (imageHeight > imageWidth) {
            for (i; i <= imageHeight; i++) {
                for (j; j <= imageWidth; j++) {
                    let pixelInfo = ctx.getImageData(j, i, 1, 1);
                    debugger;
                    let data = pixelInfo.data; // 0, 1, 2, 3 are r, g, b, and a
                    let RGBtoGrey = parseInt(( (data[3]/255) * ( (data[0] + data[1] + data[2]) / 765) ) * 255);
                    // You're some ratio to full color (r+g+b)/(255 + 255 + 255)
                    // Use data[3] (alpha color) as a coefficient of lightness
                    // Multiply by 255 to land a value in the character dictionary
                    // parseInt to get back something that exists.
                    imageData.push(RGBtoGrey);
                }
            }
    } else {
            for (j; j <= imageHeight; j++) {
                for (i; i <= imageWidth; i++) {
                    let pixelInfo = ctx.getImageData(j,i,1,1);
                    debugger;
                    let data = pixelInfo.data; // 0, 1, 2, 3 are r, g, b, and a
                    let RGBtoGrey = parseInt(( (data[3]/255) * ( (data[0] + data[1] + data[2]) / 765) )*255);
                    // see above
                    imageData.push(RGBtoGrey);
                }
            }
    }
    return imageData;
}

function convertToSymbol(imageData) {

}


