import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { createCanvas, loadImage } from 'canvas';

let model;
(async () => {
    model = await mobilenet.load();
    console.log("✅ MobileNet Model Loaded");
})();

export const getImageEmbedding = async (imageUrl) => {
    const image = await loadImage(imageUrl);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height);

    const tensor = tf.browser.fromPixels(canvas)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .expandDims();

    const embedding = await model.infer(tensor, true).data();
    return Array.from(embedding);
};
