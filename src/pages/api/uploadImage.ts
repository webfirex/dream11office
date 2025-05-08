import type { NextApiRequest, NextApiResponse } from 'next';

const IMGBB_API_KEY = '3f6e83c8546b982727ada71053dd995c';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const chunks: Uint8Array[] = [];

    // Collect incoming request data
    req.on('data', (chunk) => {
      chunks.push(chunk);
    });

    req.on('end', async () => {
      const boundary = req.headers['content-type']?.split('boundary=')[1];
      if (!boundary) return res.status(400).json({ error: 'Invalid content-type' });

      const buffer = Buffer.concat(chunks);
      const match = buffer.toString().match(/filename="(.+)"/);
      if (!match) return res.status(400).json({ error: 'File not found in request' });

      // Extract base64 manually
      const fileDataMatch: any = buffer.toString().match(/Content-Type: (.+?)\r\n\r\n([\s\S]+)--/);
      if (!fileDataMatch) return res.status(400).json({ error: 'Invalid file data' });

      const fileBuffer = Buffer.from(fileDataMatch[2].trim(), 'binary');
      const base64Image = fileBuffer.toString('base64');

      const randomNumbers = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
      const timestamp = Date.now(); // Current timestamp
      const uniqueFileName = `pofpic_${randomNumbers}_${timestamp}`;

      const uploadData = new URLSearchParams();
      uploadData.append('image', base64Image);

      const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}&name=${uniqueFileName}`, {
        method: 'POST',
        body: uploadData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const imgbbResult = await imgbbResponse.json();

      if (!imgbbResponse.ok) {
        return res.status(imgbbResponse.status).json({ error: imgbbResult.error?.message || 'Upload failed' });
      }

      return res.status(200).json({ url: imgbbResult.data.url });
    });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: 'Server error during file upload' });
  }
}
