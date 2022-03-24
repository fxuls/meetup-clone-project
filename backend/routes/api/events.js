const express = require("express");
const asyncHandler = require("express-async-handler");

const { Event, Group, Image, Venue } = require("../../db/models");
const { previewImageToUrl } = require("../../utils");

const router = express.Router();

const convertToSimpleEventDetails = (event) => {
  const newEvent = {};

  // add desired attributes from event
  newEvent.id = event.id;
  newEvent.groupId = event.groupId;
  newEvent.venueId = event.venueId;
  newEvent.name = event.name;
  newEvent.type = event.type;
  newEvent.startDate = event.startDate;
  newEvent.numAttending = event.numAttending;
  newEvent.previewImage = event.previewImage;

  // change Group to just include id, name, city, state
  newEvent.Group = {
    id: event.Group.id,
    name: event.Group.name,
    city: event.Group.city,
    state: event.Group.state,
  };

  // change Venue to only include id, city, state
  if (event.Venue) {
    newEvent.Venue = {
      id: event.Venue.id,
      city: event.Venue.city,
      state: event.Venue.state,
    };
  } else {
    newEvent.Venue = null;
  }

  return newEvent;
};

// get all events
router.get(
  "/events",
  asyncHandler(async (req, res) => {
    let events = await Event.findAll({
      include: [
        { model: Group },
        { model: Image, as: "previewImage" },
        { model: Venue },
      ],
    });

    // change previewImage to just the image url
    events = events.map(previewImageToUrl);

    events = events.map((event) => {});

    res.json({ Events: events });
  })
);

module.exports = router;
