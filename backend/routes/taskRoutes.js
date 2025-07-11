const express = require("express");
const router = express.Router();
const controller = require("../controllers/taskController");

router.post("/", controller.createTask);
router.get("/:userId", controller.getTasks);
router.put("/toggle/:id", controller.toggleDone);
router.put("/trash/:id", controller.trashTask);
router.put("/restore/:id", controller.restoreTask);
router.delete("/:id", controller.deleteTask);

module.exports = router;
