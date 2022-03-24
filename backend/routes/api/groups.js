const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const { handleValidationErrors } = require("../../utils/validation");
const { Group, Image, User, Member } = require("../../db/models");
const {
  requireAuth,
  unauthorizedError,
  restoreUser,
} = require("../../utils/auth");

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
  restoreUser,
  asyncHandler(async (req, res) => {
    const groupId = req.params.groupId;
    const group = await Group.findByPk(groupId, {
      include: { model: User, as: "members" },
    });

    // check that group exists
    if (!group) {
      res.status(404);
      return res.json({
        message: "Group couldn't be found",
        statusCode: 404,
      });
    }

    // map the models into json objects
    let members = group.members.map((user) => user.toJSON());

    // filter the member object to a Membership attribute with their status
    members.forEach((user) => {
      user.Membership = { status: user.Member.status };
      delete user.Member;
    });

    // if user is not organizer filter out members without status member
    if (!req.user || req.user.id !== group.organizerId) {
      members = members.filter(
        (member) => member.Membership.status === "member"
      );
    }

    res.json({ Members: members });
  })
);

// request membership to a group by groupId
router.post(
  "/:groupId(\\d+)/join",
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

    // get all membership entries with groupId matching group.id
    const members = await Member.findAll({ where: { groupId: group.id } });

    // check if user.id is already in members
    for (let i = 0; i < members.length; i++) {
      const member = members[i];

      if (member.userId === userId) {
        if (member.status === "pending") {
          return res.json({
            message: "Membership has already been requested",
            statusCode: 400,
          });
        }
        return res.json({
          message: "User is already a member of the group",
          statusCode: 400,
        });
      }
    }

    // add userId as a pending member to group
    let newMembership = await Member.create({
      userId,
      groupId,
      status: "pending",
    });

    res.json({
      groupId: newMembership.groupId,
      memberId: newMembership.userId,
      status: newMembership.status,
    });
  })
);

// change status of a membership for a group by groupId
router.patch(
  "/:groupId(\\d+)/members",
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

    // get status of user making the request
    const isOrganizer = group.organizerId === userId;
    const userMembership = await Member.findOne({ where: { userId, groupId } });

    // if requesting user is not a member
    if (!userMembership) {
      return res.json({
        message:
          "Current User must be the organizer or a co-host to change membership status",
        statusCode: 400,
      });
    }

    const userStatus = userMembership.status;

    // if changing status to co-host check that reqesting user is organizer
    if (req.body.status === "co-host" && !isOrganizer) {
      return res.json({
        message: "Current User must be the organizer to add a co-host",
        statusCode: 403,
      });
    }

    // if changing status to member check that user is co-host or organizer
    if (
      req.body.status === "member" &&
      !isOrganizer &&
      userStatus !== "co-host"
    ) {
      return res.json({
        message:
          "Current User must be the organizer or a co-host to make someone a member",
        statusCode: 400,
      });
    }

    // if changing status to pending
    if (req.body.status === "pending") {
      return res.json({
        message: "Cannot change a membership status to pending",
        statusCode: 400,
      });
    }

    const membership = await Member.findOne({
      where: { groupId: groupId, userId: req.body.memberId },
    });

    // if membership does not exist
    if (!membership) {
      return res.json({
        message: "Membership between the user and the group does not exits",
        statusCode: 404,
      });
    }

    await membership.update({ status: req.body.status });
    res.json({
      memberId: membership.userId,
      groupId: membership.groupId,
      status: membership.status,
    });
  })
);

// delete membership from a group
router.delete(
  "/:groupId(\\d+)/members/:memberId(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const groupId = req.params.groupId;
    const memberId = req.params.memberId;
    const group = await Group.findByPk(groupId);
    debugger;

    // check that group exists
    if (!group) {
      res.status(404);
      return res.json({
        message: "Group couldn't be found",
        statusCode: 404,
      });
    }

    // confirm that user is organizer or user who is being deleted
    if (userId != memberId && userId !== group.organizerId) {
      throw unauthorizedError();
    }

    const membership = await Member.findOne({
      where: { groupId: groupId, userId: memberId },
    });

    if (!membership) {
      return res.json({
        message: "User is not a member of the group",
        statusCode: 400,
      });
    }

    await membership.destroy();

    res.json({
      message: "Successfully deleted membership from group",
    });
  })
);

module.exports = router;
