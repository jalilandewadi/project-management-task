const express = require("express");
const router = express.Router();

const projectController = require("../controllers/projectController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  projectController.createProject
);

router.get("/", authMiddleware, projectController.getProjects);

router.get("/:id", authMiddleware, projectController.getProjectById);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  projectController.updateProject
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  projectController.deleteProject
);

module.exports = router;