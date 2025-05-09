import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: String,
    imageUrl: String,
    embedding: [Number],
});

const Product = mongoose.model('Product', productSchema);

export default Product;
