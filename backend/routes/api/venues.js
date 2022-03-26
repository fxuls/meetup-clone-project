const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const { Group, Venue } = require("../../db/models");
const { requireAuth, hasElevatedMembership } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateVenue = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("lat").exists().isDecimal().withMessage("Latitude is not valid"),
  check("lng").exists().isDecimal().withMessage("Longitude is not valid"),
  handleValidationErrors,
];

// create venue for group with groupId
router.post(
  "/groups/:groupId(\\d+)/venues",
  requireAuth,
  validateVenue,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { groupId } = req.params;
    const { address, city, state, lat, lng } = req.body;

    // check that group exists
    const group = await Group.findByPk(groupId);
    if (!group) {
      res.status(404);
      return res.json({
        message: "Group couldn't be found",
        statusCode: 404,
      });
    }

    // verify user has permission
    if (!(await hasElevatedMembership(userId, groupId))) {
      return res.json({
        message:
          "Current User must be the organizer or a co-host to add a venue",
        statusCode: 400,
      });
    }

    const newVenue = await Venue.create({
      groupId,
      address,
      city,
      state,
      lat,
      lng,
    });

    res.json(newVenue);
  })
);

// edit a venue by venueId
router.patch(
  "/venues/:venueId(\\d+)",
  requireAuth,
  validateVenue,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { venueId } = req.params;
    const venue = await Venue.findByPk(venueId);

    // check that venue exists
    if (!venue) {
      res.status(404);
      return res.json({
        message: "Venue couldn't be found",
        statusCode: 404,
      });
    }

    // verify user has permission
    if (!(await hasElevatedMembership(userId, venue.groupId))) {
      return res.json({
        message:
          "Current User must be the organizer or a co-host to add a venue",
        statusCode: 400,
      });
    }

    // update the venue and return it
    const { address, city, state, lat, lng } = req.body;
    await venue.update({ address, city, state, lat, lng });

    res.json(venue);
  })
);

module.exports = router;
