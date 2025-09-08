import express from "express";
import { addItemController, deleteItemController, getCategoriesController, getItemsController, updateItemController } from "../controllers/itemController.js";
import Category from "../models/categoryModel.js";

const router = express.Router();

router.post("/", addItemController);
router.get("/:category/:price", getItemsController);
router.patch("/:id", updateItemController);
router.delete("/:id", deleteItemController);

router.get("/categories", getCategoriesController);
router.post("/add-cat", async (req, res) => {
    try {
        const { name } = req.body;
        const cagtegory = new Category({ name });

        const savedCategory = await cagtegory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        console.error("Error in addCagtegoryController", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;