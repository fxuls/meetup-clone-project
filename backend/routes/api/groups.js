const express = require("express");
const asyncHandler = require("express-async-handler");

const { Group, Image, Venue, Event } = require("../../db/models");

const router = express.Router();

// get all groups
router.get("/", asyncHandler(async (req, res) => {
    const groups = await Group.findAll({ include: Image }); // TODO fix imagePreviewURL
    res.json({ Groups: groups });
}));

// get group info by groupId
router.get("/:groupId", asyncHandler(async (req, res) => {
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId, { include: ["Organizer"]}); // TODO add images and previewImageURL
    res.json({ group });
}));

router.get("/user", asyncHandler(async (req, res) => {

}));

module.exports = router;
