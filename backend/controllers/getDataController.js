import Product from "../models/Product.js";

export const getData = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).select('-embedding');
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}