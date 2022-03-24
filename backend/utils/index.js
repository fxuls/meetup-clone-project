const previewImageToUrl = (model) => {
  const newModel = model.toJSON();
  debugger;
  delete newModel.previewImageId;
  if (newModel.previewImage) {
    newModel.previewImage = model.previewImage.url;
  }
  return newModel;
};

const imagesToUrls = (imageModels) => {
  return imageModels.map((image) => image.url);
};

module.exports = { previewImageToUrl, imagesToUrls };
