const express = require('express');
const { createNewCohort, getAllCohorts, getCohortById, updateCohortById, deleteCohortById } = require('../controllers/Cohort');
const router = express.Router();


router.get("/", getAllCohorts);
router.post("/", createNewCohort);
router.get("/:id", getCohortById);
router.put("/:id", updateCohortById);
router.delete("/:id", deleteCohortById);

module.exports = router;