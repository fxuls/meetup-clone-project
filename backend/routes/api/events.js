const express = require("express");
const asyncHandler = require("express-async-handler");

const { Event, Group, Image, Venue } = require("../../db/models");
const { previewImageToUrl, imagesToUrls } = require("../../utils");

const router = express.Router();

// get all events
router.get(
  "/events",
  asyncHandler(async (req, res) => {
    let events = await Event.scope("simple").findAll({
      include: [
        { model: Group.scope("simple") },
        { model: Image, as: "previewImage" },
        { model: Venue.scope("simple") },
      ],
    });

    // change previewImage to just the image url
    events = events.map(previewImageToUrl);

    res.json({ Events: events });
  })
);

// get all events of a group by groupId
router.get(
  "/groups/:groupId(\\d+)/events",
  asyncHandler(async (req, res) => {
    const { groupId } = req.params;

    // check that group exists
    const group = await Group.findByPk(groupId, {});
    if (!group) {
      res.status(404);
      return res.json({
        message: "Group couldn't be found",
        statusCode: 404,
      });
    }

    let events = await Event.findAll({
      where: { groupId },
      include: [
        { model: Group.scope("simple") },
        { model: Image, as: "previewImage" },
        { model: Venue.scope("simple") },
      ],
    });

    // change previewImage to just the image url
    events = events.map(previewImageToUrl);

    res.json({ Events: events });
  })
);

// get details of event by its eventId
router.get(
  "/events/:eventId(\\d+)",
  asyncHandler(async (req, res) => {
    const { eventId } = req.params;

    let event = await Event.findByPk(eventId, {
      include: [
        { model: Group.scope(["simple", "private"]) },
        { model: Venue.scope("excludeGroupId") },
        { model: Image, as: "eventImages" },
      ],
    });

    // check that event exists
    if (!event) {
      res.status(404);
      return res.json({
        message: "Event couldn't be found",
        statusCode: 404,
      });
    }

    // convert event to json
    event = event.toJSON();

    // convert Image models to urls
    event.eventImages = imagesToUrls(event.eventImages);

    res.json(event);
  })
);

module.exports = router;
