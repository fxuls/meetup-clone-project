const express = require("express");
const asyncHandler = require("express-async-handler");

const { Event, Group, Image, Venue } = require("../../db/models");
const { previewImageToUrl } = require("../../utils");

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

    const group = await Group.findByPk(groupId, {});
    if (!group) {
      res.status(404);
      return res.json({
        message: "Group couldn't be found",
        statusCode: 404,
      });
    }

    let events = await Event.findAll({ where: { groupId } });

    res.json({ Events: events });
  })
);

module.exports = router;
