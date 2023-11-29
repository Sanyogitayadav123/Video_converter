// models/Video.js
import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoPath: String,
});

const Video= mongoose.model('Video_url', videoSchema);

export default Video
