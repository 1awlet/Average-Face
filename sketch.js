var imgs = [];
var avgImg;
var numOfImages = 30;
let amt =1;

let currentImg;


//////////////////////////////////////////////////////////
function preload() { // preload() runs once
    for (let i = 0; i < numOfImages; i++) {
        const filename = `./assets/${i}.jpg`;
      imgs.push(loadImage(filename));
      }

      currentImg= imgs[int(random(0,30))];
}
//////////////////////////////////////////////////////////
function setup() {
    const firstImage = imgs[0];
    const canvasWidth = firstImage.width * 2; 
    const canvasHeight = firstImage.height;
    createCanvas(canvasWidth, canvasHeight);
   
    avgImg = createGraphics(imgs[0].width, imgs[0].height);
    pixelDensity(1);

}
//////////////////////////////////////////////////////////
function draw() {
    background(125);
    loadIMages();
    

    calculateAverageImage()
 
    image(currentImg, 0, 0); // Display the original image on the left
    image(avgImg, imgs[0].width,0); // Display the red average image on the right
   
 
    noLoop(); //

}


function loadIMages (){
    
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].loadPixels();
    }
}


// This function figures out what a combined image would look like if you mixed the colors of several images together.
// It makes a new image where each pixel's color is the average of the matching pixels
// from a group of images.
function calculateAverageImage (){

 avgImg = createImage (currentImg.width, currentImg.height );

    avgImg.loadPixels();
    
     // Loop through each pixel of the current image
    for (let y = 0; y < currentImg.height; y++) {
        for (let x = 0; x < currentImg.width; x++) {
            let index = (x + y * currentImg.width) * 4;
            avgImg.pixels[index] = 255; // Set red channel to max
            avgImg.pixels[index + 1] = 0; // Set green channel to min
            avgImg.pixels[index + 2] = 0; // Set blue channel to min
            avgImg.pixels[index + 3] = 255; // Set alpha to 255
            let sumR = 0, sumG = 0, sumB = 0, sumA = 0;

            // Loop through each image in the imgs array and accumulate pixel values
            for (let i = 0; i < imgs.length; i++) {
                
                sumR += imgs[i].pixels[index];
                sumG += imgs[i].pixels[index + 1];
                sumB += imgs[i].pixels[index + 2];
                sumA += imgs[i].pixels[index +3];
            }
               // Calculate the average color values 
            let avgR = sumR / imgs.length;
            let avgG = sumG / imgs.length;
            let avgB = sumB / imgs.length;
            let avgA = sumA / imgs.length;

       // Use linear interpolation (lerp) to blend the current image's pixel with the average color
            avgImg.pixels[index] = lerp(currentImg.pixels[index], avgR, amt);
            avgImg.pixels[index + 1] = lerp(currentImg.pixels[index+1], avgG, amt);
            avgImg.pixels[index + 2] = lerp(currentImg.pixels[index+2], avgB, amt);
            avgImg.pixels[index + 3] = lerp(currentImg.pixels[index+3], avgA, amt);;
        }
    }
      // Update pixel data for the average image
    avgImg.updatePixels();
}


function keyPressed()
{
    if(keyCode == 32)
    {
        currentImg = imgs[int(random(0,30))];
        amt = 1;
        loop();
    }
    return false; 
     
}


function mouseMoved()
{
    

   

    if (
        mouseX >= imgs[0].width &&
        mouseX <= imgs[0].width + avgImg.width &&
        mouseY >= 0 &&
        mouseY <= avgImg.height
      ) {
        amt = map(mouseX, imgs[0].width, imgs[0].width + avgImg.width, 0.0, 1);
      
        loop();
      } else {
        
        noLoop();
      }
}

