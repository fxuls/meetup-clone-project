const express = require("express");
const asyncHandler = require("express-async-handler");

const { Group, Image, Venue, Event } = require("../../db/models");

const router = express.Router();

// get all groups
router.get("/", asyncHandler(async (req, res) => {
    const groups = await Group.findAll({ include: Image });
    res.json({ Groups: groups });
}));

router.get("/:groupId", asyncHandler(async (req, res) => {
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId, { include: "Organizer"})
}));

module.exports = router;
