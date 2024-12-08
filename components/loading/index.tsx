// Loading.tsx
import React from 'react';
import './style.scss'; // Optional: For styling

const Loading: React.FC = () => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;