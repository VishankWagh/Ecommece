import CartItem from "../models/cartModel.js"

export const addCartItemController = async (req, res) => {
    try {
        const { item, quantity, customerId } = req.body;

        const cartItem = await CartItem.find({ item, customerId });

        if (cartItem.length) {
            console.log('item present', cartItem);

            const updatedCartItem = await CartItem.findOneAndUpdate({ item, customerId }, { $inc: { quantity } }, { new: true });

            return res.status(200).json({
                success: true,
                updatedCartItem
            });
        }
        console.log('item not present');
        const cart = new CartItem({ item, quantity, customerId });

        const savedCartItem = await cart.save();
        res.status(201).json({
            success: true,
            savedCartItem
        });

    } catch (error) {
        console.error("Error in addCartItemController", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const getCartController = async (req, res) => {
    try {
        // const { customer_id: customerId } = req.prarms;
        // const cart = await CartItem.find({ customerId }).populate('item');
        const cart = await CartItem.find({}).populate('item');
        res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {
        console.error("Error in getItemsController", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const updateCartItemController = async (req, res) => {
    try {
        const { cart_id: cartId } = req.params;
        const { quantity } = req.body;
        console.log("q", quantity);

        const updatedCartItem = await CartItem.findByIdAndUpdate(cartId, { quantity }, { new: true });

        if (!updatedCartItem) return res.status(404).json({ success: true, message: "CartItem Item not found" });

        res.status(200).json({
            success: true,
            updatedCartItem
        });
    } catch (error) {
        console.error("Error in updateCartItemController", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const deleteCartItemController = async (req, res) => {
    try {
        const { cart_id: cartId } = req.params;
        const deletedItem = await CartItem.findByIdAndDelete(cartId);

        if (!deletedItem) return res.status(404).json({ success: true, message: "CartItem Item not found" });

        res.status(200).json({
            success: true,
            message: "CartItem Item deleted successfully"
        });
    } catch (error) {
        console.error("Error in deleteCartItemController", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}