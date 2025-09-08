import Category from "../models/categoryModel.js";
import Item from "../models/itemModel.js";

export const addItemController = async (req, res) => {
    try {
        const { name, price, description, category, image, shop } = req.body;
        const item = new Item({ name, price, description, category, image, shop });

        const savedItem = await item.save();
        res.status(201).json({
            success: true,
            item: savedItem
        });
    } catch (error) {
        console.error("Error in addItemController", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const getItemsController = async (req, res) => {
    try {
        const { category, price } = req.params;

        const filter = {};
        if (category != "All") {
            filter.category = category;
        }
        if (price != "All") {
            filter.price = price;
        }

        const items = await Item.find(filter).populate('category', { name: 1 }).sort({ createdAt: -1 });// newest first
        res.status(200).json({
            success: true,
            items
        });

    } catch (error) {
        console.error("Error in getItemsController", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const updateItemController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, category, image } = req.body;
        const updatedItem = await Item.findByIdAndUpdate(id, { name, price, description, category, image }, { new: true });

        if (!updatedItem) return res.status(404).json({ message: "Item not found" });

        res.status(200).json({
            success: true,
            updatedItem
        });
    } catch (error) {
        console.error("Error in updateItemController", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const deleteItemController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Item.findByIdAndDelete(id);

        if (!deletedItem)
            return res.status(404).json({
                success: false, message: "Item not found"
            });

        res.status(200).json({
            success: true,
            message: "Item deleted successfully"
        });

    } catch (error) {
        console.error("Error in deleteItemController", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const getCategoriesController = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });// newest first
        res.status(200).json({
            success: true,
            categories
        });

    } catch (error) {
        console.error("Error in getCategoriesController", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}