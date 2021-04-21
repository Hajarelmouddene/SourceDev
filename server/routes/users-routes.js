const express = require("express");
const router = express.Router();
const {
  getAllDeveloppers,
  getDevelopperByEmail,
  getDeveloppersFromConversations,
  updateDevelopperProfile,
  getDeveloppersInConversation,
  getDevelopperProfilesByPageLimit,
} = require("./handlers/users-handlers");
router.get("/developpers", getAllDeveloppers);
router.get("/search", getDeveloppersInConversation);
router.get("/developpers/:id", getDevelopperByEmail);
router.post("/developpers/profile/update", updateDevelopperProfile);
router.post("/employers/profile/update", updateDevelopperProfile);
router.get(
  "/developpers/:pageNumber/:itemsPerPage",
  getDevelopperProfilesByPageLimit
);

//get developpers that an employer had conversations with
router.get(`/developpers/search?:queryString`, getDeveloppersFromConversations);

module.exports = router;
