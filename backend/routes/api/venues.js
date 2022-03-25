const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const { Group, Venue } = require("../../db/models");
const { requireAuth, getMembershipStatus } = require("../../utils/auth");
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

// create event for group with groupId
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
    const isOrganizer = group.organizerId === userId;
    const status = getMembershipStatus(userId, groupId);
    if (!isOrganizer && status != "co-host") {
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

module.exports = router;
