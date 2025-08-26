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

    if (data.predictions && data.predictions.length > 0 && data.predictions[0].bytesBase64Encoded) {
        const imageUrl = `data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`;
        res.status(200).json({ imageUrl });
    } else {
        // Log the full response from the API for better debugging
        console.error('Imagen API returned no predictions. Full response:', JSON.stringify(data, null, 2));
        
        // Send a more informative error back to the client
        const errorMessage = data.error ? data.error.message : 'No image data in response from API.';
        res.status(500).json({ error: errorMessage });
    }
  } catch (error) {
    console.error('Error calling Imagen API:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
}
