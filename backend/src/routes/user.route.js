import { Router } from "express";
import {
  addToHistory,
  getUserHistory,
  login,
  register,
  deleteMeeting,
  getMeetingInfo
} from "../controllers/user.controllers.js";

const router = Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/add_to_activity").post(addToHistory);
router.route("/get_all_activity").get(getUserHistory);
router.route("/meetings/:id").delete(deleteMeeting);
router.route("/meetings/:id").get(getMeetingInfo);

export default router;
