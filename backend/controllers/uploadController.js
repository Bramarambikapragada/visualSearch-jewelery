import Product from '../models/Product.js';
import { getImageEmbedding } from '../utils/imageProcessing.js';

export const uploadProduct = async (req, res) => {
    try {
        const imageUrl = req.file.path;
        const embedding = await getImageEmbedding(imageUrl);

        const product = new Product({
            name: req.body.name,
            imageUrl,
            embedding
        });

        await product.save();
        res.json({ message: '✅ Product added successfully', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
