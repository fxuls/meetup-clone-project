const previewImageToUrl = (model) => {
    const newModel = model.toJSON();
    debugger;
    delete newModel.previewImageId;
    if (newModel.previewImage) {
      newModel.previewImage = model.previewImage.url;
    }
    return newModel;
  };

module.exports = { previewImageToUrl };
