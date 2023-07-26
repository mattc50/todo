const compressImage = async (resizingFactor, quality) => {
  const imgToCompress = document.querySelector("#prof-pic");
  // console.log(imgToCompress)

  let compressedImageBlob;
  let compressedBase64;

  // showing the compressed image
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const originalWidth = imgToCompress.width;
  const originalHeight = imgToCompress.height;

  const canvasWidth = Math.floor(originalWidth * resizingFactor);
  const canvasHeight = Math.floor(originalHeight * resizingFactor);

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  context.drawImage(
    imgToCompress,
    0,
    0,
    canvasWidth,
    canvasHeight
  );

  // reducing the quality of the image
  canvas.toBlob(
    (blob) => {
      return blob
      // if (blob) {
      //   // console.log(blob instanceof Blob)
      //   compressedImageBlob = convertToBase64(blob);
      //   imgToCompress.src = compressedImageBlob;

      //   // compressedImage.src = URL.createObjectURL(compressedImageBlob);
      //   // document.querySelector("#size").innerHTML = bytesToSize(blob.size);
      // }
    },
    "image/jpeg",
    quality
  );

  console.log(canvas instanceof Blob)

  // return imgToCompress.src

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

export { compressImage, convertToBase64 };