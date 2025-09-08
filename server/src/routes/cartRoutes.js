import express from "express";
import { addCartItemController, deleteCartItemController, getCartController, updateCartItemController } from "../controllers/cartController.js";

const router = express.Router();

router.post("/", addCartItemController);
// router.get("/:customer_id", getCartController);
router.get("/", getCartController);
router.patch("/:cart_id", updateCartItemController);
router.delete("/:cart_id", deleteCartItemController);

export default router;