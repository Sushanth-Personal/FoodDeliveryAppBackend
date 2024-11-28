export const displayImage = (imageArray, imageId) => {
  const image = imageArray.find((img) => img.imageId === imageId);
  return image ? image.imageURL : ""; // Return URL if found, otherwise an empty string
};
