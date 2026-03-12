const express = require("express");
const router = express.Router({ mergeParams: true });

const dprController = require("../controllers/dprController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/:id/dpr",
  authMiddleware,
  dprController.createDPR
);

router.get(
  "/:id/dpr",
  authMiddleware,
  dprController.getProjectDPR
);

module.exports = router;