import multer from 'multer';
import { exec } from 'child_process';
import { promises as fs } from 'fs';

const upload = multer({ dest: '/tmp' }); // Store the uploaded file temporarily in /tmp

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  console.log("api")
  if (req.method === 'POST') {
    const convertAudio = async (filePath, outputFormat) => {
      return new Promise((resolve, reject) => {
        const outputPath = `/tmp/output.${outputFormat}`;
        exec(`ffmpeg -i ${filePath} ${outputPath}`, (error) => {
          if (error) {
            console.log("error",error)
            reject(error);
          } else {
            resolve(outputPath);
          }
        });
      });
    };

    const fileHandlingMiddleware = upload.single('audioFile');

    fileHandlingMiddleware(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error uploading file.',error:err });
      }

      try {
        const convertedFilePath = await convertAudio(req.file.path, 'mp3'); // Convert to mp3 for this example
        const fileBuffer = await fs.readFile(convertedFilePath);

        res.setHeader('Content-Disposition', 'attachment; filename=converted.mp3');
        res.setHeader('Content-Type', 'audio/mpeg');
        res.end(fileBuffer);

        // Cleanup temp files
        await fs.unlink(req.file.path);
        await fs.unlink(convertedFilePath);
      } catch (error) {
        console.log('error', error)
        res.status(500).json({ error: 'Error convertiggfgng audio.',error:error });
      }
    });
  } else {
    res.status(405).json({ error: 'Only POST requests are allowed.' });
  }
};