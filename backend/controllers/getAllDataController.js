import Product from '../models/Product.js';

export const getAllData = async (req, res) => {
    try {
        const products = await Product.find().select('-embedding');
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}