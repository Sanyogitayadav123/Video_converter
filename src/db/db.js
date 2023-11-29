// db/mongoose.js
import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb+srv://sanyogitavkaps:ZUM8F2JsNhf5DN2y@nestcluster.gj6tgfr.mongodb.net/VideoUpload?retryWrites=true&w=majority');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

export { connectToDatabase };
