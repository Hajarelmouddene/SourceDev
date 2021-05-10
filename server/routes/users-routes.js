const express = require("express");
const router = express.Router();
const {
  getAllDeveloppers,
  getDevelopperByEmail,
  getDeveloppersFromConversations,
  updateDevelopperProfile,
  getDeveloppersInConversation,
  getDevelopperProfilesByPageLimit,
  getUserByEmail,
} = require("./handlers/users-handlers");
router.get("/developpers", getAllDeveloppers);
router.get("/search", getDeveloppersInConversation);
router.get("/developpers/:id", getDevelopperByEmail);
router.patch("/developpers/profile/update", updateDevelopperProfile);
router.patch("/employers/profile/update", updateDevelopperProfile);
router.get(
  "/developpers/:pageNumber/:itemsPerPage",
  getDevelopperProfilesByPageLimit
);

router.post("/getUser", getUserByEmail);

//get developpers that an employer had conversations with
router.get(`/developpers/search?:queryString`, getDeveloppersFromConversations);

module.exports = router;
