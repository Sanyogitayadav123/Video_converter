
// import { connectToDatabase } from '@/db/db';
// import Video from '@/models/model';
// import express from 'express';
// import multer from 'multer';

// console.log('heellppp')

// const router = express.Router();


//   connectToDatabase(); 
// // MongoDB connection


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + file.originalname);
//   },
// });

// const upload = multer({ storage });

// export const config = {
//     api: {
//       bodyParser: false,
//     },
//   };


// // API endpoints
// router.post('/videoapi', upload.single('video'), async (req, res) => {
//     if (err instanceof multer.MulterError) {
//       return res.status(400).json({ error: 'File size exceeds the 1MB limit' });
//     } else if (err) {
//         console.log('err', err)
//       return res.status(500).json({ error: err.message });
//     }

//     try {
//       const { title, description } = req.body;
//       const videoPath = req.file.path;

//       const video = new Video({ title, description, videoPath });
//       await video.save();

//       res.json({ message: 'Video uploaded successfully', data: video });
//     } catch (error) {
//       console.log('error', error);
//       res.status(500).json({ error: error.message });
//     }
//   });


// router.get('/list', async (req, res) => {
//   try {
//     const videos = await Video.find();
//     res.json(videos);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching videos' });
//   }
// });

// export default router;
 




import { connectToDatabase } from '@/db/db';
import Video from '@/models/model';
import express from 'express';
import multer from 'multer';

const router = express.Router();

connectToDatabase(); // MongoDB connection

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

// Define a middleware for handling file upload
const handleFileUpload = upload.single('video');

// API endpoint to handle both POST and GET requests
router.all('/api/videoapi', async (req, res) => {
  if (req.method === 'POST') {
    // Handle POST request logic here
    handleFileUpload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'File size exceeds the 1MB limit' });
      } else if (err) {
        console.log('err', err);
        return res.status(500).json({ error: err });
      }
      try {
        const { title, description } = req.body;
        const videoPath = req.file.path;

        const video = new Video({ title, description, videoPath });
        await video.save();

        res.json({ message: 'Video uploaded successfully', data: video });
      } catch (error) {
        console.log('error', error);
        res.status(500).json({ error: error });
      }
    });
  } else if (req.method === 'GET') {
    // Handle GET request logic here
    try {
      const videos = await Video.find();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching videos' });
    }
  } else {
    // Handle other HTTP methods if needed
    res.status(405).json({ error: 'Method Not Allowed' });
  }
});

export default router;

