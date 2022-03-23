const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const { handleValidationErrors } = require("../../utils/validation");
const { Group, Image, Venue, Event, User } = require("../../db/models");
const { requireAuth, unauthorizedError } = require("../../utils/auth");

const router = express.Router();

const previewImageToUrl = (group) => {
  const newGroup = group.toJSON();
  delete newGroup.previewImageId;
  if (newGroup.previewImage) {
    newGroup.previewImage = group.previewImage.url;
  }
  return newGroup;
};

// get all groups
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const groups = await Group.findAll({
      include: { model: Image, as: "previewImage" },
    });

    // change previewImage to just the image url
    groups.map(previewImageToUrl);

    res.json({ Groups: groups });
  })
);

// get group info by groupId
router.get(
  "/:groupId(\\d+)",
  asyncHandler(async (req, res) => {
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId, { include: ["Organizer"] }); // TODO add images and previewImageURL

    if (!group) {
      res.status(404);
      return res.json({
        message: "Group couldn't be found",
        statusCode: 404,
      });
    }

    res.json({ group });
  })
);

// get all groups user is a member of or is organizer of
router.get(
  "/user",
  requireAuth,
  asyncHandler(async (req, res) => {
    // find all groups user is member in
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      include: { model: Group, as: "Memberships", include: "previewImage" },
    });
    let memberships = user.Memberships;

    // find all groups user is organizer of
    const organizerGroups = await Group.findAll({
      where: {
        organizerId: userId,
      },
    });

    // add any organizerGroups that are not present in memberships
    const membershipGroupIds = memberships.map((group) => group.id);
    organizerGroups.forEach((group) => {
      if (!membershipGroupIds.includes(group.id)) memberships.push(group);
    });

    // convert the previewImages to urls
    memberships = memberships.map(previewImageToUrl);

    res.json({ Groups: memberships });
  })
);

validateGroup = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Name cannot be blank."),
  check("name")
    .isLength({ max: 60 })
    .withMessage("Name must be 60 characters or fewer."),
  check("about")
    .exists()
    .isLength({ min: 50 })
    .withMessage("About must be 50 characters or more."),
  check("type")
    .exists()
    .isIn(["inperson", "virtual"])
    .withMessage("Type must be virtual or inperson."),
  check("private")
    .exists()
    .isBoolean()
    .withMessage("Private must be a boolean."),
  check("city").exists().withMessage("City is required."),
  check("state").exists().withMessage("State is required."),
  handleValidationErrors,
];

// create a new group
router.post(
  "/",
  requireAuth,
  validateGroup,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { name, about, type, private, city, state } = req.body;

    const group = await Group.create({
      organizerId: userId,
      name,
      about,
      type,
      private,
      city,
      state,
    });

    res.status(201);
    res.json(group);
  })
);

// edit a group
router.patch(
  "/:groupId(\\d+)",
  requireAuth,
  validateGroup,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const groupId = req.params.groupId;
    const group = await Group.findByPk(groupId);

    // check that group exists
    if (!group) {
      res.status(404);
      return res.json({
        message: "Group couldn't be found",
        statusCode: 404,
      });
    }

    // check that user is group organizer
    if (group.organizerId !== userId) {
      throw unauthorizedError();
    }

    // update group and return it
    const { name, about, type, private, city, state } = req.body;
    await group.update({ name, about, type, private, city, state });
    res.json(group);
  })
);

// delete a group
router.delete(
  "/:groupId(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const groupId = req.params.groupId;
    const group = await Group.findByPk(groupId);

    // check that group exists
    if (!group) {
      res.status(404);
      return res.json({
        message: "Group couldn't be found",
        statusCode: 404,
      });
    }

    // check that user is group organizer
    if (group.organizerId !== userId) {
      throw unauthorizedError();
    }

    await group.destroy();
    res.status(200);
    res.json({ message: "Successfuly deleted", statusCode: 200 });
  })
);

// get members of a group by groupId
router.get(
  "/:groupId(\\d+)/members",
  asyncHandler(async (req, res) => {
    const groupId = req.params.groupId;
    const group = await Group.findByPk(groupId, { include: "Members" });

    // check that group exists
    if (!group) {
      res.status(404);
      return res.json({
        message: "Group couldn't be found",
        statusCode: 404,
      });
    }

    // check if user is logged in
    if (req.user) {
    }
  })
);

module.exports = router;
