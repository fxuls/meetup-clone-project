const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const {
  Event,
  Group,
  Image,
  Venue,
  Attendee,
  User,
  Member,
} = require("../../db/models");
const { previewImageToUrl, imagesToUrls } = require("../../utils");
const {
  requireAuth,
  hasElevatedMembership,
  restoreUser,
  unauthorizedError,
} = require("../../utils/auth");
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
        { model: Image, as: "previewImage" },
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

    // convert preview image to url
    event.previewImage = event.previewImage.url;

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

// get all attendees of an event by its eventId
router.get(
  "/events/:eventId(\\d+)/attendees",
  restoreUser,
  asyncHandler(async (req, res) => {
    const eventId = req.params.eventId;

    const event = await Event.findByPk(eventId, {
      include: { model: User, as: "attendees" },
    });

    // check that event exists
    if (!event) {
      res.status(404);
      return res.json({
        message: "Event couldn't be found",
        statusCode: 404,
      });
    }

    // map models into json objects
    let attendees = event.attendees.map((user) => user.toJSON());

    attendees.forEach((user) => {
      user.Attendance = { status: user.Attendee.status };
      delete user.Attendee;
    });

    // if user is not organizer or co-host filter out attendees with status pending
    if (req.user) {
      const elevatedMembership = await hasElevatedMembership(
        req.user.id,
        event.groupId
      );
      if (!elevatedMembership) {
        attendees = attendees.filter(
          (attendee) => attendee.Attendance.status !== "pending"
        );
      }
    }

    res.json({ Attendees: attendees });
  })
);

// request to attend event by eventId
router.post(
  "/events/:eventId(\\d+)/attendees",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
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

    const groupId = event.groupId;

    // check that user is a member of group
    const membership = await Member.findOne({ where: { userId, groupId } });
    if (!membership) throw unauthorizedError();

    // check if attendance already exists
    const attendance = await Attendee.findOne({ where: { eventId, userId } });
    if (attendance) {
      const status = attendance.status;
      res.status(400);

      // if user is already attending
      if (status === "member") {
        return res.json({
          message: "User is already an attendee of the event",
          statusCode: 400,
        });
      }

      // if user is pending or waitlisted
      return res.json({
        message: "Attendance has already been requested",
        statusCode: 400,
      });
    }

    // create attendance with status pending
    const newAttendance = await Attendee.create({
      eventId,
      userId,
      status: "pending",
    });

    res.json(newAttendance);
  })
);

// change status of attendance by eventId
router.patch(
  "/events/:eventId(\\d+)/attendees",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
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

    const groupId = event.groupId;

    // check user has elevated membership
    const elevatedMembership = await hasElevatedMembership(userId, groupId);
    if (!elevatedMembership) throw unauthorizedError();

    const attendeeId = req.body.userId;
    const newStatus = req.body.status;

    // get attendance
    const attendance = await Attendee.findOne({
      where: { userId: attendeeId, eventId },
    });

    // if attendance doesn't exist
    if (!attendance) {
      res.status(404);
      return res.json({
        message: "Attendance between the user and the event does not exist",
        statusCode: 404,
      });
    }

    // if trying to change status to pending
    if (newStatus === "pending") {
      res.status(400);
      return res.json({
        message: "Cannot change an attendance status to pending",
        statusCode: 400,
      });
    }

    // update attendance and return
    await attendance.update({ status: newStatus });

    return res.json({
      id: attendance.id,
      userId: attendance.userId,
      eventId: attendance.eventId,
      status: attendance.status,
    });
  })
);

// delete attendance of an event by eventId
router.delete(
  "/events/:eventId(\\d+)/attendees/:attendeeId(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { eventId, attendeeId } = req.params;
    debugger;

    const event = await Event.findByPk(eventId, { include: Group });

    // check that event exists
    if (!event) {
      res.status(404);
      return res.json({
        message: "Event couldn't be found",
        statusCode: 404,
      });
    }

    // check that user is attendee being deleted or organizer of group
    if (userId != attendeeId && userId != event.Group.organizerId) {
      throw unauthorizedError();
    }

    // get attendance and destroy it
    const attendance = await Attendee.findOne({
      where: { userId: attendeeId, eventId },
    });
    if (attendance) await attendance.destroy();

    res.json({
      message: "Successfully deleted attendance from event",
    });
  })
);

module.exports = router;
