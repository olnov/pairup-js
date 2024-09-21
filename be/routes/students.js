const express = require('express');
const { getAllStudents, createNewStudent, getStudentById, updateStudentById, deleteStudentById } = require('../controllers/Student');
const router = express.Router();


router.get("/", getAllStudents);
router.post("/", createNewStudent);
router.get("/:id", getStudentById);
router.put("/:id", updateStudentById);
router.delete("/:id", deleteStudentById);

module.exports = router;