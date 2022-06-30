console.log('hello there')
//tutorial from https://marmelab.com/blog/2018/02/20/convert-image-to-ascii-art-masterpiece.html
const inputFile=document.getElementById('inputPicture');
const canvas=document.getElementById('output');


const ctx=canvas.getContext('2d');

inputFile.onchange=function(e){
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = event => {
      const image = new Image();
      image.onload = () => {
        const [width, height] = clampDimensions(image.width, image.height);
        canvas.width = width;
        canvas.height = height;
  
        ctx.drawImage(image, 0, 0,width,height);
        let grayScales=convertToGrayScales(ctx,width,height)
     
        drawAscii(grayScales,width)
      };
  
      image.src = event.target.result;
    };
  
    reader.readAsDataURL(file);
  };

  const toGrayScale = (r, g, b) => 0.21 * r + 0.72 * g + 0.07 * b;

const convertToGrayScales = (context, width, height) => {
  const imageData = ctx.getImageData(0, 0, width, height);

  const grayScales = [];

  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];

    const grayScale = toGrayScale(r, g, b);
    imageData.data[i] = imageData.data[i + 1] = imageData.data[
      i + 2
    ] = grayScale;

    grayScales.push(grayScale);
  }

  context.putImageData(imageData, 0, 0);

  return grayScales;
};

const grayRamp =
  "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,\"^`'. ";
const rampLength = grayRamp.length;

// the grayScale value is an integer ranging from 0 (black) to 255 (white)
const getCharacterForGrayScale = grayScale =>
  grayRamp[Math.ceil(((rampLength - 1) * grayScale) / 255)];

  const asciiImage = document.getElementById('ascii')

  const drawAscii = (grayScales, width) => {
    const ascii = grayScales.reduce((asciiImage, grayScale, index) => {
      let nextChars = getCharacterForGrayScale(grayScale);
  
      if ((index + 1) % width === 0) {
        nextChars += "\n";
      }
  
      return asciiImage + nextChars;
    }, "");
  
    asciiImage.textContent = ascii;
  };

  //clamp image dimensions
  const MAXIMUM_WIDTH = 320;
const MAXIMUM_HEIGHT = 200;

const clampDimensions = (width, height) => {
  if (height > MAXIMUM_HEIGHT) {
    const reducedWidth = Math.floor((width * MAXIMUM_HEIGHT) / height);
    return [reducedWidth, MAXIMUM_HEIGHT];
  }

  if (width > MAXIMUM_WIDTH) {
    const reducedHeight = Math.floor((height * MAXIMUM_WIDTH) / width);
    return [MAXIMUM_WIDTH, reducedHeight];
  }

  return [width, height];
};