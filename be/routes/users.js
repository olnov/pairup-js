var express = require('express');
var router = express.Router();
const { getAllUsers, createUser, getUserById, updateUserById, deleteUserById } = require("../controllers/User");

router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);


module.exports = router;
