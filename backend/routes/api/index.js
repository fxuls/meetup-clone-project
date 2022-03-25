const router = require("express").Router();
const sessionRouter = require("./session");
const usersRouter = require("./users");
const groupsRouter = require("./groups");
const eventsRouter = require("./events");
const venuesRouter = require("./venues");

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/groups", groupsRouter);
router.use(eventsRouter);
router.use(venuesRouter);

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

router.get("/test", (req, res) => {
  res.json({ message: "Success" });
});

module.exports = router;
