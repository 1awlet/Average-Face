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
    createCanvas(100, 100);
    pixelDensity(1);

}
//////////////////////////////////////////////////////////
function draw() {
    background(125);

}
