var imgs = [];
var avgImg;
var numOfImages = 30;

//////////////////////////////////////////////////////////
function preload() { // preload() runs once
    for (let i = 0; i < numOfImages; i++) {
        const filename = `./assets/${i}.jpg`;
      imgs.push(loadImage(filename));
      }
}
//////////////////////////////////////////////////////////
function setup() {
    const firstImage = imgs[0];
    const canvasWidth = firstImage.width * 2; 
    const canvasHeight = firstImage.height;
    createCanvas(canvasWidth, canvasHeight);
   
    avgImg = createGraphics(firstImage.width, firstImage.height);
    pixelDensity(1);

}
//////////////////////////////////////////////////////////
function draw() {
    background(125);

    for (let i = 0; i < imgs.length; i++) {
        imgs[i].loadPixels();
    }
    avgImg.loadPixels();


    for (let y = 0; y < imgs[0].height; y++) {
        for (let x = 0; x < imgs[0].width; x++) {
            let index = (x + y * imgs[0].width) * 4;
            avgImg.pixels[index] = 255; // Set red channel to max
            avgImg.pixels[index + 1] = 0; // Set green channel to min
            avgImg.pixels[index + 2] = 0; // Set blue channel to min
            avgImg.pixels[index + 3] = 255; // Set alpha to 255
            let sumR = 0, sumG = 0, sumB = 0;

            for (let i = 0; i < imgs.length; i++) {
                let index = (x + y * imgs[0].width) * 4;
                sumR += imgs[i].pixels[index];
                sumG += imgs[i].pixels[index + 1];
                sumB += imgs[i].pixels[index + 2];
            }
            let avgR = sumR / imgs.length;
            let avgG = sumG / imgs.length;
            let avgB = sumB / imgs.length;

            let avgIndex = (x + y * avgImg.width) * 4;
            avgImg.pixels[avgIndex] = avgR;
            avgImg.pixels[avgIndex + 1] = avgG;
            avgImg.pixels[avgIndex + 2] = avgB;
            avgImg.pixels[avgIndex + 3] = 255;
        }
    }

    avgImg.updatePixels();
    image(imgs[0], 0, 0); // Display the original image on the left
    image(avgImg, imgs[0].width, 0); // Display the red average image on the right

    noLoop(); //

}
