const express = require('express');
const { createNewSpecialism, getAllSpecialisms, getSpecialismById, updateSpecialismById, deleteSpecialism } = require('../controllers/Specialism');
const router = express.Router();


router.get("/", getAllSpecialisms);
router.post("/", createNewSpecialism);
router.get("/:id", getSpecialismById);
router.put("/:id", updateSpecialismById);
router.delete("/:id", deleteSpecialism);

module.exports = router;