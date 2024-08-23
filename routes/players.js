const express = require("express");
const router = express.Router();
const { prisma } = require("../prisma/prisma-client");
const { auth } = require("../middleware/auth");
const { all, add, remove, edit, player } = require("../controllers/players");

// /api/players
router.get("/", auth, all);
// /api/players/:id
router.get("/:id", auth, player);
// /api/players/add
router.post("/add", auth, add);
// /api/players/remove/:id
router.post("/remove/:id", remove);
// /api/players/edit/:id
router.put("/edit/:id", auth, edit);

module.exports = router;
