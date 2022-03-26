const express = require("express");
const asyncHandler = require("express-async-handler");

const {
  Group,
  Event,
  Image,
  EventImage,
  Attendee,
  GroupImage,
} = require("../../db/models");
const {
  requireAuth,
  hasElevatedMembership,
  unauthorizedError,
} = require("../../utils/auth");

const router = express.Router();

// add image to event
router.post(
  "/events/:eventId(\\d+)/images",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { url } = req.body;
    const { eventId } = req.params;

    const event = await Event.findByPk(eventId);

    // check that event exists
    if (!event) {
      res.status(404);
      return res.json({
        message: "Event couldn't be found",
        statusCode: 404,
      });
    }

    // check that user is attending the event
    const attendance = await Attendee.findOne({ where: { userId, eventId } });
    if (!attendance) throw unauthorizedError();

    // get all eventImages that match eventId and the provided url
    let eventImage = await EventImage.findOne({
      where: { eventId, "$Image.url$": url },
      include: { model: Image, required: true },
    });

    // if image url already exists for event send bad request error
    if (eventImage) {
      res.status(400);
      return res.json({
        message: `Image with url ${url} already exists for event with eventId ${eventId}`,
        statusCode: 400,
      });
    }

    // create Image object
    const image = await Image.create({ url });

    // if eventImage does not exist create EventImage
    if (!eventImage)
      eventImage = await EventImage.create({ eventId, imageId: image.id });

    res.json({
      id: image.id,
      itemId: eventId,
      itemType: "Event",
      url,
    });
  })
);

// add image to group
router.post(
  "/groups/:groupId(\\d+)/images",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { url } = req.body;
    const { groupId } = req.params;

    const group = await Group.findByPk(groupId);

    // check that group exists
    if (!group) {
      res.status(404);
      return res.json({
        message: "Group couldn't be found",
        statusCode: 404,
      });
    }

    // check that user is organizer of group
    if (userId !== group.organizerId) throw unauthorizedError();

    // get all eventImages that match eventId and the provided url
    let groupImage = await GroupImage.findOne({
      where: { groupId, "$Image.url$": url },
      include: { model: Image, required: true },
    });

    // if image url already exists for event send bad request error
    if (groupImage) {
      res.status(400);
      return res.json({
        message: `Image with url ${url} already exists for group with groupId ${groupId}`,
        statusCode: 400,
      });
    }

    // create Image object
    const image = await Image.create({ url });

    // if groupImage does not exist create GroupImage
    if (!groupImage)
      groupImage = await GroupImage.create({ groupId, imageId: image.id });

    res.json({
      id: image.id,
      itemId: groupId,
      itemType: "Group",
      url,
    });
  })
);

module.exports = router;
