const compressToSizes = async (imgToCompress, file) => {
  const fileSize = file.size

  const medFactor = getCompFactor(fileSize);
  const smallFactor = medFactor / 2;

  // create a new image, with the uploaded image, that will be used for resizing on 
  // a new canvas
  const img = new Image();
  img.src = await convertToBase64(file);

  // get the DOM element that represents the image to be used for resizing. Its 
  // source is changed to represent the new image.
  // const imgToCompress = document.querySelector("#prof-pic");
  imgToCompress.src = await convertToBase64(file);

  // compress the new image to 2 sizes: medium (for Profile) and small (for Navbar).
  const compressMed = await compressImage(img, 0.8, medFactor);
  const compressSmall = await compressImage(img, 0.4, smallFactor);

  // assign the current DOM image element to have the compressMed base64 as its src.
  imgToCompress.src = compressMed;

  return {
    // original: img.src,
    compMed: compressMed,
    compSmall: compressSmall
  }
}

const compressImage = async (imgForResize, resizingFactor, quality) => {
  // showing the compressed image
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const originalWidth = imgForResize.naturalWidth;
  const originalHeight = imgForResize.naturalHeight;

  const canvasWidth = Math.floor(originalWidth * resizingFactor);
  const canvasHeight = Math.floor(originalHeight * resizingFactor);

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  context.drawImage(
    imgForResize,
    0,
    0,
    canvasWidth,
    canvasHeight
  );

  // reducing the quality of the image
  const blob = await new Promise(resolve => {
    canvas.toBlob(
      (blob) => {
        resolve(blob)
      },
      "image/jpeg",
      quality
    );
  })

  const blobBase64 = await convertToBase64(blob)

  return blobBase64;
}

// const bytesToSize = (bytes) => {
//   var sizes = ["Bytes", "KB", "MB", "GB", "TB"];

//   if (bytes === 0) {
//     return "0 Byte";
//   }

//   const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

//   return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
// }

const getCompFactor = (size) => {
  const scaleFactor = 100000;

  const inverse = scaleFactor / size;

  const output = Math.min(Math.max(inverse, 0), 0.95);

  return output;
}

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    };
  });
};

export default compressToSizes;