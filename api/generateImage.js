export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

  try {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instances: { prompt: prompt }, parameters: { "sampleCount": 1} })
    });

    const data = await response.json();
    if (data.predictions && data.predictions.length > 0) {
        const imageUrl = `data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`;
        res.status(200).json({ imageUrl });
    } else {
        throw new Error('No image data in response');
    }
  } catch (error) {
    console.error('Error calling Imagen API:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
}
