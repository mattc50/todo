const compressToSizes = async (imgToCompress, file) => {
  // create a new image, with the uploaded image, that will be used for resizing on 
  // a new canvas
  const fileSize = file.size
  // console.log(fileSize)

  const img = new Image();
  img.src = await convertToBase64(file);

  // get the DOM element that represents the image to be used for resizing. Its 
  // source is changed to represent the new image.
  // const imgToCompress = document.querySelector("#prof-pic");
  imgToCompress.src = await convertToBase64(file);

  // compress the new image to 2 sizes: medium (for Profile) and small (for Navbar).
  const compressMed = await compressImage(img, imgToCompress, 0.7, 0.7);
  const compressSmall = await compressImage(img, imgToCompress, 0.1, 0.1);

  // console.log(compressMed)
  // console.log(compressSmall)
  imgToCompress.src = compressMed;


  return {
    // original: img.src,
    compMed: compressMed,
    compSmall: compressSmall
  }
}





const compressImage = async (imgForResize, DOMImgToCompress, resizingFactor, quality) => {
  // const imgToCompress = document.querySelector("#prof-pic");

  // const newSrc = await convertToBase64(originalFile)



  // let compressedImageBlob;
  // let compressedBase64;

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
        // console.log(blob.size)
        resolve(blob)
        // console.log(blob)
        // if (blob) {
        //   console.log(blob)
        //   const base64Blob = convertToBase64(blob)
        //   console.log(base64Blob)

        //   //   // console.log(blob instanceof Blob)
        //   //   compressedImageBlob = convertToBase64(blob);
        //   imgToCompress.src = base64Blob;

        //   //   // compressedImage.src = URL.createObjectURL(compressedImageBlob);
        //   //   // document.querySelector("#size").innerHTML = bytesToSize(blob.size);
        // }
      },
      "image/jpeg",
      quality
    );
  })

  // console.log(blob)
  const blobBase64 = await convertToBase64(blob)
  // DOMImgToCompress.src = blobBase64;
  // console.log(canvas instanceof Blob)

  // return {
  //   original: img.src,
  //   compressed: imgToCompress.src
  // }

  return blobBase64;

  // const compressedImage = convertToBase64(compressedImageBlob);
  // console.log(compressedImageBlob)
  // return compressedImageBlob;
}

// const bytesToSize = (bytes) => {
//   var sizes = ["Bytes", "KB", "MB", "GB", "TB"];

//   if (bytes === 0) {
//     return "0 Byte";
//   }

//   const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

//   return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
// }

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



export { compressImage, convertToBase64, compressToSizes };