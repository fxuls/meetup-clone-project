const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const { Event, Group, Image, Venue } = require("../../db/models");
const { previewImageToUrl, imagesToUrls } = require("../../utils");
const { requireAuth, hasElevatedMembership } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");

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

// validations for an event
const validateEvent = [
  check("venueId").exists().withMessage("Venue id is required"),
  check("venueId").custom((venueId) => {
    return Venue.findByPk(venueId).then((venue) => {
      if (!venue) return Promise.reject("Venue does not exist");
      return true;
    });
  }),
  check("name")
    .isLength({ min: 5 })
    .withMessage("Name must be at least 5 characters"),
  check("type")
    .isIn(["inperson", "virtual"])
    .withMessage("Type must be virtual or inperson"),
  check("capacity").isInt().withMessage("Capacity must be an integer"),
  check("price")
    .isDecimal({ decimal_digits: "0,2" })
    .withMessage("Price is invalid"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("endDate")
    .exists({ checkFalsy: true })
    .withMessage("End date is required"),
  check("startDate")
    .exists({ checkFalsy: true })
    .withMessage("Start date is required"),
  check("endDate").custom((endDateStr, { req }) => {
    const endDate = new Date(endDateStr);
    const startDate = new Date(req.body.startDate);
    if (endDate < startDate)
      return Promise.reject("End date is less than start date");
    return true;
  }),
  handleValidationErrors,
];

// create an event for a group specified by its groupId
router.post(
  "/groups/:groupId(\\d+)/events",
  requireAuth,
  validateEvent,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { groupId } = req.params;
    const { venueId, name, type, capacity, price, startDate, endDate } =
      req.body;

    // check that group exists
    const group = await Group.findByPk(groupId);
    if (!group) {
      res.status(404);
      return res.json({
        message: "Group couldn't be found",
        statusCode: 404,
      });
    }

    // check if user has elevated membership in group
    const elevatedMembership = await hasElevatedMembership(userId, groupId);
    if (!elevatedMembership) throw unauthorizedError();

    // create new event
    const event = await Event.create({
      venueId,
      groupId,
      name,
      type,
      capacity,
      price,
      startDate,
      endDate,
    });

    // return new event
    res.json(event);
  })
);

// edit an event by its eventId
router.patch(
  "/events/:eventId(\\d+)",
  requireAuth,
  validateEvent,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { groupId } = req.params;
    const { venueId, name, type, capacity, price, startDate, endDate } =
      req.body;

    const event = await Event.findByPk(groupId);

    // check that event exists
    if (!event) {
      res.status(404);
      return res.json({
        message: "Event couldn't be found",
        statusCode: 404,
      });
    }

    // check if user has elevated membership in group
    const elevatedMembership = await hasElevatedMembership(userId, groupId);
    if (!elevatedMembership) throw unauthorizedError();

    // update the event
    await event.update({
      venueId,
      name,
      type,
      capacity,
      price,
      startDate,
      endDate,
    });

    res.json(event);
  })
);

// delete an event by its eventId
router.delete(
  "/events/:eventId(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { eventId } = req.params;

    const event = await Event.findByPk(eventId);

    // check that group exists
    if (!event) {
      res.status(404);
      return res.json({
        message: "Event couldn't be found",
        statusCode: 404,
      });
    }

    // check if user has elevated membership in group
    const elevatedMembership = await hasElevatedMembership(userId, groupId);
    if (!elevatedMembership) throw unauthorizedError();

    await event.destroy();

    res.json({ message: "Successfully deleted" });
  })
);

module.exports = router;
