import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { getNotifications, deleteNotificaitons, deleteNotification } from "../controllers/notification.controller.js";

const router = express.Router();

router.get('/', protectRoute, getNotifications);
router.delete('/', protectRoute, deleteNotificaitons);
router.delete('/:id', protectRoute, deleteNotification);


export default router;