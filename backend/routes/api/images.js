const express = require("express");
const asyncHandler = require("express-async-handler");

const { Group, Event, Image, EventImage, Attendee, } = require("../../db/models");
const { requireAuth, hasElevatedMembership, unauthorizedError } = require("../../utils/auth");

const router = express.Router();

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
    const attendance = await Attendee.findOne({ where: { userId, eventId }});
    if (!attendance) throw unauthorizedError();

    // check if image with url exists
    let image = await Image.findOne({ where: { url }});
    // if image does not exist create Image object
    if (!image) image = await Image.create({ url });

    // check if image is already added to event
    let eventImage = await EventImage.findOne({ where: {eventId, imageId: image.id }});
    // if eventImage does not exist create EventImage
    if (!eventImage) eventImage = await EventImage.create({ eventId, imageId: image.id });

    res.json({
        id: image.id,
        itemId: eventId,
        itemType: "Event",
        url,
    });
  })
);

module.exports = router;
