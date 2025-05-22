import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const HUGGINGFACE_API_KEY = process.env.REACT_APP_IMAGE_KEY;


export default function ImageGen() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    setLoading(true);
    setImageUrl(null);
    setImageBlob(null);
    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inputs: prompt }),
        }
      );

      const blob = await response.blob();
      const imageObjectUrl = URL.createObjectURL(blob);
      setImageUrl(imageObjectUrl);
      setImageBlob(blob);
    } catch (error) {
      alert('Image generation failed. Try again.');
      console.error(error);
    }
    setLoading(false);
  };

  const handleDownload = () => {
    if (!imageBlob) return;
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(imageBlob);
    downloadLink.download = `${prompt.slice(0, 20).replace(/\s+/g, '_') || 'generated'}_image.png`;
    downloadLink.click();
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      {/* 🔗 Home button at top */}
      <button
        onClick={() => navigate('/home')}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '8px 16px',
          fontSize: '14px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        ← Back to Home
      </button>

      <h2>🎨 AI Image Generator</h2>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your image..."
        style={{ padding: '10px', width: '60%', fontSize: '16px' }}
      />
      <br /><br />
      <button
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '5px',
          marginRight: '10px'
        }}
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>

      {imageUrl && (
        <button
          onClick={handleDownload}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          Download
        </button>
      )}

      <div style={{ marginTop: '2rem' }}>
        {imageUrl && <img src={imageUrl} alt="Generated" style={{ maxWidth: '100%' }} />}
      </div>
    </div>
  );
}
