var imgs = [];
var avgImg;
var numOfImages = 30;

//////////////////////////////////////////////////////////
function preload() { // preload() runs once
    for (let i = 0; i < numOfImages; i++) {
        const filename = `./assets/${i}.jpg`;
      imgs.push([loadImage(filename)]);
      }
}
//////////////////////////////////////////////////////////
function setup() {
    const firstImage = imgs[0];
    const canvasWidth = firstImage.width * 2; 
    const canvasHeight = firstImage.height;
    createCanvas(canvasWidth, canvasHeight);
    image(firstImage, 0, 0);
    avgImg = createGraphics(firstImage.width, firstImage.height);
    pixelDensity(1);

}
//////////////////////////////////////////////////////////
function draw() {
    background(125);

}
