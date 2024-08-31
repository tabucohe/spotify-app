import { useState, useEffect } from 'react';

const useCoverImage = (coverId) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!coverId) return;

    const fetchImage = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://cms.samespace.com/assets/${coverId}`);
        if (!response.ok) {
          throw new Error('Image fetch failed');
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();

    
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [coverId]);

  return { imageUrl, loading, error };
};

export default useCoverImage;
