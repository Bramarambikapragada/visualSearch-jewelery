import Product from '../models/Product.js';
import { getImageEmbedding } from '../utils/imageProcessing.js';
import { cosineSimilarity } from '../utils/similarity.js';

export const searchJewelry = async (req, res) => {
    try {

        const queryImageUrl = req.file.path;
        const queryEmbedding = await getImageEmbedding(queryImageUrl);
        const products = await Product.find();

        const results = products.map(product => ({
            ...product.toObject(),
            similarity: cosineSimilarity(queryEmbedding, product.embedding)
        }))
        .filter(product => product.similarity > 0.6) // Filter out low similarity results
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 10);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
